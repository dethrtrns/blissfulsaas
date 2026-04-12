import { MessageSquare, Search, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchWithAuthContent } from "@/lib/api-server";

export default async function MessagesPage() {
  const sessions = await fetchWithAuthContent("/sessions/upcoming");
  const conversations = Array.isArray(sessions) ? sessions : [];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Messages
          </h1>
          <p className="text-slate-500 mt-1">Clinical communication with your patients.</p>
        </div>
      </header>

      <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex overflow-hidden">
        {/* Sidebar - Conversation List */}
        <div className="w-full md:w-80 border-r border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {conversations.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">No active chats</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <Link key={conv.id} href={`/dashboard/session/${conv.id}/call`} className="block">
                  <div className="p-4 rounded-2xl hover:bg-slate-50 transition-all group flex items-center gap-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {conv.patient?.firstName?.[0]}{conv.patient?.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{conv.patient?.firstName} {conv.patient?.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">Upcoming: {new Date(conv.scheduledAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Chat Placeholder */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50/50">
          <div className="text-center max-w-xs">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-blue-600">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Conversation</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Real-time clinical chat is available within each session room. Select a patient from the sidebar to view history or join the call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
