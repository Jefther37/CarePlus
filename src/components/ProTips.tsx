
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProTips = () => {
  return (
    <Card className="shadow-lg border-0 medical-gradient-subtle animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg medical-text-primary">💡 Pro Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm medical-text-secondary pt-0">
        <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
          <span className="mt-1">•</span>
          <span>Send reminders 24-48 hours before appointments for best results</span>
        </p>
        <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
          <span className="mt-1">•</span>
          <span>Use personalized messages to improve patient engagement</span>
        </p>
        <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
          <span className="mt-1">•</span>
          <span>Follow up within 2 hours if a patient misses their appointment</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default ProTips;
