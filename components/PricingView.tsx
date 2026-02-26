
import React from 'react';
import { Check, Zap, Star, Shield } from 'lucide-react';
import { Button } from './Button';

export const PricingView: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: ['2 AI Tutors', '15 mins daily voice', 'Basic subjects', 'Community support'],
      buttonText: 'Current Plan',
      variant: 'secondary' as const,
      icon: <Shield className="w-6 h-6 text-indigo-400" />
    },
    {
      name: 'Pro',
      price: '$12',
      description: 'For dedicated learners',
      features: ['Unlimited Tutors', 'Unlimited voice mode', 'All subjects', 'Priority support', 'Custom tutors'],
      buttonText: 'Upgrade to Pro',
      variant: 'primary' as const,
      popular: true,
      icon: <Zap className="w-6 h-6 text-orange-500" />
    },
    {
      name: 'Team',
      price: '$49',
      description: 'For schools & groups',
      features: ['Everything in Pro', 'Admin dashboard', 'Progress tracking', 'Shared library', 'API access'],
      buttonText: 'Contact Sales',
      variant: 'secondary' as const,
      icon: <Star className="w-6 h-6 text-purple-500" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-indigo-950 tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-indigo-400 font-medium max-w-2xl mx-auto">
          Choose the plan that fits your learning goals. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative bg-white rounded-[48px] p-10 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              plan.popular ? 'border-orange-500 shadow-xl shadow-orange-500/10' : 'border-indigo-50 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-indigo-950">{plan.price}</span>
                <span className="text-indigo-300 font-bold">/month</span>
              </div>
              <p className="text-indigo-400 text-sm font-medium mt-2">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-10">
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-indigo-600" />
                  </div>
                  <span className="text-indigo-900 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={plan.variant} 
              fullWidth 
              className={`!py-4 rounded-2xl text-lg font-black ${plan.popular ? 'shadow-lg shadow-orange-500/30' : ''}`}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-indigo-950 rounded-[48px] p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-4 relative z-10">Still have questions?</h2>
        <p className="text-indigo-200 font-medium mb-8 relative z-10">We're here to help you choose the right plan for your needs.</p>
        <Button variant="secondary" className="!bg-white !text-indigo-950 !px-10 relative z-10">
          Chat with Support
        </Button>
      </div>
    </div>
  );
};
