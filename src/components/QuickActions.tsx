
import NotificationChannels from './NotificationChannels';
import PerformanceMetrics from './PerformanceMetrics';
import ProTips from './ProTips';

const QuickActions = () => {
  return (
    <div className="space-y-4 sm:space-y-6 order-1 xl:order-2">
      <NotificationChannels />
      <PerformanceMetrics />
      <ProTips />
    </div>
  );
};

export default QuickActions;
