import { createClient } from "@/lib/supabase/server";
import { Users, Calendar, ArrowRight, Shield, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchWithAuthContent } from "@/lib/api-server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const firstName = data?.user?.user_metadata?.first_name || "Doctor";
  
  // Fetch real upcoming sessions from the backend
  const upcomingSessions = await fetchWithAuthContent("/sessions/upcoming");
  const nextSession = Array.isArray(upcomingSessions) && upcomingSessions.length > 0 ? upcomingSessions[0] : null;

  return (
    <div className="space-y-12 pb-24">
      {/* Welcome Banner */}
      <div className="relative group bg-primary border border-primary/20 p-12 rounded-[2rem] shadow-2xl shadow-primary/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
             <h1 className="text-[2.75rem] font-heading font-medium text-primary-foreground mb-6 leading-tight">
               Good afternoon, {firstName}
             </h1>
             <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
               Your private practice is flourishing. You have <span className="text-primary-foreground font-bold underline decoration-primary-container decoration-4 underline-offset-4">{upcomingSessions?.length || 0} session(s)</span> scheduled for today.
             </p>
             <div className="mb-8 flex">
               <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                 <Shield className="w-4 h-4 text-primary-container animate-pulse" />
                 Clinic Status: <span className="text-primary-container">Secured & Active</span>
               </div>
             </div>
             <div className="flex gap-4">
                {nextSession && (
                  <Link href={`/dashboard/sessions/${nextSession.id}/call`}>
                    <button className="bg-primary-container text-primary-foreground px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                      Launch Virtual Room
                    </button>
                  </Link>
                )}
             </div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2 text-right">
             <div className="bg-primary-container/30 px-6 py-4 rounded-2xl border border-primary-foreground/10">
               <p className="text-primary-foreground/40 text-[10px] font-bold uppercase tracking-widest mb-1">Clinic Status</p>
               <p className="text-primary-foreground font-bold flex items-center gap-2">
                 <Shield className="w-4 h-4 text-primary-container" /> Secured • HIPAA Compliant
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Roster & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Next Session Spotlight */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-heading font-normal text-foreground">Next Session</h3>
            <Link href="/dashboard/appointments" className="text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-all flex items-center group">
              Full Schedule <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {nextSession ? (
            <div className="bg-surface p-10 rounded-[2.5rem] border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500 relative group">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[2rem] bg-surface-container-low border border-outline-variant/50 flex items-center justify-center text-primary font-bold overflow-hidden p-0.5 shadow-inner group-hover:scale-105 transition-transform">
                  <Image 
                    src={`https://ui-avatars.com/api/?name=${nextSession.patient?.firstName}+${nextSession.patient?.lastName}&background=random&color=fff&size=200`}
                    alt="Patient"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-[1.8rem]"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-foreground font-heading font-medium text-xl mb-1">{nextSession.patient?.firstName} {nextSession.patient?.lastName}</h4>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase">Booking Active</span>
                    <span className="text-xs font-medium text-muted-foreground">• Video Session</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-foreground font-bold text-lg mb-1">
                  {new Date(nextSession.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground/60">
                   <Clock className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">{nextSession.duration} Min Session</span>
                </div>
              </div>
              <Link href={`/dashboard/appointments/${nextSession.id}`}>
                <button className="px-10 py-3.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all duration-300">
                  Prepare Notes
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-surface p-10 rounded-[2.5rem] border border-outline-variant/30 text-center py-20">
              <Calendar className="w-12 h-12 text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground">No sessions scheduled for today.</p>
              <Link href="/dashboard/availability" className="text-primary font-bold text-xs uppercase tracking-widest mt-4 inline-block hover:underline">
                Update your availability
              </Link>
            </div>
          )}
        </div>

        {/* Clinical Performance */}
        <div className="space-y-6">
           <div className="px-2 h-8" />
           <div className="bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/20 flex flex-col justify-between shadow-sm relative overflow-hidden group h-full">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="flex items-center justify-between z-10">
               <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Clinical Performance</p>
               <Star className="w-4 h-4 text-primary fill-primary" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-10 z-10">
              <div className="text-8xl font-heading font-normal text-primary drop-shadow-xl">
                {upcomingSessions?.length > 0 ? "100%" : "—"}
              </div>
              <p className="text-[10px] font-bold text-muted-foreground mt-6 text-center uppercase tracking-widest leading-relaxed">
                Attendance <br/> This Week
              </p>
            </div>
            <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden z-10 border border-outline-variant/10">
              <div className="h-full w-[100%] bg-primary rounded-full shadow-lg shadow-primary/50" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
