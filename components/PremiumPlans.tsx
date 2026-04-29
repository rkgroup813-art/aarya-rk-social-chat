"use client"

import { useState } from "react"
import { X, Check, Crown, Sparkles, Zap } from "lucide-react"

interface PremiumPlansProps {
  onClose: () => void
  onSubscribe: (plan: string) => void
}

export default function PremiumPlans({ onClose, onSubscribe }: PremiumPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 99,
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Ad-free experience",
        "Priority replies from Aarya",
        "Basic profile badge",
        "30 days validity"
      ]
    },
    {
      id: "standard",
      name: "Standard",
      price: 199,
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        "All Basic features",
        "Unlimited Aarya chats",
        "Gold profile badge",
        "See who viewed profile",
        "60 days validity"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 599,
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
      features: [
        "All Standard features",
        "Diamond profile badge",
        "Priority support",
        "Exclusive features first",
        "Custom Aarya personality",
        "1 year validity"
      ]
    }
  ]

  const handleSubscribe = async () => {
    if (!selectedPlan) return
    setLoading(true)
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onSubscribe(selectedPlan)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-xl font-bold">Premium Plans</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-muted-foreground text-center">
            Upgrade to Premium for an ad-free experience and exclusive features!
          </p>

          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.color}`}>
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{plan.name}</h3>
                  <p className="text-2xl font-bold">
                    Rs. {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">
                      {plan.id === "premium" ? "/year" : "/month"}
                    </span>
                  </p>
                </div>
                {selectedPlan === plan.id && (
                  <div className="ml-auto w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <button
            onClick={handleSubscribe}
            disabled={!selectedPlan || loading}
            className="w-full py-3 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : selectedPlan ? `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name}` : "Select a Plan"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Payment secured by Razorpay. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
