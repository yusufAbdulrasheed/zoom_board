import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserInfo from "@/components/UserInfo"
import { Loader2Icon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TIME_SLOTS } from "@/constant";
import MeetingCard from "@/components/MeetingCard";

function InterviewScheduleUI() {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
  const users = useQuery(api.users.getUsers) ?? [];
  const createInterview = useMutation(api.interviews.createInterview);

  const candidates = users?.filter((u) => u.role === "candidate");
  const admins = users?.filter((u) => u.role === "admin");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    candidateId: "",
    adminIds: user?.id ? [user.id] : [],
  });

  const scheduleMeeting = async () => {
    if (!client || !user) return;
    if (!formData.candidateId || formData.adminIds.length === 0) {
      toast.error("Please select both candidate and at least one interviewer");
      return;
    }

    setIsCreating(true);

    try {
      const { title, description, date, time, candidateId, adminIds } = formData;
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: "upcoming",
        streamCallId: id,
        candidateId,
        adminIds
      });

      setOpen(false);
      toast.success("Meeting scheduled successfully!");

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        adminIds: user?.id ? [user.id] : [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const addAdmin = (adminId: string) => {
    if (!formData.adminIds.includes(adminId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.adminIds, adminId],
      }));
    }
  };

  const removeAdmin = (adminId: string) => {
    if (adminId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      adminIds: prev.adminIds.filter((id) => id !== adminId),
    }));
  };

  const selectedAdmins = admins.filter((i) =>
    formData.adminIds.includes(i.clerkId)
  );

  const availableAdmins = admins.filter(
    (i) => !formData.adminIds.includes(i.clerkId)
  );

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        {/* HEADER INFO */}
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage interviews</p>
        </div>

        {/* DIALOG */}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Schedule Interview</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* INTERVIEW TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Interview title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* INTERVIEW DESC */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Interview description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* CANDIDATE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Candidate</label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(candidateId) => setFormData({ ...formData, candidateId })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.clerkId} value={candidate.clerkId}>
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* INTERVIEWERS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Interviewers</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedAdmins.map((admin) => (
                    <div
                      key={admin.clerkId}
                      className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
                    >
                      <UserInfo user={admin} />
                      {admin.clerkId !== user?.id && (
                        <button
                          onClick={() => removeAdmin(admin.clerkId)}
                          className="hover:text-destructive transition-colors"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {availableAdmins.length > 0 && (
                  <Select onValueChange={addAdmin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAdmins.map((admin) => (
                        <SelectItem key={admin.clerkId} value={admin.clerkId}>
                          <UserInfo user={admin} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* DATE & TIME */}
              <div className="flex gap-4">
                {/* CALENDAR */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                {/* TIME */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={formData.time}
                    onValueChange={(time) => setFormData({ ...formData, time })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={scheduleMeeting} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Interview"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LOADING STATE & MEETING CARDS */}
      {!interviews ? (
        <div className="flex justify-center py-12">
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="spacey-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <MeetingCard key={interview._id} interview={interview} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">No interviews scheduled</div>
      )}
    </div>
  );
}
export default InterviewScheduleUI;