
import { useState, useMemo } from 'react';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
}

export const useLeadFilters = (leads: Lead[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    });
  }, [leads, searchTerm, statusFilter, priorityFilter, sourceFilter]);

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || sourceFilter !== 'all';

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSourceFilter('all');
  };

  const uniqueSources = useMemo(() => [...new Set(leads.map(lead => lead.source))], [leads]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sourceFilter,
    setSourceFilter,
    showAdvancedFilters,
    setShowAdvancedFilters,
    filteredLeads,
    hasActiveFilters,
    clearAllFilters,
    uniqueSources,
  };
};
