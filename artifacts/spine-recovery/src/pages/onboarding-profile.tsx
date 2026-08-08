import { useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, HeartPulse, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSessionUser, setSessionUser } from '@/lib/auth/session';
import { updateUser } from '@/lib/db/users';
import type { RecoveryCondition, User } from '@/lib/types/user';

const conditions: { value: RecoveryCondition; label: string; description: string }[] = [
  { value: 'lower_back', label: 'Lower back', description: 'Lumbar pain or stiffness' },
  { value: 'neck', label: 'Neck', description: 'Neck or upper-back discomfort' },
  { value: 'both', label: 'Both', description: 'Support for neck and lower back' },
];

export default function OnboardingProfilePage() {
  const [, navigate] = useLocation();
  const sessionUser = getSessionUser();
  const [name, setName] = useState(sessionUser?.name ?? '');
  const [condition, setCondition] = useState<RecoveryCondition>('lower_back');
  const [painDuration, setPainDuration] = useState('');
  const [loading, setLoading] = useState(false);

  if (!sessionUser) {
    navigate('/login');
    return null;
  }
  const user: User = sessionUser;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const updated = {
      ...user,
      name: name.trim() || 'Recovery patient',
      condition,
      painDuration,
      onboardingComplete: true,
    };
    await updateUser(user.id, updated);
    setSessionUser(updated);
    navigate('/');
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <Card className="w-full border-[var(--color-border)] shadow-lg animate-slide-up">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-primary)]">
              <HeartPulse className="h-7 w-7" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl font-bold text-[var(--color-text)]">Let’s personalize your plan</CardTitle>
            <CardDescription>Just a few details to tailor your recovery guidance.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="profile-name">Your name</Label>
                <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="h-12 rounded-xl" placeholder="How should we call you?" required />
              </div>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">What are you managing?</legend>
                <div className="space-y-2">
                  {conditions.map((item) => (
                    <label key={item.value} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${condition === item.value ? 'border-[var(--color-primary)] bg-blue-50/60' : 'border-input bg-card'}`}>
                      <input className="sr-only" type="radio" name="condition" value={item.value} checked={condition === item.value} onChange={() => setCondition(item.value)} />
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${condition === item.value ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-muted-foreground'}`}><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /></span>
                      <span><span className="block font-medium">{item.label}</span><span className="block text-xs text-muted-foreground">{item.description}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="space-y-2">
                <Label htmlFor="pain-duration">How long has this been bothering you?</Label>
                <Input id="pain-duration" value={painDuration} onChange={(event) => setPainDuration(event.target.value)} className="h-12 rounded-xl" placeholder="For example: 3 months" required />
              </div>
              <Button className="h-12 w-full rounded-xl" type="submit" disabled={loading}>{loading && <LoaderCircle className="animate-spin" />} {loading ? 'Saving your plan…' : 'Continue to my plan'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
