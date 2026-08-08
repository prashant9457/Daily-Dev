import { useState } from "react";

import { useCreateTodo } from "@/hooks/useCreateTodo";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateTodo();

  function handleSubmit() {
    if (!title.trim()) return;

    mutate(
      {
        title,
        description,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  }

  return (
    <Card className="max-w-3xl mx-auto mb-8 rounded-lg">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 ">
        <Input className="rounded-lg"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea className="rounded-lg"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button 
          className="w-full rounded-lg"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Todo"}
        </Button>
      </CardContent>
    </Card>
  );
}