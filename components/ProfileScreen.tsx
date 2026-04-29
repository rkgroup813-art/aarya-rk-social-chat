"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
}

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  profile: Profile;
  onNavigate: (screen: Screen) => void;
}

export default function ProfileScreen({ profile }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    gender: profile.gender || "",
    date_of_birth: profile.date_of_birth || "",
    country: profile.country || "India",
    relationship_status: profile.relationship_status || "",
  });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        name: formData.name,
        bio: formData.bio,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth || null,
        country: formData.country,
        relationship_status: formData.relationship_status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (!error) {
      setIsEditing(false);
      router.refresh();
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const countries = [
    "India", "USA", "UK", "Canada", "Australia", "Germany", "France",
    "Japan", "China", "Brazil", "Russia", "South Africa", "UAE", "Singapore"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-3">
            {profile.profile_picture ? (
              <Image
                src={profile.profile_picture}
                alt={profile.name || "User"}
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          {!isEditing && (
            <>
              <h2 className="text-xl font-bold">{profile.name || "User"}</h2>
              <p className="text-muted-foreground text-sm">{profile.email}</p>
              {profile.is_premium && (
                <span className="mt-2 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                  Premium {profile.premium_plan}
                </span>
              )}
              {profile.is_admin && (
                <span className="mt-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                  Admin
                </span>
              )}
            </>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">DOB</label>
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select name="country" value={formData.country} onChange={handleChange}>
                {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Relationship Status</label>
              <select name="relationship_status" value={formData.relationship_status} onChange={handleChange}>
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="in_relationship">In a Relationship</option>
                <option value="married">Married</option>
                <option value="complicated">It&apos;s Complicated</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-lg gradient-bg text-white font-semibold disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {profile.bio && (
              <div className="bg-card rounded-xl p-4 border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                <p>{profile.bio}</p>
              </div>
            )}
            <div className="bg-card rounded-xl p-4 border border-border space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
              {profile.gender && (<div className="flex justify-between"><span className="text-muted-foreground">Gender</span><span className="capitalize">{profile.gender}</span></div>)}
              {profile.date_of_birth && (<div className="flex justify-between"><span className="text-muted-foreground">Date of Birth</span><span>{new Date(profile.date_of_birth).toLocaleDateString()}</span></div>)}
              {profile.country && (<div className="flex justify-between"><span className="text-muted-foreground">Country</span><span>{profile.country}</span></div>)}
              {profile.relationship_status && (<div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="capitalize">{profile.relationship_status.replace("_", " ")}</span></div>)}
            </div>
            <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-destructive/20 text-destructive font-semibold">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
