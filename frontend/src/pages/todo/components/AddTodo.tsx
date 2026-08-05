import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTodo() {
  return (
    <Card className="max-w-3xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <Input
          placeholder="Enter title..."
        />

        <Textarea
          placeholder="Enter description..."
        />

        <Button className="w-full">
          Add Todo
        </Button>

      </CardContent>
    </Card>
  );
}