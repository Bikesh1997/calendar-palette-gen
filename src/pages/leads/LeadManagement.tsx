
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadsPagination from '@/components/leads/LeadsPagination';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import KRAPerformanceSection from '@/components/leads/KRAPerformanceSection';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const LeadManagement = () => {
  const [leads, setLeads] = useState(allLeads);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  const { user } = useAuth();
  
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredLeads,
    clearAllFilters
  } = useLeadFilters(leads);

  // Calculate pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + leadsPerPage);

  const handleEditLead = (leadId: string, updatedData: any) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updatedData } : lead
    ));
  };

  const filters = {
    status: statusFilter,
    source: 'all',
    priority: 'all',
    assignedTo: 'all',
    dateRange: 'all'
  };

  const handleFiltersChange = (newFilters: any) => {
    if (newFilters.status !== statusFilter) {
      setStatusFilter(newFilters.status);
    }
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your leads efficiently</p>
        </div>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leads">My Leads</TabsTrigger>
          <TabsTrigger value="performance">KRA & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          <LeadStatsCards leads={filteredLeads} userRole={user?.role || 'agent'} />
          
          <LeadFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
          
          <LeadsTable 
            leads={paginatedLeads}
            userRole={user?.role || 'agent'}
            onEditLead={handleEditLead}
          />

          <LeadsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            leadsPerPage={leadsPerPage}
            totalLeads={filteredLeads.length}
            onPageChange={handlePageChange}
          />
        </TabsContent>

        <TabsContent value="performance">
          <KRAPerformanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadManagement;
