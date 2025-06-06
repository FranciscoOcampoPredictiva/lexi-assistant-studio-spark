
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Brain, Shield, Clock, Users, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileSearch,
      title: "Document Analysis",
      description: "Instantly analyze contracts, agreements, and legal documents with AI-powered insights and risk assessment."
    },
    {
      icon: Brain,
      title: "Legal Research",
      description: "Access comprehensive legal databases and get intelligent case law suggestions and precedent analysis."
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Stay compliant with automated monitoring of regulatory changes and requirement updates."
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Efficiently track billable hours with smart categorization and automated time entry suggestions."
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Manage client relationships with secure communication tools and case progress tracking."
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Gain insights into your practice with detailed analytics on cases, billing, and performance metrics."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Legal Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your legal practice and deliver exceptional results for your clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white group">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Practice?</h3>
          <p className="text-gray-600 mb-8">Join thousands of legal professionals who trust LexIA.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Your Free Trial
            </button>
            <button className="text-blue-600 hover:text-blue-800 px-8 py-3 font-semibold transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
