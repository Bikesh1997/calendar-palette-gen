
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin';
  department?: 'inbound' | 'field' | 'branch';
  branch: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
