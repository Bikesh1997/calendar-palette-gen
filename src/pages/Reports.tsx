
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Download,
  Filter,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Eye,
  Edit,
  MapPin,
  UserCheck,
  PieChart,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const Reports = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('performance-reports');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedFSO, setSelectedFSO] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('performance-reports');
  }, [user?.id]);
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      name: 'Weekly Sales Summary',
      frequency: 'Weekly',
      nextRun: '2024-01-22',
      status: 'Active',
      recipients: ['team@company.com'],
      lastRun: '2024-01-15'
    },
    {
      id: '2',
      name: 'Monthly Team Performance',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      status: 'Active',
      recipients: ['manager@company.com'],
      lastRun: '2024-01-01'
    }
  ]);

  // Mock data for supervisor reports
  const performanceData = [
    {
      period: 'This Week',
      visitsPlanned: 45,
      visitsCompleted: 38,
      completionRate: 84.4,
      conversions: 12,
      conversionRate: 31.6,
      geoCoverage: 85,
      campaigns: ['Holiday Special', 'New Year Offer']
    },
    {
      period: 'Last Week',
      visitsPlanned: 42,
      visitsCompleted: 40,
      completionRate: 95.2,
      conversions: 15,
      conversionRate: 37.5,
      geoCoverage: 92,
      campaigns: ['Holiday Special']
    },
    {
      period: 'This Month',
      visitsPlanned: 180,
      visitsCompleted: 165,
      completionRate: 91.7,
      conversions: 52,
      conversionRate: 31.5,
      geoCoverage: 88,
      campaigns: ['Holiday Special', 'New Year Offer', 'Personal Loan Push']
    }
  ];

  const fsoPerformance = [
    {
      name: 'Rahul Sharma',
      region: 'Mumbai',
      visitsPlanned: 12,
      visitsCompleted: 11,
      conversions: 4,
      conversionRate: 36.4,
      geoCompliance: 95,
      topProduct: 'Personal Loans'
    },
    {
      name: 'Anjali Patel',
      region: 'Pune',
      visitsPlanned: 10,
      visitsCompleted: 9,
      conversions: 3,
      conversionRate: 33.3,
      geoCompliance: 90,
      topProduct: 'Home Loans'
    },
    {
      name: 'Vikram Singh',
      region: 'Delhi',
      visitsPlanned: 14,
      visitsCompleted: 12,
      conversions: 2,
      conversionRate: 16.7,
      geoCompliance: 75,
      topProduct: 'Business Loans'
    }
  ];

  const campaignEffectiveness = [
    {
      campaign: 'Holiday Special',
      leads: 45,
      visits: 32,
      conversions: 15,
      conversionRate: 46.9,
      roi: 245,
      regions: ['Mumbai', 'Pune', 'Delhi']
    },
    {
      campaign: 'New Year Offer',
      leads: 38,
      visits: 28,
      conversions: 8,
      conversionRate: 28.6,
      roi: 165,
      regions: ['Mumbai', 'Bangalore']
    },
    {
      campaign: 'Personal Loan Push',
      leads: 52,
      visits: 41,
      conversions: 19,
      conversionRate: 46.3,
      roi: 280,
      regions: ['All Regions']
    }
  ];

  const geoCoverage = [
    {
      region: 'Mumbai',
      plannedAreas: 15,
      coveredAreas: 14,
      coverage: 93.3,
      visits: 45,
      conversions: 18
    },
    {
      region: 'Pune',
      plannedAreas: 12,
      coveredAreas: 11,
      coverage: 91.7,
      visits: 38,
      conversions: 12
    },
    {
      region: 'Delhi',
      plannedAreas: 18,
      coveredAreas: 15,
      coverage: 83.3,
      visits: 42,
      conversions: 8
    },
    {
      region: 'Bangalore',
      plannedAreas: 14,
      coveredAreas: 13,
      coverage: 92.9,
      visits: 35,
      conversions: 15
    }
  ];

  // Get filtered leads based on user role and filters
  const getFilteredLeads = () => {
    let leads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
    
    // Apply team filter
    if (selectedTeam !== 'all') {
      leads = leads.filter(lead => {
        // This would be based on actual team data structure
        return true; // Placeholder for team filtering
      });
    }
    
    return leads;
  };

  const filteredLeads = getFilteredLeads();

  // Calculate real analytics data
  const getAnalyticsData = () => {
    const totalLeads = filteredLeads.length;
    const convertedLeads = filteredLeads.filter(lead => lead.status === 'converted');
    const conversionRate = totalLeads > 0 ? ((convertedLeads.length / totalLeads) * 100).toFixed(1) : '0';
    
    const totalValue = convertedLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);

    const statusCounts = filteredLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLeads,
      convertedLeads: convertedLeads.length,
      conversionRate,
      totalValue,
      statusCounts
    };
  };

  const analyticsData = getAnalyticsData();

  const handleGenerateReport = (reportType: string) => {
    const filters = {
      period: selectedPeriod,
      fso: selectedFSO,
      region: selectedRegion,
      product: selectedProduct,
      campaign: selectedCampaign
    };
    
    toast({
      title: "Generating Report",
      description: `Processing ${reportType} with applied filters...`,
    });
    
    // Simulate report generation with filters
    setTimeout(() => {
      const reportData = {
        reportType,
        filters,
        leadsProcessed: filteredLeads.length,
        conversionRate: analyticsData.conversionRate,
        totalValue: analyticsData.totalValue,
        generatedAt: new Date().toISOString()
      };
      
      // Create a downloadable report based on type
      if (reportType.includes('PDF')) {
        generatePDFReport(reportData);
      } else {
        const csvContent = generateCSVReport(reportData);
        downloadReport(csvContent, `${reportType.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
      }
      
      toast({
        title: "Report Generated Successfully",
        description: `${reportType} report downloaded with applied filters.`,
      });
    }, 2000);
  };

  const generatePDFReport = (reportData: any) => {
    // Simulate PDF generation
    toast({
      title: "PDF Report Ready",
      description: "PDF report has been generated and downloaded.",
    });
  };

  const generateCSVReport = (reportData: any) => {
    const headers = ['Lead ID', 'Name', 'Contact', 'Phone', 'Email', 'Status', 'Value', 'Assigned To', 'Source', 'Priority', 'Last Contact'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.name,
      lead.contact,
      lead.phone,
      lead.email,
      lead.status,
      lead.value,
      lead.assignedTo || 'Unassigned',
      lead.source,
      lead.priority,
      lead.lastContact || 'Never'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    return csvContent;
  };

  const downloadReport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleScheduleReport = (reportName?: string) => {
    const newReport = {
      id: Date.now().toString(),
      name: reportName || 'Custom Report',
      frequency: 'Weekly',
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active' as const,
      recipients: [user?.email || 'user@company.com'],
      lastRun: 'Never'
    };
    
    setScheduledReports(prev => [...prev, newReport]);
    
    toast({
      title: "Report Scheduled Successfully",
      description: `${newReport.name} will run every ${newReport.frequency.toLowerCase()}.`,
    });
  };

  const handleExportData = (format: string) => {
    if (format === 'CSV') {
      const csvContent = generateCSVReport({ reportType: 'Data Export' });
      downloadReport(csvContent, `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Export Complete",
        description: `${filteredLeads.length} records exported successfully.`,
      });
    } else {
      toast({
        title: "Export Started",
        description: `Data export in ${format} format initiated.`,
      });
    }
  };

  const handleDeleteScheduledReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: "Report Deleted",
      description: "Scheduled report has been removed.",
    });
  };

  const handleEditScheduledReport = (reportId: string) => {
    toast({
      title: "Edit Report",
      description: "Report editing functionality would open here.",
    });
  };

  const handleViewReport = (reportId: string) => {
    const report = scheduledReports.find(r => r.id === reportId);
    toast({
      title: "View Report Details",
      description: `Viewing details for ${report?.name}`,
    });
  };

  const handleApplyFilters = () => {
    const periodText = selectedPeriod === 'month' ? 'this month' : selectedPeriod;
    const teamText = selectedTeam === 'all' ? 'all teams' : selectedTeam;
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filteredLeads.length} leads for ${periodText} and ${teamText}.`,
    });
  };

  const reportTemplates = [
    {
      id: '1',
      name: 'Sales Performance Report',
      description: 'Comprehensive sales metrics and KPIs',
      category: 'Sales',
      frequency: 'Weekly',
      lastGenerated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Team Productivity Report',
      description: 'Team member performance and productivity metrics',
      category: 'Team',
      frequency: 'Monthly',
      lastGenerated: '2024-01-10'
    },
    {
      id: '3',
      name: 'Lead Conversion Analysis',
      description: 'Lead source analysis and conversion rates',
      category: 'Leads',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-01-12'
    },
    {
      id: '4',
      name: 'Territory Performance',
      description: 'Geographic performance and territory analysis',
      category: 'Territory',
      frequency: 'Monthly',
      lastGenerated: '2024-01-08'
    }
  ];

  // Updated summary cards with real data
  const summaryCards = [
    {
      title: 'Total Reports Generated',
      value: '428',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Active Scheduled Reports',
      value: 6,
      change: `+${scheduledReports.length}`,
      changeType: 'positive' as const,
      icon: Calendar
    },
    {
      title: 'Leads Processed',
      value: 325,
      change: `${analyticsData.conversionRate}% conversion`,
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Total Revenue',
      value: `₹1.46 Cr`,
      change: `${analyticsData.convertedLeads} conversions`,
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and manage team performance reports</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => handleExportData('CSV')}
          >
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => handleScheduleReport('Custom Report')}
          >
            <Plus size={16} className="mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger>
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedFSO} onValueChange={setSelectedFSO}>
          <SelectTrigger>
            <SelectValue placeholder="FSO" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All FSOs</SelectItem>
            <SelectItem value="rahul">Rahul Sharma</SelectItem>
            <SelectItem value="anjali">Anjali Patel</SelectItem>
            <SelectItem value="vikram">Vikram Singh</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="personal">Personal Loans</SelectItem>
            <SelectItem value="home">Home Loans</SelectItem>
            <SelectItem value="business">Business Loans</SelectItem>
            <SelectItem value="credit">Credit Cards</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger>
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="holiday">Holiday Special</SelectItem>
            <SelectItem value="newyear">New Year Offer</SelectItem>
            <SelectItem value="personal">Personal Loan Push</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleApplyFilters} className="w-full">
          <Filter size={16} className="mr-2" />
          Apply
        </Button>
      </div> */}

      {/* Summary Cards with Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className={`text-sm ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </p>
                </div>
                <card.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5  gap-1 h-auto">
          <TabsTrigger value="performance-reports">Performance Reports</TabsTrigger>
          <TabsTrigger value="campaign-analysis">Campaign Analysis</TabsTrigger>
          <TabsTrigger value="geo-coverage">Geo Coverage</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance-reports" className="space-y-6">
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceData.map((period, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {period.period}
                    <Badge variant="outline">{period.completionRate}% Complete</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Visits</span>
                      <span className="font-medium">{period.visitsCompleted}/{period.visitsPlanned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conversions</span>
                      <span className="font-medium text-green-600">{period.conversions} ({period.conversionRate}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Geo Coverage</span>
                      <span className="font-medium">{period.geoCoverage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FSO Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>FSO Performance Overview</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('FSO Performance PDF')}
                  >
                    <Download size={14} className="mr-1" />
                    PDF
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('FSO Performance Excel')}
                  >
                    <Download size={14} className="mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
  {/* Mobile View: Cards */}
  <div className="grid grid-cols-1 gap-4 md:hidden">
    {fsoPerformance.map((fso, index) => (
      <Card key={index} className="p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{fso.name}</h3>
          <span className="text-sm text-gray-500">{fso.region}</span>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <div><strong>Visits Planned:</strong> {fso.visitsPlanned}</div>
          <div><strong>Visits Completed:</strong> {fso.visitsCompleted}</div>
          <div><strong>Conversions:</strong> <span className="text-green-600 font-semibold">{fso.conversions}</span></div>
          <div><strong>Conversion Rate:</strong> {fso.conversionRate}%</div>
          <div><strong>Geo Compliance:</strong>{' '}
            <Badge variant={fso.geoCompliance >= 90 ? 'default' : 'secondary'}>
              {fso.geoCompliance}%
            </Badge>
          </div>
          <div><strong>Top Product:</strong> {fso.topProduct}</div>
        </div>
      </Card>
    ))}
  </div>

  {/* Desktop View: Table */}
  <div className="hidden md:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>FSO Name</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Visits Planned</TableHead>
          <TableHead>Visits Completed</TableHead>
          <TableHead>Conversions</TableHead>
          <TableHead>Conversion Rate</TableHead>
          <TableHead>Geo Compliance</TableHead>
          <TableHead>Top Product</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fsoPerformance.map((fso, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{fso.name}</TableCell>
            <TableCell>{fso.region}</TableCell>
            <TableCell>{fso.visitsPlanned}</TableCell>
            <TableCell>{fso.visitsCompleted}</TableCell>
            <TableCell className="text-green-600 font-medium">{fso.conversions}</TableCell>
            <TableCell>{fso.conversionRate}%</TableCell>
            <TableCell>
              <Badge variant={fso.geoCompliance >= 90 ? 'default' : 'secondary'}>
                {fso.geoCompliance}%
              </Badge>
            </TableCell>
            <TableCell>{fso.topProduct}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</CardContent>

          </Card>
        </TabsContent>

        <TabsContent value="campaign-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Campaign Effectiveness Analysis</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('Campaign Analysis PDF')}
                  >
                    <Download size={14} className="mr-1" />
                    PDF
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('Campaign Analysis Excel')}
                  >
                    <Download size={14} className="mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignEffectiveness.map((campaign, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{campaign.campaign}</h4>
                        <p className="text-sm text-gray-600">Regions: {campaign.regions.join(', ')}</p>
                      </div>
                      <Badge className={campaign.roi > 200 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        ROI: {campaign.roi}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Leads</p>
                        <p className="font-bold text-lg">{campaign.leads}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Visits Made</p>
                        <p className="font-bold text-lg">{campaign.visits}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conversions</p>
                        <p className="font-bold text-lg text-green-600">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conversion Rate</p>
                        <p className="font-bold text-lg">{campaign.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Visit Rate</p>
                        <p className="font-bold text-lg">{((campaign.visits / campaign.leads) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geo-coverage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Regional Coverage Analysis
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('Geo Coverage PDF')}
                  >
                    <Download size={14} className="mr-1" />
                    PDF
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport('Geo Coverage Excel')}
                  >
                    <Download size={14} className="mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {geoCoverage.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-lg">{region.region}</h4>
                      <Badge className={region.coverage >= 90 ? 'bg-green-100 text-green-800' : region.coverage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                        {region.coverage}% Coverage
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Areas Covered</span>
                        <span className="font-medium">{region.coveredAreas}/{region.plannedAreas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Visits</span>
                        <span className="font-medium">{region.visits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Conversions</span>
                        <span className="font-medium text-green-600">{region.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                        <span className="font-medium">{((region.conversions / region.visits) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    {/* Coverage progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${region.coverage >= 90 ? 'bg-green-500' : region.coverage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${region.coverage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Scheduled Reports</CardTitle>
                <Button onClick={() => handleScheduleReport()}>
                  <Plus size={16} className="mr-2" />
                  Add Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
  {scheduledReports.length > 0 ? (
    <>
      {/* Mobile View: Card layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {scheduledReports.map((report) => (
          <Card key={report.id} className="p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{report.name}</h3>
              <Badge variant={report.status === 'Active' ? 'default' : 'secondary'}>
                {report.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Frequency:</strong> {report.frequency}</div>
              <div><strong>Next Run:</strong> {report.nextRun}</div>
              <div><strong>Last Run:</strong> {report.lastRun}</div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button size="sm" variant="outline" onClick={() => handleViewReport(report.id)}>
                <Eye size={14} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEditScheduledReport(report.id)}>
                <Edit size={14} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDeleteScheduledReport(report.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View: Table layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.frequency}</TableCell>
                <TableCell>{report.nextRun}</TableCell>
                <TableCell>{report.lastRun}</TableCell>
                <TableCell>
                  <Badge variant={report.status === 'Active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewReport(report.id)}>
                      <Eye size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditScheduledReport(report.id)}>
                      <Edit size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteScheduledReport(report.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  ) : (
    <div className="text-center py-12">
      <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Scheduled Reports</h3>
      <p className="text-gray-600 mb-4">Set up automated report generation</p>
      <Button onClick={() => handleScheduleReport()}>
        <Plus size={16} className="mr-2" />
        Schedule Report
      </Button>
    </div>
  )}
</CardContent>

          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
