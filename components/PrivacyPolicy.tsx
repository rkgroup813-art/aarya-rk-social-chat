"use client"

import { ArrowLeft, Shield, Lock, Eye, UserCheck, Globe, Mail } from "lucide-react"

interface PrivacyPolicyProps {
  onBack: () => void
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Privacy Policy</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 mx-auto text-primary mb-3" />
          <h1 className="text-2xl font-bold">Aarya RK Social Chat</h1>
          <p className="text-muted-foreground">Your Privacy Matters</p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Data Collection</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We collect information you provide during registration including name, email, date of birth, 
            gender, and profile picture. This helps us provide a personalized experience and helps Aarya 
            remember you and your preferences.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">How We Use Your Data</h3>
          </div>
          <ul className="text-muted-foreground text-sm space-y-2">
            <li>- To create and manage your account</li>
            <li>- To enable Aarya to provide personalized responses</li>
            <li>- To allow communication with other users</li>
            <li>- To display relevant advertisements (non-premium users)</li>
            <li>- To improve our services</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Age Restriction</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Certain content may be restricted to users 18 years and above. We verify age during 
            registration and provide age-appropriate content filtering.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">International Users</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This app is available worldwide. We store data securely and comply with applicable 
            data protection regulations in your country.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Contact Us</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For any privacy concerns, contact us at:{" "}
            <a href="mailto:rkgroup813@gmail.com" className="text-primary">
              rkgroup813@gmail.com
            </a>
          </p>
        </section>

        <section className="bg-muted p-4 rounded-xl">
          <h3 className="font-bold mb-2">Your Rights</h3>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>- Access your personal data</li>
            <li>- Request data deletion</li>
            <li>- Opt out of marketing communications</li>
            <li>- Report privacy violations</li>
          </ul>
        </section>

        <p className="text-xs text-muted-foreground text-center pb-4">
          Last updated: April 2026
        </p>
      </div>
    </div>
  )
}
