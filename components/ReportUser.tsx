"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, AlertTriangle, Check } from "lucide-react"

interface ReportUserProps {
  reporterId: string
  reportedUserId?: string
  reportedPostId?: string
  onBack: () => void
}

export default function ReportUser({ reporterId, reportedUserId, reportedPostId, onBack }: ReportUserProps) {
  const [reason, setReason] = useState("")
  const [selectedReason, setSelectedReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const reasons = [
    "Inappropriate content",
    "Harassment or bullying",
    "Fake profile",
    "Spam",
    "Hate speech",
    "Violence",
    "Adult content (18+)",
    "Impersonation",
    "Other"
  ]

  const handleSubmit = async () => {
    if (!selectedReason) return
    
    setLoading(true)

    const { error } = await supabase.from("reports").insert({
      reporter_id: reporterId,
      reported_user_id: reportedUserId || null,
      reported_post_id: reportedPostId || null,
      reason: selectedReason === "Other" ? reason : selectedReason
    })

    if (!error) {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Report</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Report Submitted</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for reporting. Our team will review this within 24 hours.
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

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Report</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200">
            False reports may result in action against your account. Please report only genuine violations.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Select a reason:</h3>
          <div className="space-y-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  selectedReason === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {selectedReason === "Other" && (
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe the issue..."
            className="w-full h-32 bg-muted rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedReason || loading || (selectedReason === "Other" && !reason.trim())}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  )
}
