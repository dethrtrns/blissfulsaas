import { Calendar as CalendarIcon, Clock, User, ArrowRight, CheckCircle, XCircle, Video } from "lucide-react";
import Link from "next/link";
import { fetchWithAuthContent } from "@/lib/api-server";
import AppointmentActions from "@/components/AppointmentActions";

export default async function AppointmentsPage() {
  const sessions = await fetchWithAuthContent("/sessions/upcoming");
  const appointments = Array.isArray(sessions) ? sessions : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Appointments
          </h1>
          <p className="text-slate-500 mt-1">View and manage your consultation schedule.</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Patient</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Scheduled Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Duration</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <CalendarIcon className="w-10 h-10 opacity-20" />
                      <p>No upcoming appointments found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {appt.patient?.firstName?.[0]}{appt.patient?.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{appt.patient?.firstName} {appt.patient?.lastName}</p>
                          <p className="text-xs text-slate-500">Video Consultation</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">
                          {new Date(appt.scheduledAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <Clock className="w-4 h-4 text-slate-400 ml-2" />
                        <span className="text-sm font-medium">
                          {new Date(appt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {appt.duration} Minutes
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        appt.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        appt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-4">
                          <AppointmentActions id={appt.id} status={appt.status} />
                          <Link href={`/dashboard/sessions/${appt.id}/call`}>
                            <button 
                              disabled={appt.status === 'CANCELLED' || appt.status === 'COMPLETED'}
                              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed">
                              Join Room
                            </button>
                          </Link>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
