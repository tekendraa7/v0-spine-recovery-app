import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, CalendarDays, Flame, LoaderCircle, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSessionUser, setSessionUser } from '@/lib/auth/session';
import { getWorkoutLogs, updateUser } from '@/lib/db/users';
import type { RecoveryCondition, User, WorkoutLog } from '@/lib/types/user';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const session = getSessionUser();
      if (session) {
        setUser(session);
        setLogs(await getWorkoutLogs(session.id));
      }
      setLoading(false);
    }
    void load();
  }, []);

  const stats = useMemo(() => {
    const dates = [...new Set(logs.map((log) => log.date))].sort();
    return { total: logs.length, last: dates.at(-1) ?? null, streak: dates.length ? 1 : 0 };
  }, [logs]);

  if (loading || !user) return <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-[var(--color-primary)]" /></div>;

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const currentUser = user;
    if (!currentUser) return;
    setSaving(true);
    const updated = await updateUser(currentUser.id, currentUser) ?? currentUser;
    setUser(updated); setSessionUser(updated); setSaved(true); setSaving(false);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return <main className="min-h-screen bg-[var(--color-background)] pb-12">
    <header className="border-b border-[var(--color-border)] bg-white"><div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4"><Link href="/" className="rounded-xl p-2 text-[var(--color-text-muted)] hover:bg-muted hover:text-[var(--color-text)]"><ArrowLeft className="h-5 w-5" /><span className="sr-only">Back to home</span></Link><div><h1 className="text-2xl font-bold text-[var(--color-text)]">My Profile</h1><p className="text-sm text-[var(--color-text-secondary)]">Your recovery details and activity</p></div></div></header>
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <section className="grid grid-cols-3 gap-3">
        {[{ label: 'Sessions', value: stats.total, icon: CalendarDays }, { label: 'Current streak', value: `${stats.streak} day`, icon: Flame }, { label: 'Last session', value: stats.last ? new Date(stats.last).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—', icon: UserRound }].map(({ label, value, icon: Icon }) => <Card key={label} className="border-[var(--color-border)] shadow-sm"><CardContent className="p-4"><Icon className="mb-2 h-5 w-5 text-[var(--color-primary)]" /><p className="text-lg font-bold text-[var(--color-text)]">{value}</p><p className="text-xs text-muted-foreground">{label}</p></CardContent></Card>)}
      </section>
      <Card className="border-[var(--color-border)] shadow-sm"><CardHeader><CardTitle>Personal details</CardTitle><CardDescription>Used only to personalize your recovery plan.</CardDescription></CardHeader><CardContent><form className="space-y-4" onSubmit={save}>
        <div className="space-y-2"><Label htmlFor="profile-username">Username</Label><Input id="profile-username" className="h-12 rounded-xl" value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} /></div>
        <div className="space-y-2"><Label htmlFor="profile-email">Email</Label><Input id="profile-email" type="email" className="h-12 rounded-xl" value={user.email ?? ''} onChange={(event) => setUser({ ...user, email: event.target.value })} /></div>
        <div className="space-y-2"><Label htmlFor="profile-phone">Phone number</Label><div className="flex gap-2"><Input aria-label="Country code" className="h-12 w-24 rounded-xl" value={user.countryCode ? `+${user.countryCode === 'NP' ? '977' : user.countryCode}` : '+977'} readOnly /><Input id="profile-phone" type="tel" className="h-12 rounded-xl" value={user.phone ?? ''} onChange={(event) => setUser({ ...user, phone: event.target.value })} placeholder="Phone number" /></div></div>
        <fieldset className="space-y-2"><legend className="text-sm font-medium">Condition</legend><div className="grid grid-cols-3 gap-2">{(['lower_back', 'neck', 'both'] as RecoveryCondition[]).map((condition) => <button key={condition} type="button" onClick={() => setUser({ ...user, condition })} className={`min-h-11 rounded-xl border px-2 text-sm font-medium capitalize ${user.condition === condition ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]' : 'border-input text-[var(--color-text-secondary)]'}`}>{condition === 'lower_back' ? 'Lower back' : condition === 'neck' ? 'Neck' : 'Both'}</button>)}</div></fieldset>
        <Button type="submit" className="h-12 w-full rounded-xl" disabled={saving}>{saving && <LoaderCircle className="animate-spin" />}{saving ? 'Saving…' : saved ? 'Saved' : 'Save profile'}</Button>
      </form></CardContent></Card>
      <Card className="border-[var(--color-border)] shadow-sm"><CardHeader><CardTitle>My Workouts</CardTitle><CardDescription>Your saved recovery sessions.</CardDescription></CardHeader><CardContent>{logs.length === 0 ? <div className="rounded-xl bg-muted/70 px-4 py-8 text-center text-sm text-muted-foreground">No sessions yet — log your first workout to start tracking your recovery.</div> : <div className="space-y-3">{[...logs].reverse().map((log) => <div key={log.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4"><div><p className="font-medium text-[var(--color-text)]">{log.routineName}</p><p className="mt-1 text-sm text-muted-foreground">{new Date(log.date).toLocaleDateString()}</p></div><div className="text-right text-sm text-muted-foreground">{log.durationMinutes ? `${log.durationMinutes} min` : 'Completed'}{log.painLevel ? <p>Pain {log.painLevel}/10</p> : null}</div></div>)}</div>}</CardContent></Card>
    </div>
  </main>;
}
