import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect, useState, type ComponentType } from 'react';
import HomePage from '@/pages/home';
import CalendarPage from '@/pages/calendar';
import ExercisesPage from '@/pages/exercises';
import ProgressPage from '@/pages/progress';
import SettingsPage from '@/pages/settings';
import OfflinePage from '@/pages/offline';
import WorkoutPlanPage from '@/pages/workout-plan';
import AuthPage from '@/pages/auth';
import OnboardingProfilePage from '@/pages/onboarding-profile';
import { getSessionUser, refreshSession } from '@/lib/auth/session';
import { AuthDialogProvider, useAuthDialog } from '@/components/auth-dialog';
import ProfilePage from '@/pages/profile';

function AccountRequiredRoute({ component: Component, message }: { component: ComponentType; message: string }) {
  const { requireAuth } = useAuthDialog();
  const [user, setUser] = useState(getSessionUser());
  useEffect(() => {
    if (!user) requireAuth(() => setUser(getSessionUser()), message);
  }, [message, requireAuth, user]);
  if (!user) {
    return null;
  }
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={() => <AuthPage />} />
      <Route path="/signup" component={() => <AuthPage initialMode="signup" />} />
      <Route path="/onboarding-profile" component={OnboardingProfilePage} />
      <Route path="/profile" component={() => <AccountRequiredRoute component={ProfilePage} message="Create a free account to view and manage your profile." />} />
      <Route path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/exercises" component={ExercisesPage} />
      <Route path="/progress" component={() => <AccountRequiredRoute component={ProgressPage} message="Create a free account to view your personal recovery progress." />} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/offline" component={OfflinePage} />
      <Route path="/workout-plan" component={WorkoutPlanPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { void refreshSession().finally(() => setReady(true)); }, []);
  if (!ready) return <div className="grid min-h-screen place-items-center bg-[var(--color-background)]"><span className="sr-only">Loading</span><div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" /></div>;
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <AuthDialogProvider><Router /></AuthDialogProvider>
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
