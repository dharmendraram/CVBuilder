import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Crown, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        
        // If there are query parameters from eSewa redirect
        if (Object.keys(params).length > 0) {
          const res = await paymentService.verifyPaymentRedirect(params);
          setOrderDetails(res);
        }

        // Refresh user's subscription profile
        await refreshProfile();
        setSuccess(true);
      } catch (err) {
        console.error('Payment verification failed:', err);
        // Even if redirect check failed because backend already handled webhook, check profile
        const profile = await refreshProfile();
        if (profile?.subscriptionPlan?.toLowerCase() === 'premium') {
          setSuccess(true);
        } else {
          setErrorMsg(err.response?.data?.message || 'Verification could not be confirmed automatically. Please check your payment history.');
        }
      } finally {
        setVerifying(false);
      }
    };

    handleVerification();
  }, [searchParams]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        {verifying ? (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Verifying Payment...</h2>
            <p className="text-xs text-slate-500">Confirming your eSewa transaction details...</p>
          </div>
        ) : success ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>PRO PLAN ACTIVATED</span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you for upgrading! You now have lifetime/annual access to all premium resume templates and design tools.
            </p>

            {orderDetails?.orderId && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 text-left border border-slate-200">
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Status:</strong> {orderDetails.status || 'PAID'}</p>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Explore Pro Templates</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Status Pending</h2>
            <p className="text-xs text-slate-600">{errorMsg}</p>
            <div className="pt-2">
              <Link
                to="/payment-history"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <span>View Payment History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
