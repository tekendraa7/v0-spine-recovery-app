import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AuthPage from '@/pages/auth';

type AuthDialogContextValue = { requireAuth: (action?: () => void, message?: string) => void };
const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Create a free account to save your progress.');
  const [pendingAction, setPendingAction] = useState<(() => void) | undefined>();
  const requireAuth = useCallback((action?: () => void, nextMessage?: string) => {
    setPendingAction(() => action);
    setMessage(nextMessage ?? 'Create a free account to save your progress.');
    setOpen(true);
  }, []);
  return <AuthDialogContext.Provider value={{ requireAuth }}>
    {children}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-0 bg-transparent p-0 shadow-none">
        <DialogHeader className="sr-only"><DialogTitle>Log in or sign up</DialogTitle><DialogDescription>{message}</DialogDescription></DialogHeader>
        <div className="rounded-xl border bg-card shadow-lg"><p className="px-6 pt-5 text-center text-sm text-muted-foreground">{message}</p><AuthPage embedded /></div>
      </DialogContent>
    </Dialog>
  </AuthDialogContext.Provider>;
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) throw new Error('useAuthDialog must be used within AuthDialogProvider');
  return context;
}
