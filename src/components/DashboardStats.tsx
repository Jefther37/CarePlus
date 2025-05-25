
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardStats = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "+3 from yesterday",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Patients",
      value: "248",
      change: "+12 this week",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Reminders",
      value: "8",
      change: "Next in 2 hours",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Completion Rate",
      value: "85%",
      change: "+5% from last month",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover-scale"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
