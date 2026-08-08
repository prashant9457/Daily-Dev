import { Card, CardContent, CardDescription } from "@/components/ui/card";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToggleTodo } from "@/hooks/useToggleTodo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { mutate , isPending} = useToggleTodo();

  function handleToggle() {
    mutate({
      id: todo._id,
      completed: !todo.completed,
    })
  }

  return (
    <Card className="rounded-lg">
      <CardContent className="pt-6">
        <div>
          <Checkbox 
            checked={todo.completed}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
        </div>
        <h1>{todo.title}</h1>

        <CardDescription className="mt-2">{todo.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
