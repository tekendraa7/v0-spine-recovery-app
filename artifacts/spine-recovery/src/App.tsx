import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import HomePage from '@/pages/home';
import CalendarPage from '@/pages/calendar';
import ExercisesPage from '@/pages/exercises';
import ProgressPage from '@/pages/progress';
import SettingsPage from '@/pages/settings';
import OfflinePage from '@/pages/offline';
import WorkoutPlanPage from '@/pages/workout-plan';

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/exercises" component={ExercisesPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/offline" component={OfflinePage} />
      <Route path="/workout-plan" component={WorkoutPlanPage} />
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
