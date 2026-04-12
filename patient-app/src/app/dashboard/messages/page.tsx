import { api } from "@/lib/api-server";
import { createClient } from "@/lib/supabase/server";
import MessageHistoryClient from "@/components/MessageHistoryClient";

export default async function MessagesPage() {
  const sessions = await api.sessions.all();
  const conversations = Array.isArray(sessions) ? sessions : [];
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-10 animate-in fade-in duration-700 h-[calc(100vh-10rem)]">
      <header>
        <h1 className="text-4xl font-heading font-medium text-foreground leading-none">
          Clinical Messages
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">Review your consultation history and previous chats with specialists.</p>
      </header>

      <MessageHistoryClient 
        initialSessions={conversations} 
        currentUserId={user?.id || ""} 
      />
    </div>
  );
}
