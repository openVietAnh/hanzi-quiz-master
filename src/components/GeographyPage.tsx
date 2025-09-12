import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Target, CheckCircle, XCircle, RotateCcw, Settings } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getRandomLocation, GeographyLocation, chinaLocations } from "@/data/chinaGeography";
import { toast } from "sonner";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GeographyPageProps {
  onBack: () => void;
}

const GeographyPage = ({ onBack }: GeographyPageProps) => {
  const { t, language } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<GeographyLocation | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [clickedCoordinates, setClickedCoordinates] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  
  const totalQuestions = 10;

  // Initialize first question
  useEffect(() => {
    if (!showTokenInput) {
      generateNewQuestion();
    }
  }, [showTokenInput]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || showAnswer || showTokenInput) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, showTokenInput]);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [104.1954, 35.8617], // Center of China
        zoom: 3.5,
        minZoom: 3,
        maxZoom: 8
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add click handler
      map.current.on('click', handleMapClick);

      // Add province/region borders
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add markers for all locations as small circles
        chinaLocations.forEach(location => {
          const marker = new mapboxgl.Marker({
            color: '#e5e7eb',
            scale: 0.5
          })
            .setLngLat(location.coordinates)
            .addTo(map.current!);
        });
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error(t('mapError'));
    }
  }, [mapboxToken, t]);

  const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
    if (showAnswer || !currentLocation) return;

    const clickedLngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
    setClickedCoordinates(clickedLngLat);

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    setMarkers([]);

    // Add marker at clicked location
    const clickMarker = new mapboxgl.Marker({
      color: '#ef4444',
      scale: 1
    })
      .setLngLat(clickedLngLat)
      .addTo(map.current!);

    setMarkers([clickMarker]);

    // Calculate distance and check if correct
    checkAnswer(clickedLngLat);
  };

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const [lng1, lat1] = coord1;
    const [lng2, lat2] = coord2;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const checkAnswer = (clickedCoords: [number, number]) => {
    if (!currentLocation) return;

    const distance = calculateDistance(clickedCoords, currentLocation.coordinates);
    const threshold = currentLocation.level === 'beginner' ? 200 : 
                     currentLocation.level === 'intermediate' ? 150 : 100; // km

    const correct = distance <= threshold;
    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(prev => prev + 1);
      toast.success(t('correctLocation'));
    } else {
      toast.error(t('incorrectLocation', { distance: Math.round(distance) }));
    }

    // Show correct location marker
    const correctMarker = new mapboxgl.Marker({
      color: '#22c55e',
      scale: 1.2
    })
      .setLngLat(currentLocation.coordinates)
      .addTo(map.current!);

    setMarkers(prev => [...prev, correctMarker]);

    // Add popup with location info
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="text-center p-2">
          <h3 class="font-bold chinese-text text-lg">${currentLocation.name}</h3>
          <p class="text-sm">${getLocationName(currentLocation)}</p>
          <p class="text-xs text-gray-600">${currentLocation.type}</p>
        </div>
      `);

    correctMarker.setPopup(popup);
  };

  const getLocationName = (location: GeographyLocation): string => {
    switch (language) {
      case 'vi': return location.nameVi;
      case 'zh': return location.name;
      default: return location.nameEn;
    }
  };

  const generateNewQuestion = useCallback(() => {
    const location = getRandomLocation();
    setCurrentLocation(location);
    setShowAnswer(false);
    setIsCorrect(null);
    setClickedCoordinates(null);
    setTimeLeft(45);
    
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    setMarkers([]);
  }, [markers]);

  const handleTimeout = () => {
    setShowAnswer(true);
    setIsCorrect(false);
    toast.error(t('timeUp'));
    
    if (currentLocation && map.current) {
      const correctMarker = new mapboxgl.Marker({
        color: '#22c55e',
        scale: 1.2
      })
        .setLngLat(currentLocation.coordinates)
        .addTo(map.current);

      setMarkers(prev => [...prev, correctMarker]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      toast.success(t('exerciseComplete'));
      const finalScore = Math.round((score / totalQuestions) * 100);
      toast(`${t('finalScore')}: ${finalScore}%`);
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    generateNewQuestion();
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setScore(0);
    generateNewQuestion();
  };

  const handleStartWithToken = () => {
    if (!mapboxToken.trim()) {
      toast.error(t('mapboxTokenRequired'));
      return;
    }
    setShowTokenInput(false);
    setTimeout(() => {
      initializeMap();
    }, 100);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showTokenInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-quiz bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center gap-2 justify-center">
              <Settings className="w-6 h-6" />
              {t('mapSetup')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">{t('mapboxToken')}</Label>
              <Input
                id="mapbox-token"
                type="password"
                placeholder={t('enterMapboxToken')}
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {t('getMapboxToken')} <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft size={16} className="mr-2" />
                {t('back')}
              </Button>
              <Button onClick={handleStartWithToken} className="flex-1">
                {t('startExercise')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentLocation) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {t('questionProgress', { current: currentQuestion, total: totalQuestions })}
            </Badge>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-mono ${timeLeft <= 10 ? 'text-error' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </header>

        {/* Progress */}
        <div className="mb-4">
          <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Question Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-quiz bg-gradient-card border-0 h-full">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {t('findOnMap')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl chinese-text font-bold mb-2">
                    {currentLocation.name}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {getLocationName(currentLocation)}
                  </div>
                  <Badge className="mt-2" variant="outline">
                    {t(currentLocation.type)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('clickOnMap')}
                  </p>
                  
                  {showAnswer && (
                    <div className="space-y-3 pt-4 border-t">
                      <div className="text-center">
                        {isCorrect ? (
                          <div className="flex items-center justify-center gap-2 text-success">
                            <CheckCircle size={20} />
                            <span>{t('correctLocation')}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-error">
                            <XCircle size={20} />
                            <span>{t('incorrectLocation')}</span>
                          </div>
                        )}
                      </div>

                      {currentQuestion < totalQuestions ? (
                        <Button 
                          onClick={handleNextQuestion}
                          className="w-full bg-gradient-hero hover:opacity-90"
                        >
                          {t('nextQuestion')}
                        </Button>
                      ) : (
                        <div className="space-y-2 text-center">
                          <p className="text-lg font-bold">
                            {t('finalScore')}: {Math.round((score / totalQuestions) * 100)}%
                          </p>
                          <Button 
                            onClick={handleRestart}
                            className="w-full bg-gradient-hero hover:opacity-90 flex items-center justify-center gap-2"
                          >
                            <RotateCcw size={16} />
                            {t('tryAgain')}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      {t('score')}: {score}/{totalQuestions}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-quiz bg-gradient-card border-0 h-[600px] lg:h-[700px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('chinaMap')}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full pb-6">
                <div 
                  ref={mapContainer} 
                  className="w-full h-full rounded-lg border-2 border-muted"
                  style={{ minHeight: '500px' }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographyPage;