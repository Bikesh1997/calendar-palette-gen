
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, X, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'warning' | 'info';
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionHandler?: () => void;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'KRA Achievement Alert',
      message: 'You are 85% towards your monthly target. 3 more conversions needed for ₹25K bonus!',
      type: 'urgent',
      timestamp: '5 minutes ago',
      isRead: false,
      actionLabel: 'View Pipeline',
      actionHandler: () => console.log('Opening pipeline')
    },
    {
      id: '2',
      title: 'Follow-up Reminder',
      message: '4 high-priority leads need follow-up today. Total potential value: ₹95L',
      type: 'warning',
      timestamp: '15 minutes ago',
      isRead: false,
      actionLabel: 'View Leads',
      actionHandler: () => console.log('Opening leads')
    },
    {
      id: '3',
      title: 'Customer Birthday',
      message: 'Mrs. Heena Thakkar (₹2.5Cr portfolio) has birthday today. Send wishes for relationship building.',
      type: 'info',
      timestamp: '1 hour ago',
      isRead: true,
      actionLabel: 'Send Message',
      actionHandler: () => console.log('Opening messages')
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Dismissed",
      description: "Alert has been removed from your list.",
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <TrendingUp size={16} className="text-red-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'info': return <Bell size={16} className="text-blue-600" />;
      default: return <Bell size={16} />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 border-red-200';
      case 'warning': return 'bg-yellow-100 border-yellow-200';
      case 'info': return 'bg-blue-100 border-blue-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 relative">
          <Bell size={16} className="mr-2" />
          Alerts
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell size={20} className="mr-2" />
            Alerts & Notifications ({unreadCount} unread)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p>No alerts at the moment</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`${getAlertColor(alert.type)} ${!alert.isRead ? 'border-l-4' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {alert.timestamp}
                          </span>
                          {alert.actionLabel && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                alert.actionHandler?.();
                                markAsRead(alert.id);
                                toast({
                                  title: "Action Triggered",
                                  description: `Opening ${alert.actionLabel.toLowerCase()}...`,
                                });
                              }}
                            >
                              {alert.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!alert.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(alert.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dismissAlert(alert.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertSystem;
