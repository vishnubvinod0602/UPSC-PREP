"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
const [subject, setSubject] = useState("GS1");
const [priority, setPriority] = useState("Medium");
const [start, setStart] = useState("");
const [end, setEnd] = useState("");
const [date, setDate] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger
  render={<Button />}
>
  Add Task
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

      <div className="space-y-4">
  <div>
    <Label htmlFor="title">Task Title</Label>
  <Input
  id="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="e.g. GS Paper II Revision"
/>
  </div>

  <div>
    <Label>Subject</Label>

    <Select
  value={subject}
  onValueChange={setSubject}
>
      <SelectTrigger>
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="GS1">GS1</SelectItem>
        <SelectItem value="GS2">GS2</SelectItem>
        <SelectItem value="GS3">GS3</SelectItem>
        <SelectItem value="GS4">GS4</SelectItem>
        <SelectItem value="PSIR">PSIR</SelectItem>
        <SelectItem value="Essay">Essay</SelectItem>
        <SelectItem value="Current Affairs">Current Affairs</SelectItem>
        <SelectItem value="Revision">Revision</SelectItem>
        <SelectItem value="CSAT">CSAT</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div>
    <Label>Priority</Label>

    <Select
  value={priority}
  onValueChange={setPriority}
>
      <SelectTrigger>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="High">High</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="Low">Low</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label>Start Time</Label>
      <Input type="time" />
    </div>

    <div>
      <Label>End Time</Label>
      <Input type="time" />
    </div>
  </div>

  <div>
    <Label>Date</Label>
    <Input type="date" />
  </div>

  <button className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700">
    Add Task
  </button>
</div>
      </DialogContent>
    </Dialog>
  );
}