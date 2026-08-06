import { Card, CardContent, CardDescription } from "@/components/ui/card";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  index: number;
}

export default function TodoItem({ todo, index }: TodoItemProps) {

  return (
    <Card className="rounded-lg">
      <CardContent className="pt-6">
        <div>
          <Checkbox checked={todo.completed}/>
        </div>
        <h1>#{index} {todo.title}</h1>

        <CardDescription className="mt-2">{todo.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
