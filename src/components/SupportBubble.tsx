import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Github } from "lucide-react";

const SupportBubble = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const bubbleRef = useRef<HTMLButtonElement>(null);

  // Replace with your actual GitHub profile URL
  const githubUrl = "https://github.com/yourusername";

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Keep bubble within viewport bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse events when dragging
  useState(() => {
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
  });

  const handleClick = (e: React.MouseEvent) => {
    // Only redirect if we're not dragging
    if (!isDragging) {
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
