import { Card, CardContent } from "@/components/ui/card";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToggleTodo } from "@/hooks/useToggleTodo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Item } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import PriorityTag from "./PriorityTag";

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
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}> {todo.title} </HoverCardTrigger>
          {
            !todo.description || <HoverCardContent className="w-64 max-h-32 overflow-y-auto" > {todo.description} </HoverCardContent>
          }
          <Item>{todo.priority}</Item>
        </HoverCard>
        <PriorityTag priority={todo.priority} />
      </CardContent>
    </Card>
  );
}
