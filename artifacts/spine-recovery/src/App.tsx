import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect, useState, type ComponentType } from 'react';
import { useLocation } from 'wouter';
import HomePage from '@/pages/home';
import CalendarPage from '@/pages/calendar';
import ExercisesPage from '@/pages/exercises';
import ProgressPage from '@/pages/progress';
import SettingsPage from '@/pages/settings';
import OfflinePage from '@/pages/offline';
import WorkoutPlanPage from '@/pages/workout-plan';
import AuthPage from '@/pages/auth';
import OnboardingProfilePage from '@/pages/onboarding-profile';
import { getSessionUser } from '@/lib/auth/session';

function ProtectedPage({ component: Component }: { component: ComponentType }) {
  const [, navigate] = useLocation();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSession = Boolean(getSessionUser());
    setAuthenticated(hasSession);
    if (!hasSession) navigate('/login');
  }, [navigate]);

  if (authenticated !== true) return null;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={() => <AuthPage />} />
      <Route path="/signup" component={() => <AuthPage initialMode="signup" />} />
      <Route path="/onboarding-profile" component={OnboardingProfilePage} />
      <Route path="/" component={() => <ProtectedPage component={HomePage} />} />
      <Route path="/calendar" component={() => <ProtectedPage component={CalendarPage} />} />
      <Route path="/exercises" component={() => <ProtectedPage component={ExercisesPage} />} />
      <Route path="/progress" component={() => <ProtectedPage component={ProgressPage} />} />
      <Route path="/settings" component={() => <ProtectedPage component={SettingsPage} />} />
      <Route path="/offline" component={() => <ProtectedPage component={OfflinePage} />} />
      <Route path="/workout-plan" component={() => <ProtectedPage component={WorkoutPlanPage} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
