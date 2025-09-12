import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Github } from "lucide-react";

const SupportBubble = () => {
  const [position, setPosition] = useState(() => ({
    x: window.innerWidth - 80, // 60px bubble width + 20px margin
    y: window.innerHeight - 80 // 60px bubble height + 20px margin
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  // Replace with your actual GitHub profile URL
  const githubUrl = "https://github.com/yourusername";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Check if movement threshold is exceeded (more than 3px)
    const moveThreshold = 3;
    const deltaX = Math.abs(newX - position.x);
    const deltaY = Math.abs(newY - position.y);
    
    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      setHasMoved(true);
    }
    
    // Keep bubble within viewport bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    const clampedPosition = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    };
    
    setPosition(clampedPosition);
  }, [isDragging, dragStart.x, dragStart.y, position.x, position.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse events when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = (e: React.MouseEvent) => {
    // Only redirect if the bubble hasn't been moved
    if (!hasMoved) {
      e.preventDefault();
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button
      ref={bubbleRef}
      className={`fixed z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
        isDragging ? "scale-110 cursor-grabbing" : "cursor-grab hover:scale-105"
      } bg-primary hover:bg-primary/90 text-primary-foreground`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      title="Contact Support - Visit GitHub Profile"
    >
      <div className="flex items-center justify-center">
        <MessageCircle className="w-5 h-5 mr-1" />
        <Github className="w-4 h-4" />
      </div>
    </Button>
  );
};

export default SupportBubble;
