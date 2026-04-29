"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import ChatScreen from "./ChatScreen";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import AdminPanel from "./AdminPanel";
import AaryaProfile from "./AaryaProfile";
import BottomNav from "./BottomNav";
import AdBanner from "./AdBanner";

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Profile {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  profile_picture: string | null;
  gender: string | null;
  date_of_birth: string | null;
  country: string | null;
  relationship_status: string | null;
  is_admin: boolean;
  is_premium: boolean;
  premium_plan: string | null;
  is_banned: boolean;
  is_muted: boolean;
}

interface AaryaProfileType {
  id: string;
  name: string;
  bio: string;
  profile_picture: string;
  gender: string;
  date_of_birth: string;
  country: string;
  relationship_status: string;
  is_online: boolean;
}

interface AppSettings {
  id: string;
  adsense_pub_id: string;
  ads_enabled: boolean;
  messages_before_ad: number;
  ad_duration_seconds: number;
  premium_price_basic: number;
  premium_price_standard: number;
  premium_price_premium: number;
}

interface Props {
  user: User;
  profile: Profile | null;
  aaryaProfile: AaryaProfileType | null;
  appSettings: AppSettings | null;
}

export default function MainApp({ user, profile, aaryaProfile, appSettings }: Props) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("chat");
  const [messageCount, setMessageCount] = useState(0);
  const [showAd, setShowAd] = useState(false);

  const isAdmin = profile?.is_admin || user.email === "rkgroup813@gmail.com";
  const isPremium = profile?.is_premium || false;

  useEffect(() => {
    if (!isPremium && appSettings?.ads_enabled && messageCount > 0 && messageCount % (appSettings?.messages_before_ad || 5) === 0) {
      setShowAd(true);
    }
  }, [messageCount, isPremium, appSettings]);

  const handleMessageSent = () => {
    setMessageCount(prev => prev + 1);
  };

  const closeAd = () => {
    setShowAd(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (profile.is_banned) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-destructive mb-2">Account Banned</h1>
          <p className="text-muted-foreground">
            Tumhara account ban kar diya gaya hai. Agar ye galti se hua hai toh help desk se contact karo: {appSettings?.help_desk_email || "rkgroup813@gmail.com"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-background pb-20 safe-area-inset">
      {showAd && !isPremium && (
        <AdBanner 
          pubId={appSettings?.adsense_pub_id || "pub-9952411839772191"} 
          duration={appSettings?.ad_duration_seconds || 30}
          onClose={closeAd}
        />
      )}

      {currentScreen === "chat" && (
        <ChatScreen 
          profile={profile} 
          aaryaProfile={aaryaProfile}
          onMessageSent={handleMessageSent}
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === "feed" && (
        <FeedScreen 
          profile={profile}
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen 
          profile={profile}
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === "aarya-profile" && (
        <AaryaProfile 
          aaryaProfile={aaryaProfile}
          isAdmin={isAdmin}
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen 
          profile={profile}
          appSettings={appSettings}
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === "admin" && isAdmin && (
        <AdminPanel 
          profile={profile}
          appSettings={appSettings}
          aaryaProfile={aaryaProfile}
          onNavigate={setCurrentScreen}
        />
      )}

      <BottomNav 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        isAdmin={isAdmin}
      />
    </main>
  );
}
