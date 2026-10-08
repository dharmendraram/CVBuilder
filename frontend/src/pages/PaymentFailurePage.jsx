import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { paymentService } from '../services/api';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export const PaymentFailurePage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('transaction_uuid') || searchParams.get('orderId');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      paymentService.paymentFailure(orderId).catch((err) => console.error('Logged failure:', err));
    }
  }, [orderId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
          <XCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Payment Cancelled or Failed</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          The transaction could not be completed or was cancelled. No charges were made to your account.
        </p>

        {orderId && (
          <p className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            Reference Order: <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
