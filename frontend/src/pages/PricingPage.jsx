import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Check, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Info,
  Copy
} from 'lucide-react';

export const PricingPage = () => {
  const { isLoggedIn, isPremium, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedField, setCopiedField] = useState('');

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleUpgrade = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please sign in first to upgrade to Pro.' } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderResponse = await paymentService.createOrder('premium');

      if (orderResponse && orderResponse.paymentUrl && orderResponse.formData) {
        // Create dynamic form and POST to eSewa payment gateway
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = orderResponse.paymentUrl;

        Object.entries(orderResponse.formData).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Invalid payment initialization response');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(err.response?.data?.message || 'eSewa gateway is currently unreachable. You can use the Sandbox Test Activation button below.');
      setLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please sign in first to test Pro activation.' } });
      return;
    }

    setSimulating(true);
    setError('');
    try {
      const order = await paymentService.createOrder('premium');
      const verified = await paymentService.simulateSuccess(order.orderId);
      if (verified.success) {
        await refreshProfile();
        setSuccessMsg('🎉 Pro plan successfully activated in Sandbox Mode!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Sandbox simulation error:', err);
      setError('Could not simulate payment. Please verify backend is running.');
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Crown className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Invest in Your Career with Confidence
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Choose the plan that fits your job search needs. Instant activation via Nepal's leading digital wallet, eSewa.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Tier</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Free Starter</h3>
                <p className="text-xs text-slate-500 mt-1">Everything you need to create your first ATS resumes</p>
              </div>

              <div className="flex items-baseline gap-1 pb-4 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-900">NPR 0</span>
                <span className="text-xs text-slate-500">/ forever free</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>4 Free ATS Templates</strong> (01, 02, 03, 04)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited Resumes Creation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Cloudinary Profile Picture Storage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time Live Preview</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Standard PDF & Print Export</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {isLoggedIn ? 'Current Base Plan' : 'Get Started Free'}
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-indigo-500/30">
            {/* Top highlight badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wide">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 fill-amber-400" /> Premium Pro Tier
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Professional Career Pro</h3>
                <p className="text-xs text-slate-300 mt-1">For ambitious engineers and leaders who want to stand out</p>
              </div>

              <div className="flex items-baseline gap-1 pb-4 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">NPR 1,000</span>
                <span className="text-xs text-slate-400">/ one-time payment</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>All 6 Designer Templates Unlocked</strong> (Including 05 & 06)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Custom Color Palette Studio</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>High-Resolution Vector PDF Generation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Instant eSewa Automated Activation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Future Premium Template Updates Included</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800 space-y-3">
              {isPremium ? (
                <div className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> You Already Have Premium Plan Active
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleUpgrade}
                    disabled={loading || simulating}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02]"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pay NPR 1,000 via eSewa Gateway</span>
                      </>
                    )}
                  </button>

                  {/* Sandbox Direct Activation fallback if eSewa test gateway times out */}
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={loading || simulating}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {simulating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-300" />
                        <span>Instant Sandbox Test Activation</span>
                      </>
                    )}
                  </button>
                </>
              )}

              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secured by eSewa Nepal ePay Gateway</span>
              </p>
            </div>
          </div>
        </div>

        {/* eSewa Sandbox Credentials Help Card */}
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
            <Info className="w-5 h-5 text-amber-700" />
            <span>eSewa Sandbox Test Wallet Credentials (For Payment Page)</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            When you are redirected to the eSewa test payment page (on <code>rc-epay.esewa.com.np</code>), enter any of the official test credentials below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">eSewa Test ID</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-slate-900">9806800001</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('9806800001', 'id1')}
                  className="text-amber-700 hover:text-amber-900"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copiedField === 'id1' && <span className="text-[10px] text-emerald-600">Copied!</span>}
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Password</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-slate-900">Nepal@123</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Nepal@123', 'pwd')}
                  className="text-amber-700 hover:text-amber-900"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copiedField === 'pwd' && <span className="text-[10px] text-emerald-600">Copied!</span>}
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">MPIN</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-slate-900">1122</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('1122', 'mpin')}
                  className="text-amber-700 hover:text-amber-900"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copiedField === 'mpin' && <span className="text-[10px] text-emerald-600">Copied!</span>}
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Token / OTP</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-slate-900">123456</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('123456', 'otp')}
                  className="text-amber-700 hover:text-amber-900"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copiedField === 'otp' && <span className="text-[10px] text-emerald-600">Copied!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
