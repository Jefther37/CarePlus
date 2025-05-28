
import { MessageSquare, Phone, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NotificationChannels = () => {
  return (
    <Card className="shadow-lg border-0 medical-card-bg animate-slide-in-right">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-medical-blue" />
          Notification Channels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        <div className="flex items-center justify-between group hover:bg-medical-blue-light/5 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-medical-green" />
            <span className="text-xs sm:text-sm">SMS Messages</span>
          </div>
          <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20 text-xs animate-scale-in">Active</Badge>
        </div>
        <div className="flex items-center justify-between group hover:bg-medical-green-light/5 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-medical-green" />
            <span className="text-xs sm:text-sm">WhatsApp</span>
          </div>
          <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20 text-xs animate-scale-in">Active</Badge>
        </div>
        <div className="flex items-center justify-between group hover:bg-medical-accent/5 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-medical-blue" />
            <span className="text-xs sm:text-sm">Email</span>
          </div>
          <Badge variant="secondary" className="bg-medical-blue-light/20 text-medical-blue border-medical-blue/20 text-xs animate-scale-in">Active</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationChannels;
