
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  User, 
  Baby, 
  UserCheck,
  Plus,
  Phone,
  Mail,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FamilyMember {
  name: string;
  relation: string;
  age?: number;
  products: string[];
  relationshipValue?: string;
  isCustomer: boolean;
  phone?: string;
  email?: string;
  opportunities?: string[];
}

interface FamilyGroupTabProps {
  family: FamilyMember[];
  onAddFamilyMember: () => void;
  onContactMember: (member: FamilyMember) => void;
}

const FamilyGroupTab = ({ family, onAddFamilyMember, onContactMember }: FamilyGroupTabProps) => {
  const { toast } = useToast();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    relation: '',
    age: '',
    phone: ''
  });

  const getRelationIcon = (relation: string) => {
    switch (relation.toLowerCase()) {
      case 'spouse': return User;
      case 'son': case 'daughter': case 'child': return Baby;
      case 'father': case 'mother': case 'parent': return UserCheck;
      default: return User;
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.relation) {
      toast({
        title: "Family Member Added",
        description: `${newMember.name} has been added to the family group`,
      });
      setNewMember({ name: '', relation: '', age: '', phone: '' });
      setIsAddingMember(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users size={20} className="mr-2" />
              Family Group Management
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsAddingMember(true)}
            >
              <Plus size={16} className="mr-2" />
              Add Member
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Member Form */}
          {isAddingMember && (
            <Card className="mb-6 border-teal-200">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-4">Add New Family Member</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relation">Relation</Label>
                    <Input
                      id="relation"
                      value={newMember.relation}
                      onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                      placeholder="e.g., Spouse, Son, Daughter"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newMember.age}
                      onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={handleAddMember} size="sm">Add Member</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingMember(false)} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Family Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {family.map((member, index) => {
              const RelationIcon = getRelationIcon(member.relation);
              return (
                <Card key={index} className={`${member.isCustomer ? 'border-teal-200 bg-teal-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className={`${member.isCustomer ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                            <RelationIcon size={12} className="text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.relation}</p>
                          {member.age && <p className="text-xs text-gray-500">Age: {member.age}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        {member.isCustomer ? (
                          <Badge className="bg-teal-100 text-teal-800 mb-1">Customer</Badge>
                        ) : (
                          <Badge variant="outline" className="mb-1">Prospect</Badge>
                        )}
                        {member.relationshipValue && (
                          <div className="text-sm font-medium text-gray-900">{member.relationshipValue}</div>
                        )}
                      </div>
                    </div>

                    {/* Products */}
                    {member.products.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Products:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.products.map((product, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Opportunities */}
                    {member.opportunities && member.opportunities.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Opportunities:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.opportunities.map((opportunity, idx) => (
                            <Badge key={idx} className="bg-orange-100 text-orange-800 text-xs">
                              {opportunity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Actions */}
                    <div className="flex space-x-2">
                      {member.phone && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => onContactMember(member)}
                        >
                          <Phone size={12} className="mr-1" />
                          Call
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Edit Member",
                            description: `Edit functionality for ${member.name}`,
                          });
                        }}
                      >
                        <Edit size={12} className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyGroupTab;
