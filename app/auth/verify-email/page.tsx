import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Email Verify Karo!</h1>
        <p className="text-muted-foreground mb-6">
          Tumhare email pe verification link bhej diya hai. Link pe click karke apna account verify karo!
        </p>
        <div className="space-y-3">
          <Link 
            href="/auth/login" 
            className="block w-full py-3 rounded-lg gradient-bg text-white font-semibold"
          >
            Login Page pe Jao
          </Link>
          <p className="text-sm text-muted-foreground">
            Email nahi mila? Spam folder bhi check karo!
          </p>
        </div>
      </div>
    </div>
  );
}
