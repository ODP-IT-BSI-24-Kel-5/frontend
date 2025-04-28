"use client"
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';

export const useAutoLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    const checkAuth = () => {
      const isValid = checkAuthStatus();
      if (!isValid && !pathname.includes('/login')) {
        router.push('/login');
      }
    };

    checkAuth();

  }, [router, checkAuthStatus, pathname]);
};

