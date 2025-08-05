
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  level: number; // Higher level = more privileges
}

export interface UserRole {
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
}

export const PERMISSIONS = {
  // Lead Management
  LEAD_CREATE: { id: 'lead_create', name: 'Create Lead', resource: 'leads', action: 'create' as const },
  LEAD_READ: { id: 'lead_read', name: 'View Leads', resource: 'leads', action: 'read' as const },
  LEAD_UPDATE: { id: 'lead_update', name: 'Update Lead', resource: 'leads', action: 'update' as const },
  LEAD_DELETE: { id: 'lead_delete', name: 'Delete Lead', resource: 'leads', action: 'delete' as const },
  LEAD_ASSIGN: { id: 'lead_assign', name: 'Assign Leads', resource: 'leads', action: 'manage' as const },
  
  // Task Management
  TASK_CREATE: { id: 'task_create', name: 'Create Task', resource: 'tasks', action: 'create' as const },
  TASK_READ: { id: 'task_read', name: 'View Tasks', resource: 'tasks', action: 'read' as const },
  TASK_UPDATE: { id: 'task_update', name: 'Update Task', resource: 'tasks', action: 'update' as const },
  TASK_DELETE: { id: 'task_delete', name: 'Delete Task', resource: 'tasks', action: 'delete' as const },
  
  // Reports
  REPORT_VIEW: { id: 'report_view', name: 'View Reports', resource: 'reports', action: 'read' as const },
  REPORT_GENERATE: { id: 'report_generate', name: 'Generate Reports', resource: 'reports', action: 'create' as const },
  
  // User Management
  USER_MANAGE: { id: 'user_manage', name: 'Manage Users', resource: 'users', action: 'manage' as const },
  USER_VIEW: { id: 'user_view', name: 'View Users', resource: 'users', action: 'read' as const },
};

export const ROLES: Role[] = [
  {
    id: 'sales_executive',
    name: 'Field Executive',
    description: 'Field sales representative',
    level: 1,
    permissions: [
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.USER_VIEW,
    ]
  },
  {
    id: 'inbound_agent',
    name: 'Inbound sales',
    description: 'Inbound sales',
    level: 1,
    permissions: [
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.USER_VIEW,
    ]
  },
  {
    id: 'relationship_manager',
    name: 'Relationship Manager',
    description: 'Customer relationship manager',
    level: 1,
    permissions: [
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.USER_VIEW,
    ]
  },
  {
    id: 'supervisor',
    name: 'Supervisor',
    description: 'Team supervisor with management access',
    level: 2,
    permissions: [
      PERMISSIONS.LEAD_CREATE,
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.LEAD_DELETE,
      PERMISSIONS.LEAD_ASSIGN,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.TASK_DELETE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_GENERATE,
      PERMISSIONS.USER_MANAGE,
      PERMISSIONS.USER_VIEW,
    ]
  }
];
