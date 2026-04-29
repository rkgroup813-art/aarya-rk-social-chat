import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MainApp from "@/components/MainApp";


export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get Aarya profile
  const { data: aaryaProfile } = await supabase
    .from("aarya_profile")
    .select("*")
    .limit(1)
    .single();

  // Get app settings
  const { data: appSettings } = await supabase
    .from("app_settings")
    .select("*")
    .limit(1)
    .single();

  return (
    <MainApp 
      user={user} 
      profile={profile} 
      aaryaProfile={aaryaProfile}
      appSettings={appSettings}
    />
  );
}
