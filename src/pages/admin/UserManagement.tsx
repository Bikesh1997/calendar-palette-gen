
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Edit, Trash2, RotateCcw, Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddUserModal from '@/components/admin/AddUserModal';
import EditUserModal from '@/components/admin/EditUserModal';
import UserActivityModal from '@/components/admin/UserActivityModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  zone: string;
  region: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@bank.com',
    role: 'sales_executive',
    department: 'field',
    branch: 'Mumbai Central',
    zone: 'West',
    region: 'Mumbai',
    status: 'active',
    lastLogin: '2024-01-15 09:30',
    createdAt: '2023-06-01'
  },
  {
    id: '2',
    name: 'Heena Thakkar',
    email: 'priya.sharma@bank.com',
    role: 'relationship_manager',
    department: 'branch',
    branch: 'Delhi North',
    zone: 'North',
    region: 'Delhi NCR',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    createdAt: '2023-05-15'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@bank.com',
    role: 'supervisor',
    department: 'field',
    branch: 'Bangalore South',
    zone: 'South',
    region: 'Karnataka',
    status: 'inactive',
    lastLogin: '2024-01-10 16:20',
    createdAt: '2023-04-20'
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (userData: any) => {
    const newUser: User = {
      id: String(users.length + 1),
      ...userData,
      status: 'active',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setAddModalOpen(false);
    toast({
      title: "User Added",
      description: `${userData.name} has been successfully added to the system.`,
    });
  };

  const handleEditUser = (userData: any) => {
    setUsers(users.map(user => 
      user.id === selectedUser?.id ? { ...user, ...userData } : user
    ));
    setEditModalOpen(false);
    setSelectedUser(null);
    toast({
      title: "User Updated",
      description: "User information has been successfully updated.",
    });
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
    toast({
      title: "Status Updated",
      description: "User status has been changed successfully.",
    });
  };

  const handleResetPassword = (userId: string) => {
    const user = users.find(u => u.id === userId);
    toast({
      title: "Password Reset",
      description: `Password reset email sent to ${user?.email}`,
    });
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      'sales_executive': 'Field Sales Officer',
      'relationship_manager': 'Relationship Manager',
      'supervisor': 'Branch Manager',
      'inbound_agent': 'Contact Center Agent',
      'admin': 'System Administrator'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.status === 'inactive').length}
            </div>
            <div className="text-sm text-gray-600">Inactive Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'sales_executive').length}
            </div>
            <div className="text-sm text-gray-600">Field Officers</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="sales_executive">Field Sales Officer</SelectItem>
                <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
                <SelectItem value="supervisor">Branch Manager</SelectItem>
                <SelectItem value="inbound_agent">Contact Center Agent</SelectItem>
                <SelectItem value="admin">System Administrator</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
  <CardHeader>
    <CardTitle>Users ({filteredUsers.length})</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Table for md and up */}
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Zone/Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleDisplay(user.role)}</TableCell>
              <TableCell>{user.branch}</TableCell>
              <TableCell>{user.zone} / {user.region}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setActivityModalOpen(true); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setEditModalOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleResetPassword(user.id)}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Card version for small screens */}
    <div className="md:hidden space-y-4">
      {filteredUsers.map((user) => (
        <div key={user.id} className="border rounded-lg p-4 space-y-2 shadow-sm">
          <div className="font-semibold text-lg">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="text-sm"><strong>Role:</strong> {getRoleDisplay(user.role)}</div>
          <div className="text-sm"><strong>Branch:</strong> {user.branch}</div>
          <div className="text-sm"><strong>Zone/Region:</strong> {user.zone} / {user.region}</div>
          <div className="text-sm"><strong>Status:</strong> 
            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="ml-1">
              {user.status}
            </Badge>
          </div>
          <div className="text-sm"><strong>Last Login:</strong> {user.lastLogin}</div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setActivityModalOpen(true); }}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setEditModalOpen(true); }}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleResetPassword(user.id)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

      {/* Modals */}
      <AddUserModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddUser}
      />
      
      {selectedUser && (
        <>
          <EditUserModal 
            isOpen={editModalOpen}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onSave={handleEditUser}
          />
          <UserActivityModal 
            isOpen={activityModalOpen}
            onClose={() => {
              setActivityModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;
