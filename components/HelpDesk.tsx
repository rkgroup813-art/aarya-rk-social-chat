"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, MessageSquare, Bug, Shield, CreditCard, User, ChevronRight, Send } from "lucide-react"

interface HelpDeskProps {
  onBack: () => void
}

export default function HelpDesk({ onBack }: HelpDeskProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const topics = [
    { id: "account", icon: User, label: "Account Issues", description: "Login, password, profile problems" },
    { id: "chat", icon: MessageSquare, label: "Chat Problems", description: "Aarya not responding, message issues" },
    { id: "payment", icon: CreditCard, label: "Payment & Premium", description: "Subscription, billing, refunds" },
    { id: "bug", icon: Bug, label: "Report a Bug", description: "App crashes, errors, glitches" },
    { id: "safety", icon: Shield, label: "Safety Concerns", description: "Harassment, inappropriate content" },
    { id: "other", icon: HelpCircle, label: "Other", description: "General questions and feedback" },
  ]

  const faqs = [
    { q: "Aarya reply nahi de rahi?", a: "Please check your internet connection. If problem persists, try logging out and back in." },
    { q: "Password kaise reset karein?", a: "Login page par 'Forgot Password' click karein aur apna email enter karein." },
    { q: "Premium kaise cancel karein?", a: "Settings > Premium > Manage Subscription > Cancel" },
    { q: "Account delete kaise karein?", a: "Settings > Account > Delete Account. Note: This action is permanent." },
  ]

  const handleSubmit = async () => {
    if (!message.trim() || !selectedTopic) return
    
    // In a real app, this would send to support
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Help Desk</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              We will respond to your query at rkgroup813@gmail.com within 24-48 hours.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (selectedTopic) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <button onClick={() => setSelectedTopic(null)} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {topics.find(t => t.id === selectedTopic)?.label}
          </h2>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <p className="text-muted-foreground">
            Describe your issue in detail. We will respond via email.
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Apni problem yahan likhein..."
            className="w-full h-40 bg-muted rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50"
          >
            Submit Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Help Desk</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-bold mb-3">How can we help?</h3>
          <div className="space-y-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className="w-full p-4 bg-muted rounded-xl flex items-center gap-3 hover:bg-muted/80 transition-colors"
              >
                <div className="p-2 bg-primary/20 rounded-lg">
                  <topic.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{topic.label}</p>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <h3 className="font-bold mb-3">FAQs</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-muted rounded-xl">
                <summary className="p-4 cursor-pointer font-medium">{faq.q}</summary>
                <p className="px-4 pb-4 text-muted-foreground text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="bg-primary/10 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Direct contact:</p>
            <a href="mailto:rkgroup813@gmail.com" className="text-primary font-semibold">
              rkgroup813@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
