"use client";

import { useState, useEffect } from "react";

interface Props {
  pubId: string;
  duration: number;
  onClose: () => void;
}

export default function AdBanner({ duration, onClose }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Ad Container */}
        <div className="bg-card rounded-2xl overflow-hidden border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Advertisement</span>
            {canClose ? (
              <button
                onClick={onClose}
                className="px-4 py-1 rounded-full bg-primary text-white text-sm font-medium"
              >
                Close
              </button>
            ) : (
              <span className="text-sm text-muted-foreground">{timeLeft}s</span>
            )}
          </div>
          
          {/* Ad Placeholder */}
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-muted-foreground text-sm">Ad Loading...</p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${((duration - timeLeft) / duration) * 100}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              {canClose ? "You can close this ad now" : `Wait ${timeLeft} seconds to continue`}
            </p>
          </div>
        </div>

        {/* Premium Upsell */}
        <div className="mt-4 text-center">
          <p className="text-muted-foreground text-sm mb-2">Tired of ads?</p>
          <button className="px-6 py-2 rounded-full gradient-bg text-white text-sm font-medium">
            Go Premium - No Ads!
          </button>
        </div>
      </div>
    </div>
  );
}
