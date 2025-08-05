
import { useAuth } from '@/contexts/AuthContext';
import { getFeaturesForRole, hasFeatureAccess, Feature } from '@/config/roleFeatures';

export const useRoleFeatures = () => {
  const { user } = useAuth();

  const getAvailableFeatures = (): Feature[] => {
    if (!user?.role) return [];
    return getFeaturesForRole(user.role);
  };

  const canAccessFeature = (featureId: string): boolean => {
    if (!user?.role) return false;
    return hasFeatureAccess(user.role, featureId);
  };

  const getNavigationItems = () => {
    return getAvailableFeatures().map(feature => ({
      name: feature.name,
      href: feature.path,
      icon: feature.icon,
      description: feature.description
    }));
  };

  return {
    availableFeatures: getAvailableFeatures(),
    canAccessFeature,
    getNavigationItems,
    userRole: user?.role
  };
};
