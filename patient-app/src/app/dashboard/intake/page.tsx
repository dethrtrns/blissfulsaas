import { api } from "@/lib/api-server";
import IntakeFormClient from "@/components/IntakeFormClient";
import { ClipboardList } from "lucide-react";

export default async function IntakePage() {
  const intake = await api.intake.get();

  return (
    <IntakeFormClient initialData={intake} />
  );
}
