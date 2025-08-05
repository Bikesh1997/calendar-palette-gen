import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Phone, Mail, TrendingUp, Eye, Star } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import CustomerDetailsModal from './CustomerDetailsModal';

interface Customer {
  key: string;
  name: string;
  id: string;
  segment: string;
  relationshipValue: string;
  totalRelationship: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  lastInteraction: string;
  riskScore: string;
  products?: any[];
  interactions?: any[];
  family?: any[];
  opportunities?: any[];
}

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomer: string | null;
  onCustomerSelect: (customerKey: string) => void;
}

const CustomerTable = ({ customers, selectedCustomer, onCustomerSelect }: CustomerTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCustomer, setModalCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customersPerPage = 5;

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewCustomer = (customer: Customer, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalCustomer(customer);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center flex-col sm:flex-row gap-2">
              <CardTitle>Customer Directory</CardTitle>
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Relationship Value</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Last Interaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCustomers.map((customer, index) => {
                    const globalIndex = (currentPage - 1) * customersPerPage + index;
                    const isFirst3 = globalIndex < 3;

                    return (
                      <TableRow
                        key={customer.key}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedCustomer === customer.key ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                        }`}
                        onClick={() => onCustomerSelect(customer.key)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                                {customer.name.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {customer.name}
                                {isFirst3 && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>New opportunity identified</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          <Tooltip>
                            <TooltipTrigger>
                              <span className={`${isFirst3 ? 'text-red-500' : ''}`}>
                                {customer.id}
                              </span>
                            </TooltipTrigger>
                            {isFirst3 && (
                              <TooltipContent>
                                <p>Pending KYC</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{customer.totalRelationship}</TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(customer.riskScore)}>{customer.riskScore}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{customer.lastInteraction}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline" onClick={(e) => handleViewCustomer(customer, e)}>
                              <Eye size={14} className="mr-1" /> View
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Phone size={14} />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Mail size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {currentCustomers.map((customer, index) => {
                const globalIndex = (currentPage - 1) * customersPerPage + index;
                const isFirst3 = globalIndex < 3;

                return (
                  <Card
                    key={customer.key}
                    className={`w-full cursor-pointer hover:shadow-md ${
                      selectedCustomer === customer.key ? 'border-teal-500 border-2' : ''
                    }`}
                    onClick={() => onCustomerSelect(customer.key)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {customer.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col truncate">
                        <div className="font-medium flex items-center gap-2 truncate">
                          {customer.name}
                          {isFirst3 && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>New opportunity identified</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className={`text-sm text-gray-500 truncate ${isFirst3 ? 'text-red-500' : ''}`}>
                              {customer.id}
                            </div>
                          </TooltipTrigger>
                          {isFirst3 && (
                            <TooltipContent>
                              <p>Pending KYC</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                        <div className="text-xs text-gray-400 truncate">{customer.email}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <div>
                        <span className="text-sm font-medium">Segment:</span>{' '}
                        <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Relationship:</span>{' '}
                        <span className="text-gray-700">{customer.totalRelationship}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Risk Score:</span>{' '}
                        <Badge className={getRiskColor(customer.riskScore)}>{customer.riskScore}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Last Interaction: {customer.lastInteraction}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={(e) => handleViewCustomer(customer, e)}>
                          <Eye size={14} className="mr-1" /> View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Phone size={14} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>

        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Customer Details Modal */}
        <CustomerDetailsModal
          customer={modalCustomer}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </TooltipProvider>
  );
};

export default CustomerTable;
