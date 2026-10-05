import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Shield, 
  Lock, 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Info,
  Gift
} from "lucide-react";

interface DonationTier {
  id: string;
  amount: number;
  label: string;
  badge: string;
  description: string;
  impact: string;
}

const DONATION_TIERS: DonationTier[] = [
  {
    id: "starter",
    amount: 25,
    label: "Digital Access",
    badge: "Connectivity",
    description: "Provides basic connectivity.",
    impact: "Provides 1 month of encrypted internet connectivity, high-speed secure VPN, and learning modules for 3 students."
  },
  {
    id: "empower",
    amount: 50,
    label: "Offline Kit",
    badge: "Most Popular",
    description: "Pre-loaded learning device.",
    impact: "Covers a secure offline learning kit containing a pre-loaded educational tablet and printed Pashto/Dari workbooks."
  },
  {
    id: "artisan",
    amount: 150,
    label: "Artisan Startup",
    badge: "Vocational Growth",
    description: "Equip a micro-business.",
    impact: "Supplies a high-quality sewing machine, sewing raw materials, and business readiness mentoring for a home artisan."
  },
  {
    id: "scholarship",
    amount: 300,
    label: "Future Champion",
    badge: "Full Scholarship",
    description: "Full year of education.",
    impact: "Sponsors a student's full year of advanced education, AI literacy coursework, and professional career mentorship."
  }
];

interface DonationWidgetProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function DonationWidget({ 
  className = "", 
  title = "Support Structured Empowerment", 
  subtitle = "Help Afghan women and girls secure independent, resilient, and dignified futures."
}: DonationWidgetProps) {
  const [selectedTier, setSelectedTier] = useState<string>("empower");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Amount/Impact, 2: Payment details, 3: Success Screen

  // Form states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive active amount
  const getActiveAmount = (): number => {
    if (isCustom) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    const tier = DONATION_TIERS.find(t => t.id === selectedTier);
    return tier ? tier.amount : 0;
  };

  // Dynamic Impact Statement generator
  const getDynamicImpactStatement = (): string => {
    const amount = getActiveAmount();
    if (amount <= 0) return "Choose an amount to see the tangible change your contribution makes.";
    if (amount < 20) return `Provides critical learning materials and offline educational booklets for a student.`;
    if (amount < 45) return `Sponsors secure VPN access, anti-surveillance guidance, and high-speed internet data for 2 girls.`;
    if (amount < 100) return `Funds 1 secure learning kit including a hardware device, pre-loaded offline curricula, and Dari/Pashto study manuals.`;
    if (amount < 250) return `Sponsors a home-based artisan startup kit, supplying a heavy-duty sewing machine, professional fabrics, and financial training.`;
    if (amount < 500) return `Provides a fully accredited international secondary school or university entrance preparation program for a girl for 1 year.`;
    return `Provides direct life-changing educational tracks, safe digital workspace infrastructure, and holistic psychological wellbeing mentoring for multiple families.`;
  };

  // Card Number Auto-formatting (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  // Expiry Auto-formatting (adds slash)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setCardExpiry(value);
  };

  // CVV limit
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardCvv(value);
  };

  const validateStep1 = () => {
    const amount = getActiveAmount();
    if (amount <= 0) {
      setErrors({ amount: "Please select or enter a valid donation amount." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!donorEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      newErrors.donorEmail = "Please enter a valid email address.";
    }
    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required.";
    }
    const cleanCard = cardNumber.replace(/\s/g, "");
    if (cleanCard.length < 15 || cleanCard.length > 16) {
      newErrors.cardNumber = "Please enter a valid card number.";
    }
    if (cardExpiry.length !== 5) {
      newErrors.cardExpiry = "Enter expiration date (MM/YY).";
    } else {
      const [month, year] = cardExpiry.split("/");
      const m = parseInt(month, 10);
      if (m < 1 || m > 12) {
        newErrors.cardExpiry = "Invalid expiry month.";
      }
    }
    if (cardCvv.length < 3) {
      newErrors.cardCvv = "Invalid CVV.";
    }
    if (!zipCode.trim()) {
      newErrors.zipCode = "Required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    // Simulate highly professional, secure payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1800);
  };

  const resetWidget = () => {
    setStep(1);
    setCustomAmount("");
    setIsCustom(false);
    setSelectedTier("empower");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setDonorEmail("");
    setZipCode("");
    setErrors({});
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`} id="donation-widget-container">
      <div className="bg-white dark:bg-brand-dark/40 border border-brand-dark/5 dark:border-white/5 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl relative transition-all duration-300">
        
        {/* Aesthetic design element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 dark:bg-brand-accent/10 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/5 dark:bg-brand-accent/5 rounded-full blur-3xl -z-10" />

        {/* Dynamic header */}
        {step !== 3 && (
          <div className="border-b border-brand-dark/5 dark:border-white/5 px-8 py-8 md:px-12 text-center relative">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark dark:text-dark-text mb-2">
              {title}
            </h3>
            <p className="text-sm md:text-base text-brand-dark/60 dark:text-dark-text/60 max-w-2xl mx-auto">
              {subtitle}
            </p>
            
            {/* Step Indicators */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? "w-8 bg-brand-accent" : "w-2 bg-brand-dark/10 dark:bg-white/10"}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? "w-8 bg-brand-accent" : "w-2 bg-brand-dark/10 dark:bg-white/10"}`} />
              <span className="h-1.5 w-2 rounded-full bg-brand-dark/10 dark:bg-white/10" />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Selection Panel */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Frequency Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/40 dark:text-dark-text/40 mb-3">Support Type</label>
                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-brand-dark/5 dark:bg-white/5 rounded-2xl border border-brand-dark/10 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          frequency === "monthly"
                            ? "bg-white dark:bg-brand-dark text-brand-dark dark:text-dark-text shadow-md font-semibold"
                            : "text-brand-dark/60 dark:text-dark-text/60 hover:text-brand-dark dark:hover:text-dark-text"
                        }`}
                      >
                        <Heart size={14} className={frequency === "monthly" ? "fill-brand-accent text-brand-accent" : ""} />
                        <span>Monthly Support</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency("one-time")}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          frequency === "one-time"
                            ? "bg-white dark:bg-brand-dark text-brand-dark dark:text-dark-text shadow-md font-semibold"
                            : "text-brand-dark/60 dark:text-dark-text/60 hover:text-brand-dark dark:hover:text-dark-text"
                        }`}
                      >
                        <Gift size={14} />
                        <span>One-time Gift</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Amount Tiers */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/40 dark:text-dark-text/40">Select Contribution Amount</label>
                      <button 
                        type="button"
                        onClick={() => {
                          setIsCustom(!isCustom);
                          setErrors({});
                        }}
                        className="text-xs text-brand-accent font-semibold hover:underline"
                      >
                        {isCustom ? "Choose preset amount" : "Enter custom amount"}
                      </button>
                    </div>

                    {!isCustom ? (
                      <div className="grid grid-cols-2 gap-4">
                        {DONATION_TIERS.map((tier) => {
                          const isActive = selectedTier === tier.id && !isCustom;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => {
                                setSelectedTier(tier.id);
                                setErrors({});
                              }}
                              className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden ${
                                isActive
                                  ? "bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark border-brand-accent shadow-lg scale-[1.02]"
                                  : "bg-white dark:bg-brand-dark/30 hover:bg-brand-dark/5 dark:hover:bg-white/5 border-brand-dark/10 dark:border-white/10"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-2xl font-serif font-bold ${isActive ? "text-brand-accent" : "text-brand-dark dark:text-dark-text"}`}>
                                  ${tier.amount}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                                  isActive 
                                    ? "bg-brand-accent/20 text-brand-accent" 
                                    : "bg-brand-dark/5 dark:bg-white/5 text-brand-dark/60 dark:text-dark-text/60"
                                }`}>
                                  {tier.badge}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold mb-1">{tier.label}</h4>
                              <p className={`text-xs ${isActive ? "text-brand-light/70 dark:text-brand-dark/70" : "text-brand-dark/50 dark:text-dark-text/50"}`}>
                                {tier.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-serif text-brand-dark/40 dark:text-dark-text/40 font-bold">
                          $
                        </div>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Enter customized donation amount"
                          value={customAmount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, "");
                            setCustomAmount(val);
                            setErrors({});
                          }}
                          className="w-full pl-12 pr-6 py-5 bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 rounded-2xl font-serif text-2xl font-bold focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text"
                        />
                      </div>
                    )}
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-2 font-medium">{errors.amount}</p>
                    )}
                  </div>
                </div>

                {/* Impact Showcase Box */}
                <div className="lg:col-span-5 h-full flex flex-col justify-between">
                  <div className="bg-brand-accent/10 dark:bg-dark-accent/5 border border-brand-accent/20 dark:border-dark-accent/10 rounded-3xl p-8 relative overflow-hidden flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-brand-accent text-brand-light rounded-xl">
                          <Sparkles size={18} />
                        </div>
                        <h4 className="font-serif font-bold text-lg dark:text-dark-text">Your Tangible Impact</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="text-xs uppercase tracking-widest font-bold text-brand-accent">
                          Estimated Outcome
                        </div>
                        <p className="text-brand-dark/80 dark:text-dark-text/85 text-base leading-relaxed font-serif italic">
                          "{isCustom ? getDynamicImpactStatement() : DONATION_TIERS.find(t => t.id === selectedTier)?.impact}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-brand-accent/15 flex justify-between items-center text-xs text-brand-dark/60 dark:text-dark-text/60">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Shield size={14} className="text-brand-accent" />
                        <span>100% Direct Program Funding</span>
                      </span>
                      <span>Dari & Pashto optimized</span>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-light font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-brand-accent/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Continue to Secure Payment</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    
                    <div className="flex justify-center items-center gap-4 mt-4 text-[11px] text-brand-dark/40 dark:text-dark-text/40">
                      <span className="flex items-center gap-1">
                        <Lock size={11} /> Secure SSL Encrypted
                      </span>
                      <span>•</span>
                      <span>Tax-deductible receipt provided</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              <form onSubmit={handleSubmitDonation} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Billing and Card Form */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-serif font-bold text-lg text-brand-dark dark:text-dark-text">Secure Billing Details</h4>
                    <button 
                      type="button" 
                      onClick={() => {
                        setStep(1);
                        setErrors({});
                      }}
                      className="text-xs text-brand-dark/60 dark:text-dark-text/60 hover:text-brand-accent underline"
                    >
                      Modify Amount
                    </button>
                  </div>

                  {/* Donor Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={donorEmail}
                      onChange={(e) => {
                        setDonorEmail(e.target.value);
                        if (errors.donorEmail) setErrors(prev => ({ ...prev, donorEmail: "" }));
                      }}
                      className={`w-full px-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                        errors.donorEmail ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                      }`}
                    />
                    {errors.donorEmail && <p className="text-red-500 text-xs mt-1">{errors.donorEmail}</p>}
                  </div>

                  {/* Card Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={cardName}
                      onChange={(e) => {
                        setCardName(e.target.value);
                        if (errors.cardName) setErrors(prev => ({ ...prev, cardName: "" }));
                      }}
                      className={`w-full px-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                        errors.cardName ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                      }`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">Card Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40 dark:text-dark-text/40">
                        <CreditCard size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => {
                          handleCardNumberChange(e);
                          if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: "" }));
                        }}
                        className={`w-full pl-11 pr-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                          errors.cardNumber ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                        }`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Expiry, CVV, Zip Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          handleExpiryChange(e);
                          if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: "" }));
                        }}
                        className={`w-full px-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm text-center focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                          errors.cardExpiry ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                        }`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-[10px] mt-1 leading-tight">{errors.cardExpiry}</p>}
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => {
                          handleCvvChange(e);
                          if (errors.cardCvv) setErrors(prev => ({ ...prev, cardCvv: "" }));
                        }}
                        className={`w-full px-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm text-center focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                          errors.cardCvv ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                        }`}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-[10px] mt-1 leading-tight">{errors.cardCvv}</p>}
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs uppercase tracking-widest font-bold text-brand-dark/60 dark:text-dark-text/60 mb-2">Postal ZIP</label>
                      <input
                        type="text"
                        placeholder="94101"
                        value={zipCode}
                        onChange={(e) => {
                          setZipCode(e.target.value);
                          if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: "" }));
                        }}
                        className={`w-full px-4 py-3 bg-brand-dark/5 dark:bg-white/5 border rounded-xl text-sm text-center focus:outline-none focus:border-brand-accent text-brand-dark dark:text-dark-text ${
                          errors.zipCode ? "border-red-500" : "border-brand-dark/10 dark:border-white/10"
                        }`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-[10px] mt-1 leading-tight">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Right Summary Column */}
                <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6">
                  <div className="bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 rounded-3xl p-8 space-y-6 flex-grow">
                    <h4 className="font-serif font-bold text-lg text-brand-dark dark:text-dark-text pb-4 border-b border-brand-dark/10 dark:border-white/10">Summary</h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-brand-dark/60 dark:text-dark-text/60">Amount:</span>
                        <span className="font-serif font-bold text-brand-dark dark:text-dark-text text-xl">${getActiveAmount()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-brand-dark/60 dark:text-dark-text/60">Schedule:</span>
                        <span className="capitalize font-semibold text-brand-accent flex items-center gap-1.5">
                          {frequency === "monthly" && <Calendar size={13} />}
                          {frequency === "monthly" ? "Monthly Support" : "One-time Gift"}
                        </span>
                      </div>
                      
                      {frequency === "monthly" && (
                        <div className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl text-[11px] text-brand-dark/70 dark:text-dark-text/70 leading-relaxed">
                          ✨ <strong>Highly Value-Additive:</strong> Monthly contributions provide reliable infrastructure security to keep local physical community centers operating safely.
                        </div>
                      )}

                      <div className="pt-4 border-t border-brand-dark/10 dark:border-white/10 space-y-2">
                        <p className="text-xs uppercase tracking-widest font-bold text-brand-accent">Safeguarding Alignment</p>
                        <p className="text-[11px] text-brand-dark/60 dark:text-dark-text/60 leading-relaxed">
                          ESIN conforms strictly to PSEA guidelines. User names, personal details, and transactional elements are safeguarded via end-to-end cloud security audits.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/50 text-brand-light font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-brand-accent/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Securing Connection...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          <span>Donate ${getActiveAmount()} Securely</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-center text-xs mt-4 text-brand-dark/50 dark:text-dark-text/50 hover:text-brand-dark dark:hover:text-dark-text underline"
                    >
                      Back to Amount Selection
                    </button>
                  </div>
                </div>

              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="p-10 md:p-16 text-center space-y-8"
            >
              <div className="flex justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-brand-accent/20 dark:bg-brand-accent/30 text-brand-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle size={48} className="animate-pulse" />
                </motion.div>
              </div>

              <div className="max-w-xl mx-auto space-y-4">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark dark:text-dark-text">
                  Thank You, {cardName || "Empowerment Supporter"}!
                </h3>
                <p className="text-brand-accent font-serif text-lg font-semibold">
                  Contribution Amount: ${getActiveAmount()} {frequency === "monthly" ? "/ month" : ""}
                </p>
                <p className="text-brand-dark/70 dark:text-dark-text/70 text-sm md:text-base leading-relaxed">
                  Your structured empowerment support of <strong>${getActiveAmount()}</strong> has been securely queued. A confirmation receipt is on its way to <strong>{donorEmail || "your email"}</strong>.
                </p>
                <div className="bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/5 dark:border-white/5 p-6 rounded-2xl max-w-lg mx-auto text-xs text-brand-dark/60 dark:text-dark-text/60 leading-relaxed text-left">
                  🌟 <strong>Educational Program Mobilization:</strong> Your funds will directly unlock the corresponding curriculum tracks (VPN licensing, local secure offline tablet distribution, or startup vocational kits) within the next 48 hours. Thank you for your immense solidarity.
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={resetWidget}
                  className="bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark font-semibold py-3 px-8 rounded-xl hover:bg-brand-accent hover:dark:bg-brand-accent hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                >
                  Return to Dashboard / Widget
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
