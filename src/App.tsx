
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "./components/Layout";
import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import SalesFunnel from "./pages/SalesFunnel";
import Customer360 from "./pages/Customer360";
import LeadManagement from "./pages/leads/LeadManagement";
import Tasks from "./pages/Tasks";
import TaskManagement from "./pages/tasks/TaskManagement";
import PlanMyDay from "./pages/PlanMyDay";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import CustomerAnalytics from "./pages/CustomerAnalytics";
import PortfolioManagement from "./pages/PortfolioManagement";
import KPAManagement from "./pages/KPAManagement";
import TeamPerformance from "./pages/TeamPerformance";
import TerritoryManagement from "./pages/TerritoryManagement";
import Reports from "./pages/Reports";
import RuleManagement from "./pages/RuleManagement";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/admin/UserManagement";
import CrossSellingRules from "./pages/admin/CrossSellingRules";
import OfferManagementRule from "./pages/admin/OfferManagementRule";
import EventManagement from "./pages/admin/EventManagement";
import KRAManagement from "./pages/admin/KRAManagement";
import GeoHierarchyManagement from "./pages/admin/GeoHierarchyManagement";
import Index from "./pages/Index";
import { useAuth } from "@/contexts/AuthContext";
import FinancialEducation from "./pages/FinancialEducationPlatform";
import { useRoleFeatures } from "@/hooks/useRoleFeatures";
import KRAGamification from "./components/gamification/KRAGamification";
import GamifiedKRADashboard from "./components/gamification/GamifiedKRADashboard";
import FieldExecutiveGameDashboard from "./components/gamification/FieldExecutiveGameDashboard";
import GameifiedKRAProgress from "./components/gamification/GameifiedKRAProgress";
import GameifiedTaskList from "./components/gamification/GameifiedTaskList";
import Tools from "./components/tools";
import { VersionCheck } from "@/components/ui/version-check";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const basename = import.meta.env.VITE_BASE_PATH || '/';

const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.role === 'supervisor') {
    return <SupervisorDashboard />;
  }
  
  return <Dashboard />;
};

const isCordova = typeof window !== 'undefined' && window.location.href.startsWith('file://');
const Router = isCordova ? HashRouter : BrowserRouter;

// Role-based route wrapper
const RoleBasedRoute = ({ children, featureId }: { children: React.ReactNode; featureId: string }) => {
  const { canAccessFeature } = useRoleFeatures();
  
  if (!canAccessFeature(featureId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this feature.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* <VersionCheck /> */}
          <HashRouter >
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardRouter />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Field Executive Only Features */}
              <Route path="/funnel" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="sales_funnel">
                      <SalesFunnel />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/leads" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="my_leads">
                      <LeadManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="my_tasks">
                      <Tasks />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/task-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="my_tasks">
                      <TaskManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="customer_360">
                      <Customer360 />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/plan-my-day" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="plan_my_day">
                      <PlanMyDay />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Supervisor Only Features */}
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="portfolio_management">
                      <PortfolioManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/kpa-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="kpa_management">
                      <KPAManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/team-performance" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="team_performance">
                      <TeamPerformance />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/territory-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="territory_management">
                      <TerritoryManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="reports">
                      <Reports />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/rule-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="rule_management">
                      <RuleManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin Only Features */}
              <Route path="/user-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="user_management">
                      <UserManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/cross-selling-rules" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="cross_selling_rules">
                      <CrossSellingRules />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/offer-management-rule" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="offer_management_rule">
                      <OfferManagementRule />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/event-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="event_management">
                      <EventManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/kra-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="kra_management">
                      <KRAManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/geo-hierarchy-management" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="geo_hierarchy_management">
                      <GeoHierarchyManagement />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />

                {/* Financial Education Platform */}
                <Route path="/financial-education" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="financial_education">
                      <FinancialEducation />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              
               {/* KRA Gamification */}
               <Route path="/gamification" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="gamification">
                      <KRAGamification />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              
               {/* Gamified KRA Dashboard */}
               <Route path="/gamified-kra" element={
                <ProtectedRoute>
                  <Layout>
                    <RoleBasedRoute featureId="gamification">
                      <GamifiedKRADashboard />
                    </RoleBasedRoute>
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Gamified Field Executive Routes */}
              <Route path="/field-game-dashboard" element={
                <ProtectedRoute requiredRole="sales_executive">
                  <Layout>
                    <FieldExecutiveGameDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/field-kra-game" element={
                <ProtectedRoute requiredRole="sales_executive">
                  <Layout>
                    <GameifiedKRAProgress />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/field-task-game" element={
                <ProtectedRoute requiredRole="sales_executive">
                  <Layout>
                    <GameifiedTaskList />
                  </Layout>
                </ProtectedRoute>
              } />

<Route path="/tools" element={
                <ProtectedRoute requiredRole="sales_executive">
                  <Layout>
                    <Tools />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
