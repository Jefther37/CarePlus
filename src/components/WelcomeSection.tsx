
const WelcomeSection = () => {
  return (
    <div className="mb-6 sm:mb-8 text-center animate-fade-in">
      <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-4">
        Welcome to the Future of 
        <span className="medical-text-primary block sm:inline"> Patient Care</span>
      </h2>
      <p className="text-sm sm:text-lg medical-text-secondary max-w-2xl mx-auto px-2">
        Never miss a follow-up again. Our AI-powered reminder system ensures your patients stay connected 
        with automated SMS, WhatsApp, and email notifications.
      </p>
    </div>
  );
};

export default WelcomeSection;
