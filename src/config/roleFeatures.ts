// Feature access configuration for different roles
export interface Feature {
  id: string;
  name: string;
  path: string;
  icon: string;
  roles: string[];
  description: string;
}

export const FEATURES: Feature[] = [
  // Field Executive Features
  {
    id: 'dashboard',
    name: 'My Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager'],
    description: 'Personal performance dashboard'
  },
  {
    id: 'my_leads',
    name: 'My Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager'],
    description: 'Manage assigned leads'
  },
  {
    id: 'my_tasks',
    name: 'My Tasks',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager'],
    description: 'Personal task management'
  },
  {
    id: 'customer_360',
    name: 'Customer 360',
    path: '/customers',
    icon: 'Users',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager'],
    description: 'Customer relationship management'
  },
  {
    id: 'plan_my_day',
    name: 'My Day',
    path: '/plan-my-day',
    icon: 'MapPin',
    roles: ['sales_executive', 'relationship_manager'],
    description: 'Route planning and daily visit optimization'
  },
  {
    id: 'sales_funnel',
    name: 'My Pipeline',
    path: '/funnel',
    icon: 'BarChart3',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager'],
    description: 'Personal sales pipeline'
  },

  // Supervisor Features
  {
    id: 'supervisor_dashboard',
    name: 'Team Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['supervisor'],
    description: 'Team performance overview'
  },
  {
    id: 'portfolio_management',
    name: 'Portfolio',
    path: '/portfolio',
    icon: 'PieChart',
    roles: ['supervisor'],
    description: 'Portfolio oversight and management'
  },
  {
    id: 'team_performance',
    name: 'Performance Analytics',
    path: '/team-performance',
    icon: 'TrendingUp',
    roles: ['supervisor'],
    description: 'Team performance analytics'
  },
  {
    id: 'territory_management',
    name: 'Territory Management',
    path: '/territory-management',
    icon: 'MapPin',
    roles: ['supervisor'],
    description: 'Manage sales territories'
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    path: '/reports',
    icon: 'BarChart3',
    roles: ['supervisor'],
    description: 'Generate team reports'
  },
  {
    id: 'rule_management',
    name: 'Rule Management',
    path: '/rule-management',
    icon: 'Shield',
    roles: ['supervisor'],
    description: 'Manage business rules and automation'
  },
  {
    id: 'kpa_management',
    name: 'KPA Management',
    path: '/kpa-management',
    icon: 'Target',
    roles: ['supervisor'],
    description: 'Key performance area management'
  },

  // Admin Features - removed admin_dashboard
  {
    id: 'user_management',
    name: 'User Management',
    path: '/user-management',
    icon: 'Users',
    roles: ['admin'],
    description: 'Manage system users and roles'
  },
  {
    id: 'cross_selling_rules',
    name: 'Cross Selling Rules',
    path: '/cross-selling-rules',
    icon: 'Settings',
    roles: ['admin'],
    description: 'Configure cross-selling automation rules'
  },
  {
    id: 'offer_management_rule',
    name: 'Offer Management Rule',
    path: '/offer-management-rule',
    icon: 'Tag',
    roles: ['admin'],
    description: 'Manage product offers and pricing rules'
  },
  {
    id: 'financial_education',
    name: 'Financial Education',
    path: '/financial-education',
    icon: 'GraduationCap',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager', 'supervisor', 'admin'],
    description: 'Financial literacy platform with guides and calculators'
  },
  {
    id: 'event_management',
    name: 'Event Management',
    path: '/event-management',
    icon: 'Calendar',
    roles: ['admin'],
    description: 'Manage system events and triggers'
  },
  {
    id: 'kra_management',
    name: 'KRA Management',
    path: '/kra-management',
    icon: 'Target',
    roles: ['admin'],
    description: 'Configure key result areas'
  },
  {
    id: 'geo_hierarchy_management',
    name: 'Geo Hierarchy',
    path: '/geo-hierarchy-management',
    icon: 'MapPin',
    roles: ['admin'],
    description: 'Manage geographical hierarchy structure'
  },
  {
    id: 'gamification',
    name: 'Achievements',
    path: '/gamification',
    icon: 'Trophy',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager', 'supervisor', 'admin'],
    description: 'KRA gamification with points, badges, and leaderboards'
  },
  {
    id: 'tools',
    name: 'Tools',
    path: '/tools',
    icon: 'Calculator',
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager', 'supervisor'],
    description: 'calculators'
  }
];

// Get features for a specific role
export const getFeaturesForRole = (role: string): Feature[] => {
  return FEATURES.filter(feature => feature.roles.includes(role));
};

// Check if a role has access to a feature
export const hasFeatureAccess = (role: string, featureId: string): boolean => {
  const feature = FEATURES.find(f => f.id === featureId);
  return feature ? feature.roles.includes(role) : false;
};

// Get icon component mapping
export const getIconName = (iconName: string) => {
  const iconMap: { [key: string]: string } = {
    'Home': 'Home',
    'UserPlus': 'UserPlus',
    'ClipboardList': 'ClipboardList',
    'Users': 'Users',
    'MapPin': 'MapPin',
    'BarChart3': 'BarChart3',
    'TrendingUp': 'TrendingUp',
    'Activity': 'Activity',
    'Target': 'Target',
    'PieChart': 'PieChart',
    'Shield': 'Shield',
    'Settings': 'Settings',
    'Tag': 'Tag',
    'Calendar': 'Calendar',
    'Workflow': 'Workflow',
    'Trophy': 'Trophy',
    'GraduationCap': 'GraduationCap'
  };
  return iconMap[iconName] || 'Home';
};
