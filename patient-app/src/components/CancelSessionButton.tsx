"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CancelSessionButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this session?")) return;
    
    setLoading(true);
    try {
      await api.sessions.cancel(id);
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Failed to cancel session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCancel}
      disabled={loading}
      className="p-4 text-muted-foreground/60 hover:text-error hover:bg-error/5 rounded-2xl transition-all group"
      title="Cancel Session"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
