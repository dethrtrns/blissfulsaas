"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Search, Clock, Calendar, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";

export default function MessageHistoryClient({ 
  initialSessions, 
  currentUserId,
  mode = 'therapist'
}: { 
  initialSessions: any[], 
  currentUserId: string,
  mode?: 'patient' | 'therapist'
}) {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchMessages = useCallback(async (sessionId: string) => {
    setLoading(true);
    try {
      const data = await api.messages.history(sessionId);
      setMessages(data || []);
    } catch (error) {
      console.error("Failed to fetch message history", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id);
    }
  }, [selectedSession, fetchMessages]);

  const filteredSessions = initialSessions.filter(s => {
    const otherParty = mode === 'therapist' ? s.patient : s.therapist;
    const name = `${otherParty?.firstName} ${otherParty?.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex overflow-hidden h-[calc(100vh-18rem)]">
      {/* Sidebar - Conversation List */}
      <div className={`w-full md:w-80 border-r border-slate-100 flex flex-col ${selectedSession ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-20 opacity-30">
              <MessageSquare className="w-8 h-8 mx-auto mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest">No history found</p>
            </div>
          ) : (
            filteredSessions.map((s) => {
              const otherParty = mode === 'therapist' ? s.patient : s.therapist;
              const isActive = selectedSession?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`w-full p-4 rounded-2xl transition-all flex items-center gap-3 text-left ${
                    isActive ? 'bg-primary/5 border border-primary/10' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {otherParty?.firstName?.[0]}{otherParty?.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-primary' : 'text-slate-900'}`}>
                      {otherParty?.firstName} {otherParty?.lastName}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      {new Date(s.scheduledAt).toLocaleDateString()}
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Area - Chat History */}
      <div className={`flex-1 flex flex-col bg-slate-50/30 ${!selectedSession ? 'hidden md:flex' : 'flex'}`}>
        {!selectedSession ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center mb-6 text-slate-200">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-heading font-medium text-slate-800 mb-2">Clinical Archive</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Select a previous session from the sidebar to review the full communication history.
            </p>
          </div>
        ) : (
          <>
            {/* Thread Header */}
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedSession(null)}
                  className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-900"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">
                    Session with {mode === 'therapist' ? selectedSession.patient?.firstName : selectedSession.therapist?.firstName}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {new Date(selectedSession.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                selectedSession.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {selectedSession.status}
              </span>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="w-6 h-6 border-2 border-slate-200 border-t-primary rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-slate-300 opacity-50 space-y-2">
                  <MessageSquare className="w-8 h-8" />
                  <p className="text-xs font-bold uppercase tracking-widest">No clinical messages exchanged</p>
                </div>
              ) : (
                messages.map((m) => {
                  const isMe = m.senderId === currentUserId;
                  return (
                    <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                        isMe 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                      }`}>
                        {m.content}
                      </div>
                      <span className="mt-2 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Note */}
            <div className="p-4 bg-white/50 border-t border-slate-100 text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Secure Clinical Archive — Read Only
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
