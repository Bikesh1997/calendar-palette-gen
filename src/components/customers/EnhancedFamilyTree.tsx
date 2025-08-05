
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Heart, 
  User, 
  Baby, 
  UserCheck,
  IndianRupee,
  TrendingUp,
  Plus,
  Phone,
  Mail
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

interface EnhancedFamilyTreeProps {
  family: FamilyMember[];
  onAddFamilyMember: () => void;
  onContactMember: (member: FamilyMember) => void;
}

const EnhancedFamilyTree = ({ family, onAddFamilyMember, onContactMember }: EnhancedFamilyTreeProps) => {
  const { toast } = useToast();

  const getRelationIcon = (relation: string) => {
    switch (relation.toLowerCase()) {
      case 'spouse': return Heart;
      case 'son': case 'daughter': case 'child': return Baby;
      case 'father': case 'mother': case 'parent': return UserCheck;
      default: return User;
    }
  };

  const getRelationshipStats = () => {
    const totalFamilyValue = family.reduce((sum, member) => {
      if (member.relationshipValue) {
        const value = parseFloat(member.relationshipValue.replace('₹', '').replace('L', '').replace('K', ''));
        return sum + (member.relationshipValue.includes('L') ? value : value / 100);
      }
      return sum;
    }, 0);

    const familyCustomers = family.filter(member => member.isCustomer).length;
    const totalOpportunities = family.reduce((sum, member) => sum + (member.opportunities?.length || 0), 0);

    return { totalFamilyValue, familyCustomers, totalOpportunities };
  };

  const stats = getRelationshipStats();

  return (
    <div className="space-y-6">
      {/* Family Relationship Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users size={20} className="mr-2" />
              Enhanced Family Tree & Relationship Mapping
            </div>
            <Button size="sm" variant="outline" onClick={onAddFamilyMember}>
              <Plus size={16} className="mr-2" />
              Add Member
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Family Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-teal-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700">₹{stats.totalFamilyValue.toFixed(1)}L</div>
              <div className="text-sm text-teal-600">Total Family Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700">{stats.familyCustomers}/{family.length}</div>
              <div className="text-sm text-teal-600">Family Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700">{stats.totalOpportunities}</div>
              <div className="text-sm text-teal-600">Cross-sell Opportunities</div>
            </div>
          </div>

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
                      {member.email && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            toast({
                              title: "Email Drafted",
                              description: `Email template prepared for ${member.name}`,
                            });
                          }}
                        >
                          <Mail size={12} className="mr-1" />
                          Email
                        </Button>
                      )}
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

export default EnhancedFamilyTree;
