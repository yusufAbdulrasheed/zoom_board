"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();

  const { isAdmin, isLoading } = useUserRole();

  if (isLoading) return <LoaderUI />;
  if (!isAdmin) return router.push("/");

  return <InterviewScheduleUI />;
}
export default SchedulePage;