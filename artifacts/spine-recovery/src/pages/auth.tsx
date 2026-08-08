import { useSearch } from "wouter";
import { Apple, LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function GoogleMark() { return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.3 3.1-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1.9 4.3l3.3-2.6Z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z"/></svg>; }

export default function AuthPage({ embedded = false }: { initialMode?: "login" | "signup"; embedded?: boolean; onAuthenticated?: () => void }) {
  const search = useSearch();
  const error = new URLSearchParams(search).get("error");
  const start = (provider: "google" | "apple") => { window.location.assign(`/api/auth/${provider}`); };
  return <main className={embedded ? "bg-[var(--color-background)] p-0" : "min-h-screen bg-[var(--color-background)] px-4 py-8 sm:py-12"}>
    <div className={embedded ? "mx-auto max-w-md" : "mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center"}>
      <Card className="w-full border-[var(--color-border)] shadow-lg animate-slide-up"><CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-primary)]"><LockKeyhole className="h-7 w-7" /></div>
        <div><CardTitle className="text-2xl font-bold text-[var(--color-text)]">Welcome to Spine Recovery</CardTitle><CardDescription className="mt-2">Sign in securely to save your activity and personal preferences.</CardDescription></div>
      </CardHeader><CardContent className="space-y-4">
        <Button type="button" variant="outline" className="h-12 w-full rounded-xl" onClick={() => start("google")}><GoogleMark />Continue with Google</Button>
        <Button type="button" variant="outline" className="h-12 w-full rounded-xl" onClick={() => start("apple")}><Apple className="h-5 w-5" />Continue with Apple</Button>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">We couldn’t complete sign-in. Please try again.</p>}
        <p className="flex gap-2 rounded-xl bg-muted/70 p-3 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />We use your account only to secure your activity and preferences. This app does not provide medical advice.</p>
      </CardContent></Card>
    </div>
  </main>;
}
