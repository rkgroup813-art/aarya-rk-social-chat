"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Profile {
  id: string;
  name: string | null;
  is_premium: boolean;
  premium_plan: string | null;
}

interface AppSettings {
  premium_price_basic: number;
  premium_price_standard: number;
  premium_price_premium: number;
  privacy_policy: string | null;
  help_desk_email: string | null;
}

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  profile: Profile;
  appSettings: AppSettings | null;
  onNavigate: (screen: Screen) => void;
}

export default function SettingsScreen({ profile, appSettings }: Props) {
  const [showPremium, setShowPremium] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [show18Plus, setShow18Plus] = useState(false);
  const router = useRouter();

  const premiumPlans = [
    { name: "Basic", price: appSettings?.premium_price_basic || 99, features: ["No Ads", "Priority Support"] },
    { name: "Standard", price: appSettings?.premium_price_standard || 199, features: ["No Ads", "Priority Support", "Exclusive Features"] },
    { name: "Premium", price: appSettings?.premium_price_premium || 599, features: ["No Ads", "24/7 Support", "All Features", "Early Access"] },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold gradient-text">Settings</h1>
      </header>

      <div className="p-4 space-y-3">
        {/* Premium Section */}
        {!profile.is_premium && (
          <button
            onClick={() => setShowPremium(true)}
            className="w-full bg-gradient-to-r from-primary to-secondary rounded-xl p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white">Go Premium</h3>
                <p className="text-white/80 text-sm">Remove ads and unlock all features!</p>
              </div>
            </div>
          </button>
        )}

        {/* Settings Items */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <button onClick={() => setShow18Plus(true)} className="w-full flex items-center gap-3 p-4 border-b border-border">
            <div className="p-2 bg-destructive/20 rounded-lg">
              <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">18+ Verification</p>
              <p className="text-xs text-muted-foreground">Age verification for mature content</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button onClick={() => setShowPrivacy(true)} className="w-full flex items-center gap-3 p-4 border-b border-border">
            <div className="p-2 bg-primary/20 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Privacy Policy</p>
              <p className="text-xs text-muted-foreground">Read our privacy policy</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <a href={`mailto:${appSettings?.help_desk_email || "rkgroup813@gmail.com"}`} className="flex items-center gap-3 p-4 border-b border-border">
            <div className="p-2 bg-success/20 rounded-lg">
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Help Desk</p>
              <p className="text-xs text-muted-foreground">{appSettings?.help_desk_email || "rkgroup813@gmail.com"}</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <button onClick={() => router.push("/report")} className="w-full flex items-center gap-3 p-4">
            <div className="p-2 bg-accent/20 rounded-lg">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Report Issue</p>
              <p className="text-xs text-muted-foreground">Report bugs or inappropriate content</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary">
            <Image src="/aarya-avatar.jpg" alt="Aarya" width={64} height={64} className="object-cover" />
          </div>
          <p className="font-semibold">Aarya RK Social Chat</p>
          <p className="text-muted-foreground text-sm">Version 1.0.0</p>
          <p className="text-muted-foreground text-xs mt-2">Made with love in India</p>
        </div>
      </div>

      {/* Premium Modal */}
      {showPremium && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text">Premium Plans</h2>
              <button onClick={() => setShowPremium(false)} className="p-2 hover:bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              {premiumPlans.map((plan) => (
                <div key={plan.name} className="border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <span className="text-2xl font-bold text-primary">Rs {plan.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-4 py-2 rounded-lg gradient-bg text-white font-medium">
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold">Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} className="p-2 hover:bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-sm text-muted-foreground space-y-4">
              <p>Welcome to Aarya RK Social Chat. Your privacy is important to us.</p>
              <p><strong>Data Collection:</strong> We collect minimal data necessary for app functionality including your profile information and chat messages.</p>
              <p><strong>Data Usage:</strong> Your data is used solely to provide and improve our services. We do not sell your personal information.</p>
              <p><strong>Data Security:</strong> We implement industry-standard security measures to protect your data.</p>
              <p><strong>Contact:</strong> For any privacy concerns, contact us at {appSettings?.help_desk_email || "rkgroup813@gmail.com"}</p>
            </div>
          </div>
        </div>
      )}

      {/* 18+ Modal */}
      {show18Plus && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold">18+ Verification</h2>
              <button onClick={() => setShow18Plus(false)} className="p-2 hover:bg-muted rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-destructive">18+</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Some content may be suitable for adults only. By verifying, you confirm that you are 18 years or older.
              </p>
              <button className="w-full py-3 rounded-lg gradient-bg text-white font-semibold">
                I am 18 or older
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
