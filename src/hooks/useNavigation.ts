import { useQuery } from '@tanstack/react-query';
import { UserRole } from '../types/auth';

interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon?: string;
}

const mockNavigationData: Record<UserRole, NavigationItem[]> = {
  'super-admin': [
    { id: '1', name: 'Dashboard', href: '/dashboard' },
    { id: '2', name: 'Users', href: '/dashboard/users' },
    { id: '3', name: 'Settings', href: '/dashboard/settings' },
    { id: '4', name: 'Reports', href: '/dashboard/reports' },
    { id: '5', name: 'System', href: '/dashboard/system' },
  ],
  'admin': [
    { id: '1', name: 'Dashboard', href: '/dashboard' },
    { id: '2', name: 'Users', href: '/dashboard/users' },
    { id: '3', name: 'Settings', href: '/dashboard/settings' },
  ],
  'employee': [
    { id: '1', name: 'Dashboard', href: '/dashboard' },
    { id: '2', name: 'Profile', href: '/dashboard/profile' },
  ],
};

export function useNavigation(role: UserRole) {
  return useQuery({
    queryKey: ['navigation', role],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockNavigationData[role];
    },
  });
}