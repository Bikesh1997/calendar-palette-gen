import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleFeatures } from '@/hooks/useRoleFeatures';
import { 
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  UserPlus,
  ClipboardList,
  Users,
  MapPin,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  PieChart,
  Shield,
  Settings,
  HelpCircle,
  MessageSquare,
  Tag,
  Calendar,
  Trophy,
  GraduationCap,
  Star,
  Calculator,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SupportModal from '@/components/support/SupportModal';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedFSO, setSelectedFSO] = useState('all-fsos');
  const [selectedRegion, setSelectedRegion] = useState('all-regions');
  const [selectedProduct, setSelectedProduct] = useState('all-products');
  const [selectedCampaign, setSelectedCampaign] = useState('all-campaigns');
  const location = useLocation();
  const { user, logout, switchRole } = useAuth();
  const { getNavigationItems } = useRoleFeatures();
  const { toast } = useToast();

  // Icon mapping
  const iconMap = {
    Home: Home,
    UserPlus: UserPlus,
    ClipboardList: ClipboardList,
    Users: Users,
    MapPin: MapPin,
    BarChart3: BarChart3,
    TrendingUp: TrendingUp,
    Activity: Activity,
    Target: Target,
    PieChart: PieChart,
    Shield: Shield,
    Settings: Settings,
    Tag: Tag,
    Calendar: Calendar,
    Trophy :Trophy,
    GraduationCap:GraduationCap,
    Calculator:Calculator,
  };

  const navigationItems = getNavigationItems().map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || Home
  }));

  // Reports & Analytics filter options
  const periods = [
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'this-year', label: 'This Year' }
  ];

  const fsos = [
    { value: 'all-fsos', label: 'All FSOs' },
    { value: 'fso-north', label: 'FSO North' },
    { value: 'fso-south', label: 'FSO South' },
    { value: 'fso-east', label: 'FSO East' },
    { value: 'fso-west', label: 'FSO West' }
  ];

  const regions = [
    { value: 'all-regions', label: 'All Regions' },
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
    { value: 'central', label: 'Central' }
  ];

  const products = [
    { value: 'all-products', label: 'All Products' },
    { value: 'savings-account', label: 'Savings Account' },
    { value: 'current-account', label: 'Current Account' },
    { value: 'deposits', label: 'Deposits' },
    { value: 'home-loans', label: 'Home Loans' },
    { value: 'two-wheeler-loan', label: 'Two Wheeler Loan' },
    { value: 'msme-loan', label: 'MSME Loan' },
    { value: 'gold-loan', label: 'Gold Loan' },
    { value: 'insurance', label: 'Insurance' }
  ];

  const campaigns = [
    { value: 'all-campaigns', label: 'All Campaigns' },
    { value: 'savings-drive', label: 'Savings Drive' },
    { value: 'loan-fest', label: 'Loan Fest' },
    { value: 'digital-banking', label: 'Digital Banking' },
    { value: 'insurance-boost', label: 'Insurance Boost' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'sales_executive': return 'Field Executive';
      case 'supervisor': return 'Supervisor';
      case 'inbound_agent': return 'Inbound sales';
      case 'relationship_manager': return 'Relationship Manager';
      case 'admin': return 'System Administrator';
      default: return role;
    }
  };

  const getDepartmentDisplay = (dept?: string) => {
    switch (dept) {
      case 'outbound': return 'Outbound';
      case 'inbound': return 'Inbound';
      case 'field': return 'Field';
      case 'branch': return 'Branch';
      default: return '';
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      period: selectedPeriod,
      fso: selectedFSO,
      region: selectedRegion,
      product: selectedProduct,
      campaign: selectedCampaign
    };
    
    console.log('Applying filters:', filters);
    
    toast({
      title: "Filters Applied",
      description: `Reports updated with selected filters: ${periods.find(p => p.value === selectedPeriod)?.label}, ${fsos.find(f => f.value === selectedFSO)?.label}, ${regions.find(r => r.value === selectedRegion)?.label}, ${products.find(p => p.value === selectedProduct)?.label}, ${campaigns.find(c => c.value === selectedCampaign)?.label}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Full Width */}
      <nav className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="w-full px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-1 sm:mr-2 p-1 sm:p-2"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
              <div className="flex items-start">
                <img 
src={`${process.env.NODE_ENV === 'production' ? '/infinity-fincorp-solutions/' : ''}assets/logo.png`}

alt="logo" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4">
              <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Branch: {user?.branch}
              </div>
              
              {/* Role Badge */}
              <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs hidden sm:inline-flex">
                {getRoleDisplay(user?.role || '')}
                {/* {user?.department && ` - ${getDepartmentDisplay(user.department)}`} */}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                        {user?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm">{user?.name}</span>
                    <ChevronDown size={14} className="sm:size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white z-50">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-500 sm:hidden">Branch: {user?.branch}</p>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs mt-1 sm:hidden">
                      {getRoleDisplay(user?.role || '')}
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSupportModalOpen(true)}>
                    <HelpCircle size={16} className="mr-2" />
                    Support & Helpdesk
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user?.role !== 'admin' && (
                    <>
                      <DropdownMenuItem 
                        onClick={() => switchRole(user?.role === 'sales_executive' ? 'supervisor' : 'sales_executive')}
                      >
                        Switch to {user?.role === 'sales_executive' ? 'Supervisor' : 'Field Executive'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Supervisor Portal Reports & Analytics Filters Bar */}
      {user?.role === 'supervisor' && (
       <div className="bg-white border-b border-gray-200 px-2 sm:px-4 lg:px-8 overflow-x-auto">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 gap-2 sm:gap-3 min-w-fit">
         
         <div className="text-xs sm:text-sm font-medium text-gray-700">
           {/* Optional Label or Title */}
         </div>
     
         <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-w-fit">
           <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
             <SelectTrigger className="w-[90px] sm:w-[120px] h-8 sm:h-10 text-xs sm:text-sm">
               <SelectValue placeholder="Period" />
             </SelectTrigger>
             <SelectContent className="bg-white z-50">
               {periods.map((period) => (
                 <SelectItem key={period.value} value={period.value}>
                   {period.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
     
           <Select value={selectedFSO} onValueChange={setSelectedFSO}>
             <SelectTrigger className="w-[80px] sm:w-[100px] h-8 sm:h-10 text-xs sm:text-sm">
               <SelectValue placeholder="FSO" />
             </SelectTrigger>
             <SelectContent className="bg-white z-50">
               {fsos.map((fso) => (
                 <SelectItem key={fso.value} value={fso.value}>
                   {fso.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
     
           <Select value={selectedRegion} onValueChange={setSelectedRegion}>
             <SelectTrigger className="w-[90px] sm:w-[120px] h-8 sm:h-10 text-xs sm:text-sm">
               <SelectValue placeholder="Region" />
             </SelectTrigger>
             <SelectContent className="bg-white z-50">
               {regions.map((region) => (
                 <SelectItem key={region.value} value={region.value}>
                   {region.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
     
           <Select value={selectedProduct} onValueChange={setSelectedProduct}>
             <SelectTrigger className="w-[100px] sm:w-[130px] h-8 sm:h-10 text-xs sm:text-sm">
               <SelectValue placeholder="Product" />
             </SelectTrigger>
             <SelectContent className="bg-white z-50">
               {products.map((product) => (
                 <SelectItem key={product.value} value={product.value}>
                   {product.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
     
           <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
             <SelectTrigger className="w-[100px] sm:w-[130px] h-8 sm:h-10 text-xs sm:text-sm">
               <SelectValue placeholder="Campaign" />
             </SelectTrigger>
             <SelectContent className="bg-white z-50">
               {campaigns.map((campaign) => (
                 <SelectItem key={campaign.value} value={campaign.value}>
                   {campaign.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
     
           <Button
             onClick={handleApplyFilters}
             className="bg-teal-600 hover:bg-teal-700 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
             size="sm"
           >
             Apply
           </Button>
         </div>
       </div>
     </div>
     
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="h-full overflow-y-auto pt-4 sm:pt-6">
            <div className="px-3 mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                 {user?.role === 'admin' ? 'Admin Portal' :
                 user?.role === 'supervisor' ? 'Supervisor Portal' : 
                 user?.role === 'inbound_agent' ? 'Inbound Agent Portal' :
                 user?.role === 'relationship_manager' ? 'Relationship Manager Portal' :
                 'Field Portal'}
              </div>
            </div>
            <nav className="px-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-l-md transition-colors`}
                  >
                    <Icon size={18} className="mr-3 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
              
             
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-w-0">
          <main className="p-2 sm:p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Support Modal */}
      <SupportModal 
        isOpen={supportModalOpen} 
        onClose={() => setSupportModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
