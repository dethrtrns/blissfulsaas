"use client";

import { useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AppointmentActions({ id, status }: { id: string, status: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: 'cancel' | 'complete') => {
    const msg = action === 'cancel' 
      ? "Are you sure you want to cancel this appointment?" 
      : "Mark this session as completed?";
    
    if (!confirm(msg)) return;
    
    setLoading(true);
    try {
      if (action === 'cancel') {
        await api.sessions.cancel(id);
      } else {
        await api.sessions.complete(id);
      }
      router.refresh();
    } catch (error: any) {
      alert(error.message || `Failed to ${action} appointment`);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'CANCELLED' || status === 'COMPLETED') return null;

  return (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={() => handleAction('cancel')}
        disabled={loading}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        title="Cancel Appointment"
      >
        <XCircle className="w-5 h-5" />
      </button>
      <button 
        onClick={() => handleAction('complete')}
        disabled={loading}
        className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all"
        title="Mark as Completed"
      >
        <CheckCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
