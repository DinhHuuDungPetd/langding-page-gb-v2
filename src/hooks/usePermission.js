
import { getPermissionsFromToken } from '@/utils/auth';

export function usePermission(requiredPermissions = []) {
  const userPermissions = getPermissionsFromToken();

  return requiredPermissions.every(p => userPermissions.includes(p));
}
