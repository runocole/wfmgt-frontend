import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Check, Loader2, Lock, Sparkles, Users, Building2, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import { Label } from '@/components/ui/label';

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName: string;
  appId: number;
  prices: {
    individual: number;
    team: number;
    enterprise: number;
  };
  features: {
    individual: string[];
    team: string[];
    enterprise: string[];
  };
  onSubscribe: (plan: string) => Promise<void>;
}

const SubscriptionModal = ({ 
  open, 
  onOpenChange, 
  appName, 
  appId,
  prices,
  features,
  onSubscribe 
}: SubscriptionModalProps) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('team');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [step, setStep] = useState<'plans' | 'payment'>('plans');

  const formatNaira = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 1500);
  };

  const plans = [
    {
      id: 'individual',
      name: 'Individual',
      icon: <Sparkles className="h-8 w-8" />,
      price: prices.individual,
      nairaPrice: formatNaira(prices.individual),
      features: features.individual,
      description: 'Perfect for freelancers and solopreneurs',
      popular: false,
    },
    {
      id: 'team',
      name: 'Team',
      icon: <Users className="h-8 w-8" />,
      price: prices.team,
      nairaPrice: formatNaira(prices.team),
      features: features.team,
      description: 'Best for growing teams and small businesses',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <Building2 className="h-8 w-8" />,
      price: prices.enterprise,
      nairaPrice: formatNaira(prices.enterprise),
      features: features.enterprise,
      description: 'For large organizations with advanced needs',
      popular: false,
    },
  ];

  const handleSubscribe = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setIsLoading(true);
    try {
      await onSubscribe(selectedPlan);
      onOpenChange(false);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[1400px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center pb-8">
            <DialogTitle className="text-4xl font-bold text-[#1e3a8a]">
              {appName}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Choose your plan. All plans include core features. Upgrade or cancel anytime.
            </DialogDescription>
          </DialogHeader>

          {step === 'plans' ? (
            <div className="space-y-10">
              {/* THREE WIDE VERTICAL CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`
                      relative bg-white rounded-3xl border-2 p-8 cursor-pointer
                      transition-all duration-300 hover:scale-105 hover:shadow-2xl
                      flex flex-col min-h-[600px]
                      ${selectedPlan === plan.id 
                        ? 'border-[#1e3a8a] shadow-2xl ring-4 ring-[#1e3a8a]/20' 
                        : 'border-gray-200 hover:border-[#1e3a8a]/50'
                      }
                    `}
                  >
                    {/* Popular Badge - Only on Team card */}
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-[#1e3a8a] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 whitespace-nowrap">
                          <Crown className="h-4 w-4" />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {/* Card Content - VERTICAL LAYOUT */}
                    <div className="flex flex-col h-full pt-4">
                      {/* Icon */}
                      <div className="w-24 h-24 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center mb-6 mx-auto">
                        <div className="text-[#1e3a8a]">{plan.icon}</div>
                      </div>

                      {/* Plan Name */}
                      <h3 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                        {plan.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-base text-gray-600 mb-6 text-center">
                        {plan.description}
                      </p>

                      {/* Price - Large and Bold in Dark Blue */}
                      <div className="mb-8 text-center">
                        <div className="text-5xl font-black text-[#1e3a8a]">
                          {plan.nairaPrice}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">per month, billed monthly</div>
                      </div>

                      {/* Features List */}
                      <div className="flex-grow space-y-4 mb-8">
                        <h4 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">
                          Features:
                        </h4>
                        <div className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 text-base">
                              <Check className="h-5 w-5 text-[#1e3a8a] shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Select Indicator */}
                      {selectedPlan === plan.id && (
                        <div className="absolute top-6 right-6">
                          <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Select Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan.id);
                        }}
                        variant={selectedPlan === plan.id ? "default" : "outline"}
                        className={`
                          w-full py-6 text-lg font-semibold rounded-xl
                          ${selectedPlan === plan.id 
                            ? 'bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white' 
                            : 'border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5'
                          }
                        `}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200 px-4">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="px-10 py-6 text-base border-2"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => setStep('payment')}
                  className="px-10 py-6 text-base bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                  size="lg"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 px-4">
              {/* Selected Plan Summary */}
              <Card className="p-8 bg-gradient-to-r from-[#1e3a8a]/5 to-transparent border-[#1e3a8a]/20 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Selected Plan</p>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {selectedPlanDetails?.name} Plan
                    </h3>
                    <p className="text-base text-gray-600 mt-1">{appName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-[#1e3a8a]">
                      {selectedPlanDetails?.nairaPrice}
                    </p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>
              </Card>

              {/* Payment Form */}
              <Card className="p-8 rounded-2xl">
                <h4 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-[#1e3a8a]" />
                  Payment Details
                </h4>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="card" className="text-gray-700 text-base">Card Number</Label>
                    <Input 
                      id="card" 
                      placeholder="4242 4242 4242 4242" 
                      value="4242 4242 4242 4242" 
                      disabled 
                      className="bg-gray-50 p-6 text-base rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-gray-700 text-base">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" value="12/25" disabled className="bg-gray-50 p-6 text-base rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className="text-gray-700 text-base">CVC</Label>
                      <Input id="cvc" placeholder="123" value="123" disabled className="bg-gray-50 p-6 text-base rounded-xl" />
                    </div>
                  </div>
                  <div className="bg-[#1e3a8a]/5 p-4 rounded-xl">
                    <p className="text-sm text-[#1e3a8a] flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Test mode - Use any card details for demo
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('plans')}
                  className="px-8 py-6 text-base border-2 rounded-xl"
                >
                  Back to Plans
                </Button>
                <Button 
                  onClick={handleSubscribe} 
                  disabled={isLoading}
                  className="px-8 py-6 text-base bg-green-600 hover:bg-green-700 rounded-xl"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Lock className="h-5 w-5 mr-2" />
                  )}
                  Pay {selectedPlanDetails?.nairaPrice}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <LoginModal 
        open={showLogin}
        onOpenChange={setShowLogin}
        onSuccess={handleLoginSuccess}
        appName={appName}
      />
    </>
  );
};

export default SubscriptionModal;