
import { useAuth } from '@/contexts/AuthContext';
import { ROLES, Permission } from '@/types/rbac';

export const usePermissions = () => {
  const { user } = useAuth();

  const getUserRole = () => {
    if (!user) return null;
    return ROLES.find(role => role.id === user.role);
  };

  const hasPermission = (permissionId: string): boolean => {
    const role = getUserRole();
    if (!role) return false;
    
    return role.permissions.some(permission => permission.id === permissionId);
  };

  const hasAnyPermission = (permissionIds: string[]): boolean => {
    return permissionIds.some(permissionId => hasPermission(permissionId));
  };

  const hasAllPermissions = (permissionIds: string[]): boolean => {
    return permissionIds.every(permissionId => hasPermission(permissionId));
  };

  const canAccess = (resource: string, action: string): boolean => {
    const role = getUserRole();
    if (!role) return false;
    
    return role.permissions.some(permission => 
      permission.resource === resource && 
      (permission.action === action || permission.action === 'manage')
    );
  };

  return {
    user,
    role: getUserRole(),
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccess,
  };
};
