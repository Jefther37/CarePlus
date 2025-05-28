
export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'bg-medical-green-light/20 text-medical-green border-medical-green/20';
    case 'pending': return 'bg-medical-accent/20 text-medical-blue border-medical-accent/20';
    case 'missed': return 'bg-destructive/20 text-destructive border-destructive/20';
    case 'scheduled': return 'bg-medical-blue-light/20 text-medical-blue border-medical-blue/20';
    default: return 'bg-medical-gray-light/20 text-medical-gray border-medical-gray/20';
  }
};

export const formatDateTime = (dateStr: string, timeStr: string) => {
  const date = new Date(dateStr);
  const time = timeStr ? timeStr.slice(0, 5) : '00:00'; // Format time as HH:MM
  return {
    date: date.toLocaleDateString(),
    time: time
  };
};
