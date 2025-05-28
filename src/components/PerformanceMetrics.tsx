
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PerformanceMetrics = () => {
  return (
    <Card className="shadow-lg border-0 medical-card-bg animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-medical-accent" />
          This Month's Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        <div className="group">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            <span>Appointment Completion</span>
            <span className="font-semibold medical-text-primary">85%</span>
          </div>
          <Progress value={85} className="h-2 transition-all duration-500 hover:h-3" />
        </div>
        <div className="group">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            <span>Response Rate</span>
            <span className="font-semibold medical-text-primary">92%</span>
          </div>
          <Progress value={92} className="h-2 transition-all duration-500 hover:h-3" />
        </div>
        <div className="group">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            <span>Follow-up Success</span>
            <span className="font-semibold medical-text-primary">78%</span>
          </div>
          <Progress value={78} className="h-2 transition-all duration-500 hover:h-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
