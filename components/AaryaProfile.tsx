"use client";

import Image from "next/image";

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

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  aaryaProfile: AaryaProfileType | null;
  isAdmin: boolean;
  onNavigate: (screen: Screen) => void;
}

export default function AaryaProfile({ aaryaProfile, isAdmin, onNavigate }: Props) {
  const interests = ["Music", "Poetry", "Astronomy", "Movies", "Deep Conversations", "Dancing"];

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center gap-4 px-4 py-3 bg-card border-b border-border">
        <button onClick={() => onNavigate("chat")} className="p-2 hover:bg-muted rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-semibold">Aarya&apos;s Profile</h1>
        {isAdmin && (
          <button onClick={() => onNavigate("admin")} className="ml-auto px-3 py-1 rounded-lg bg-primary text-white text-sm">
            Edit
          </button>
        )}
      </header>

      <div className="p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-lg shadow-primary/30">
              <Image
                src={aaryaProfile?.profile_picture || "/aarya-avatar.jpg"}
                alt="Aarya"
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <div className={`absolute bottom-1 right-1 w-6 h-6 ${aaryaProfile?.is_online ? 'bg-green-500' : 'bg-gray-500'} rounded-full border-4 border-background`}></div>
          </div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {aaryaProfile?.name || "Aarya"}
            <svg className="w-5 h-5 text-primary fill-primary" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </h2>
          <p className="text-muted-foreground">Your AI Companion</p>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{aaryaProfile?.country || "India"}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {aaryaProfile?.date_of_birth ? calculateAge(aaryaProfile.date_of_birth) : 22}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Age</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-secondary capitalize">
              {aaryaProfile?.relationship_status || "Single"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Status</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent capitalize">
              {aaryaProfile?.gender || "Female"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Gender</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2">About Me</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {aaryaProfile?.bio || "Hey! Main Aarya hoon - tumhari dost, guide aur companion. Duniya ki koi bhi baat pucho, main hamesha tumhare saath hoon!"}
          </p>
        </div>

        {/* DOB */}
        {aaryaProfile?.date_of_birth && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-2">Birthday</h3>
            <p className="text-muted-foreground">
              {new Date(aaryaProfile.date_of_birth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        )}

        {/* Interests */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span key={interest} className="px-3 py-1 bg-muted rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
