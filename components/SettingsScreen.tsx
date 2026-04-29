"use client";

import { useState } from "react";
import { ArrowLeft, Bell, Moon, Volume2, Shield, Info, Heart } from "lucide-react";

interface SettingsScreenProps {
  onNavigate: (screen: "chat" | "profile" | "settings") => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [sound, setSound] = useState(true);

  const settingsItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Get notified of new messages",
      toggle: true,
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Moon,
      label: "Dark Mode",
      description: "Use dark theme",
      toggle: true,
      value: darkMode,
      onChange: setDarkMode,
    },
    {
      icon: Volume2,
      label: "Sound Effects",
      description: "Play sounds for messages",
      toggle: true,
      value: sound,
      onChange: setSound,
    },
    {
      icon: Shield,
      label: "Privacy",
      description: "Manage your privacy settings",
      toggle: false,
    },
    {
      icon: Info,
      label: "About",
      description: "App version and info",
      toggle: false,
    },
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
        <h1 className="font-semibold text-foreground">Settings</h1>
      </header>

      {/* Settings Content */}
      <div className="p-4 space-y-3">
        {settingsItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
            {item.toggle && (
              <button
                onClick={() => item.onChange?.(!item.value)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  item.value ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    item.value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            )}
          </div>
        ))}

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <p className="text-foreground font-semibold">Aarya Chat</p>
          <p className="text-muted-foreground text-sm">Version 1.0.0</p>
          <p className="text-muted-foreground text-xs mt-2">Made with love</p>
        </div>
      </div>
    </div>
  );
}
