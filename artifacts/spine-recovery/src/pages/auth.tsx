import { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown, LoaderCircle, LockKeyhole, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPhoneOtpProvider } from '@/lib/auth/phone-otp';
import { setSessionUser } from '@/lib/auth/session';
import { createUser, getUserByEmail, getUserByPhone } from '@/lib/db/users';
import type { AuthProvider, User } from '@/lib/types/user';

type Mode = 'login' | 'signup';
type Screen = 'form' | 'otp';

const countries = [
  { name: 'Nepal', flag: '🇳🇵', dial: '+977', code: 'NP' },
  { name: 'United States', flag: '🇺🇸', dial: '+1', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', dial: '+44', code: 'GB' },
  { name: 'India', flag: '🇮🇳', dial: '+91', code: 'IN' },
  { name: 'Australia', flag: '🇦🇺', dial: '+61', code: 'AU' },
];

function GoogleMark() { return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.3 3.1-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1.9 4.3l3.3-2.6Z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z"/></svg>; }
function FacebookMark() { return <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-xs font-bold text-white">f</span>; }

export default function AuthPage({ initialMode = 'login' }: { initialMode?: Mode }) {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [screen, setScreen] = useState<Screen>('form');
  const [country, setCountry] = useState(countries[0]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fullPhone = `${country.dial}${phone.replace(/\D/g, '')}`;

  function makeUser(provider: AuthProvider, details: Pick<User, 'email' | 'phone' | 'countryCode'>): User {
    return { id: crypto.randomUUID(), name: '', authProvider: provider, createdAt: new Date().toISOString(), onboardingComplete: false, ...details };
  }

  async function finish(user: User, isNew: boolean) {
    setSessionUser(user);
    navigate(isNew || !user.onboardingComplete ? '/onboarding-profile' : '/');
  }

  async function handleEmail(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading('email');
    try {
      if (!email || password.length < 8) throw new Error('Enter your email and a password of at least 8 characters.');
      const existing = await getUserByEmail(email);
      if (mode === 'login' && !existing) throw new Error('We couldn’t find an account with that email. Try signing up instead.');
      if (mode === 'signup' && existing) throw new Error('An account already exists with that email. Try logging in instead.');
      await finish(existing ?? await createUser(makeUser('email', { email })), !existing);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Couldn’t sign in. Try again.'); }
    finally { setLoading(null); }
  }

  async function sendOtp() {
    setError(null);
    if (phone.replace(/\D/g, '').length < 6) { setError('Enter a valid phone number.'); return; }
    setLoading('phone');
    try { await mockPhoneOtpProvider.send(fullPhone); setScreen('otp'); }
    catch { setError('Couldn’t send a code. Try again.'); }
    finally { setLoading(null); }
  }

  async function verifyOtp(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading('otp');
    try {
      if (otp.length !== 6 || !(await mockPhoneOtpProvider.verify(fullPhone, otp))) throw new Error('That code isn’t correct. Check the console for the mock code and try again.');
      const existing = await getUserByPhone(fullPhone);
      if (mode === 'login' && !existing) throw new Error('We couldn’t find an account for this number. Try signing up instead.');
      await finish(existing ?? await createUser(makeUser('phone', { phone: fullPhone, countryCode: country.code })), !existing);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Couldn’t verify that code. Try again.'); }
    finally { setLoading(null); }
  }

  async function handleSocial(provider: 'google' | 'facebook') {
    setError(null); setLoading(provider);
    // Auth.js redirect belongs in a server-side route. This local flow keeps the
    // prototype testable until the provider credentials are configured.
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = await createUser(makeUser(provider, { email: `${provider}-demo@spine-recovery.local` }));
    await finish(user, true);
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <Card className="w-full border-[var(--color-border)] shadow-lg animate-slide-up">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-primary)]"><LockKeyhole className="h-7 w-7" aria-hidden="true" /></div>
            <div><CardTitle className="text-2xl font-bold text-[var(--color-text)]">Welcome to Spine Recovery</CardTitle><CardDescription className="mt-2">Build a recovery plan that fits your life.</CardDescription></div>
            <Tabs value={mode} onValueChange={(value) => { setMode(value as Mode); setError(null); }}><TabsList className="grid h-11 w-full grid-cols-2 rounded-xl"><TabsTrigger className="rounded-lg" value="login">Log in</TabsTrigger><TabsTrigger className="rounded-lg" value="signup">Sign up</TabsTrigger></TabsList></Tabs>
          </CardHeader>
          <CardContent className="space-y-5">
            {screen === 'otp' ? <form className="space-y-5" onSubmit={verifyOtp}>
              <div className="text-center"><h2 className="font-semibold">Check your phone</h2><p className="mt-1 text-sm text-muted-foreground">Enter the six-digit code sent to {fullPhone}.</p></div>
              <div className="space-y-2"><Label htmlFor="otp">Verification code</Label><Input id="otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} className="h-14 rounded-xl text-center text-2xl tracking-[0.45em]" placeholder="••••••" autoFocus /></div>
              <Button className="h-12 w-full rounded-xl" type="submit" disabled={loading !== null}>{loading === 'otp' && <LoaderCircle className="animate-spin" />}{loading === 'otp' ? 'Verifying…' : 'Verify code'}</Button>
              <Button className="h-11 w-full" type="button" variant="ghost" onClick={() => setScreen('form')}>Use a different method</Button>
            </form> : <>
              <div className="space-y-3">
                <Button type="button" variant="outline" className="h-12 w-full rounded-xl" disabled={loading !== null} onClick={() => handleSocial('google')}><GoogleMark />{loading === 'google' ? 'Connecting to Google…' : 'Continue with Google'}</Button>
                <Button type="button" variant="outline" className="h-12 w-full rounded-xl" disabled={loading !== null} onClick={() => handleSocial('facebook')}><FacebookMark />{loading === 'facebook' ? 'Connecting to Facebook…' : 'Continue with Facebook'}</Button>
              </div>
              <div className="flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">or</span><span className="h-px flex-1 bg-border" /></div>
              <section className="space-y-3" aria-labelledby="phone-title"><div><h2 id="phone-title" className="text-sm font-semibold">Continue with phone</h2><p className="text-xs text-muted-foreground">We’ll text you a one-time verification code.</p></div>
                <div className="flex gap-2"><Popover><PopoverTrigger asChild><Button type="button" variant="outline" className="h-12 min-w-27 justify-between rounded-xl px-3" aria-label="Choose country">{country.flag} <span>{country.dial}</span><ChevronDown className="h-4 w-4" /></Button></PopoverTrigger><PopoverContent align="start" className="w-72 p-0"><Command><CommandInput placeholder="Search country…" /><CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup>{countries.map((item) => <CommandItem key={item.code} value={`${item.name} ${item.dial}`} onSelect={() => setCountry(item)}>{item.flag} <span>{item.name}</span><span className="ml-auto text-muted-foreground">{item.dial}</span></CommandItem>)}</CommandGroup></CommandList></Command></PopoverContent></Popover><Input aria-label="Phone number" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(event) => setPhone(event.target.value)} className="h-12 rounded-xl" placeholder="Phone number" /></div>
                <Button type="button" className="h-12 w-full rounded-xl" disabled={loading !== null} onClick={sendOtp}><Phone />{loading === 'phone' ? 'Sending code…' : 'Send verification code'}</Button>
              </section>
              <div className="flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">or use email</span><span className="h-px flex-1 bg-border" /></div>
              <form className="space-y-3" onSubmit={handleEmail}><div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl" placeholder="you@example.com" required /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl" placeholder="At least 8 characters" required /></div><Button type="submit" className="h-12 w-full rounded-xl" disabled={loading !== null}>{loading === 'email' && <LoaderCircle className="animate-spin" />}{loading === 'email' ? 'Please wait…' : mode === 'login' ? 'Log in with email' : 'Create account with email'}</Button></form>
            </>}
            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <p className="flex gap-2 rounded-xl bg-muted/70 p-3 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />Your information is kept private and used only to personalize your recovery plan.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
