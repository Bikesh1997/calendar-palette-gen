
import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGateProps {
  children: ReactNode;
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  resource?: string;
  action?: string;
  fallback?: ReactNode;
}

const PermissionGate = ({ 
  children, 
  permission, 
  permissions, 
  requireAll = false,
  resource,
  action,
  fallback = null 
}: PermissionGateProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, canAccess } = usePermissions();

  let hasAccess = false;

  if (resource && action) {
    hasAccess = canAccess(resource, action);
  } else if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
  } else {
    hasAccess = true; // No restrictions
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;
