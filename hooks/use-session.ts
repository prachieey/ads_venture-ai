import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useSession(required = false, redirectTo = '/login') {
  const [user, setUser] = useState<{name: string; email: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the auth token with your backend
        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='));

        if (authToken) {
          // Simulate fetching user data
          setUser({
            name: 'Demo User',
            email: 'demo@ventureai.com'
          });
        } else if (required) {
          router.push(redirectTo);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        if (required) {
          router.push(redirectTo);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [required, redirectTo, router]);

  return { user, loading };
}
