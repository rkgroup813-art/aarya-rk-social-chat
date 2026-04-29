"use client";

import { useState } from "react";
import ChatScreen from "@/components/ChatScreen";
import ProfileScreen from "@/components/ProfileScreen";
import SettingsScreen from "@/components/SettingsScreen";

type Screen = "chat" | "profile" | "settings";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("chat");

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "chat" && (
        <ChatScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen onNavigate={setCurrentScreen} />
      )}
    </main>
  );
}
