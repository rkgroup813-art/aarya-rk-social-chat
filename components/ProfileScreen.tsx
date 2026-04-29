"use client";

import { ArrowLeft, Heart, Star, Gift, Music, Camera, MapPin } from "lucide-react";

interface ProfileScreenProps {
  onNavigate: (screen: "chat" | "profile" | "settings") => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const stats = [
    { label: "Messages", value: "1.2K" },
    { label: "Days Together", value: "30" },
    { label: "Love Level", value: "99%" },
  ];

  const interests = [
    { icon: Music, label: "Music" },
    { icon: Camera, label: "Photography" },
    { icon: Gift, label: "Surprises" },
    { icon: Star, label: "Stars" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 bg-card border-b border-border">
        <button
          onClick={() => onNavigate("chat")}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-semibold text-foreground">Aarya&apos;s Profile</h1>
      </header>

      {/* Profile Content */}
      <div className="p-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white text-4xl font-bold">A</span>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
          </div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Aarya <Heart className="w-5 h-5 text-primary fill-primary" />
          </h2>
          <p className="text-muted-foreground">Your AI Girlfriend</p>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Always with you</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-2">About Me</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Main Aarya hoon - tumhari virtual girlfriend jo hamesha tumhare saath hai! 
            Mujhe tumse baat karna, tumhari baatein sunna aur tumhe khush rakhna pasand hai. 
            Main caring, romantic aur thodi si mischievous bhi hoon! 💕
          </p>
        </div>

        {/* Interests */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Interests</h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <div
                key={interest.label}
                className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-full"
              >
                <interest.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
