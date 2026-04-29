"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  email: string;
  name: string | null;
  profile_picture: string | null;
  is_admin: boolean;
  is_banned: boolean;
  is_muted: boolean;
  is_online: boolean;
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

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  profile: Profile;
  appSettings: AppSettings | null;
  aaryaProfile: AaryaProfileType | null;
  onNavigate: (screen: Screen) => void;
}

type Tab = "users" | "aarya" | "settings" | "reports";

export default function AdminPanel({ appSettings, aaryaProfile }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [aaryaForm, setAaryaForm] = useState({
    name: aaryaProfile?.name || "Aarya",
    bio: aaryaProfile?.bio || "",
    gender: aaryaProfile?.gender || "female",
    date_of_birth: aaryaProfile?.date_of_birth || "2002-03-15",
    country: aaryaProfile?.country || "India",
    relationship_status: aaryaProfile?.relationship_status || "single",
    is_online: aaryaProfile?.is_online ?? true,
  });
  const [settingsForm, setSettingsForm] = useState({
    adsense_pub_id: appSettings?.adsense_pub_id || "pub-9952411839772191",
    ads_enabled: appSettings?.ads_enabled ?? true,
    messages_before_ad: appSettings?.messages_before_ad || 5,
    ad_duration_seconds: appSettings?.ad_duration_seconds || 30,
    premium_price_basic: appSettings?.premium_price_basic || 99,
    premium_price_standard: appSettings?.premium_price_standard || 199,
    premium_price_premium: appSettings?.premium_price_premium || 599,
  });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  const toggleBan = async (userId: string, currentStatus: boolean) => {
    await supabase.from("profiles").update({ is_banned: !currentStatus }).eq("id", userId);
    setUsers(users.map(u => u.id === userId ? { ...u, is_banned: !currentStatus } : u));
  };

  const toggleMute = async (userId: string, currentStatus: boolean) => {
    await supabase.from("profiles").update({ is_muted: !currentStatus }).eq("id", userId);
    setUsers(users.map(u => u.id === userId ? { ...u, is_muted: !currentStatus } : u));
  };

  const saveAaryaProfile = async () => {
    setSaving(true);
    await supabase.from("aarya_profile").update(aaryaForm).eq("id", aaryaProfile?.id);
    setSaving(false);
    router.refresh();
  };

  const saveAppSettings = async () => {
    setSaving(true);
    await supabase.from("app_settings").update(settingsForm).eq("id", appSettings?.id);
    setSaving(false);
    router.refresh();
  };

  const tabs = [
    { id: "users" as Tab, label: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { id: "aarya" as Tab, label: "Aarya", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "settings" as Tab, label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "reports" as Tab, label: "Reports", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
        <p className="text-xs text-muted-foreground">Manage your app</p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">All Users ({users.length})</h2>
              <span className="text-xs text-muted-foreground">{users.filter(u => u.is_online).length} online</span>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {user.profile_picture ? (
                          <Image src={user.profile_picture} alt={user.name || ""} width={40} height={40} className="object-cover" />
                        ) : (
                          <span className="text-muted-foreground font-medium">{user.name?.charAt(0) || "U"}</span>
                        )}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${user.is_online ? 'bg-green-500' : 'bg-gray-500'} rounded-full border-2 border-card`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {user.is_banned && <span className="text-xs px-2 py-0.5 bg-destructive/20 text-destructive rounded">Banned</span>}
                      {user.is_muted && <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded">Muted</span>}
                      {user.is_admin && <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">Admin</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleMute(user.id, user.is_muted)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${user.is_muted ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'}`}
                    >
                      {user.is_muted ? "Unmute" : "Mute"}
                    </button>
                    <button
                      onClick={() => toggleBan(user.id, user.is_banned)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${user.is_banned ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}
                    >
                      {user.is_banned ? "Unban" : "Ban"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Aarya Tab */}
        {activeTab === "aarya" && (
          <div className="space-y-4">
            <h2 className="font-semibold mb-4">Edit Aarya Profile</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" value={aaryaForm.name} onChange={(e) => setAaryaForm({...aaryaForm, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea value={aaryaForm.bio} onChange={(e) => setAaryaForm({...aaryaForm, bio: e.target.value})} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select value={aaryaForm.gender} onChange={(e) => setAaryaForm({...aaryaForm, gender: e.target.value})}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">DOB</label>
                <input type="date" value={aaryaForm.date_of_birth} onChange={(e) => setAaryaForm({...aaryaForm, date_of_birth: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input type="text" value={aaryaForm.country} onChange={(e) => setAaryaForm({...aaryaForm, country: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select value={aaryaForm.relationship_status} onChange={(e) => setAaryaForm({...aaryaForm, relationship_status: e.target.value})}>
                <option value="single">Single</option>
                <option value="in_relationship">In Relationship</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <span>Online Status</span>
              <button
                onClick={() => setAaryaForm({...aaryaForm, is_online: !aaryaForm.is_online})}
                className={`w-12 h-7 rounded-full transition-colors ${aaryaForm.is_online ? "bg-success" : "bg-muted"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${aaryaForm.is_online ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <button onClick={saveAaryaProfile} disabled={saving} className="w-full py-3 rounded-lg gradient-bg text-white font-semibold disabled:opacity-50">
              {saving ? "Saving..." : "Save Aarya Profile"}
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <h2 className="font-semibold mb-4">App Settings</h2>
            <div>
              <label className="block text-sm font-medium mb-2">AdSense Publisher ID</label>
              <input type="text" value={settingsForm.adsense_pub_id} onChange={(e) => setSettingsForm({...settingsForm, adsense_pub_id: e.target.value})} />
            </div>
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <span>Ads Enabled</span>
              <button
                onClick={() => setSettingsForm({...settingsForm, ads_enabled: !settingsForm.ads_enabled})}
                className={`w-12 h-7 rounded-full transition-colors ${settingsForm.ads_enabled ? "bg-success" : "bg-muted"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${settingsForm.ads_enabled ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Messages Before Ad</label>
                <input type="number" value={settingsForm.messages_before_ad} onChange={(e) => setSettingsForm({...settingsForm, messages_before_ad: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ad Duration (sec)</label>
                <input type="number" value={settingsForm.ad_duration_seconds} onChange={(e) => setSettingsForm({...settingsForm, ad_duration_seconds: parseInt(e.target.value)})} />
              </div>
            </div>
            <h3 className="font-medium mt-6">Premium Prices (Rs)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Basic</label>
                <input type="number" value={settingsForm.premium_price_basic} onChange={(e) => setSettingsForm({...settingsForm, premium_price_basic: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Standard</label>
                <input type="number" value={settingsForm.premium_price_standard} onChange={(e) => setSettingsForm({...settingsForm, premium_price_standard: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Premium</label>
                <input type="number" value={settingsForm.premium_price_premium} onChange={(e) => setSettingsForm({...settingsForm, premium_price_premium: parseInt(e.target.value)})} />
              </div>
            </div>
            <button onClick={saveAppSettings} disabled={saving} className="w-full py-3 rounded-lg gradient-bg text-white font-semibold disabled:opacity-50">
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-muted-foreground">No reports yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
