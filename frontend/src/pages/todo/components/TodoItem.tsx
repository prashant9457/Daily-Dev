import { Card, CardContent } from "@/components/ui/card";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToggleTodo } from "@/hooks/useToggleTodo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import PriorityTag from "./PriorityTag";
import { TrashIcon } from "@phosphor-icons/react";
import type { deleteTodo } from "@/api/todo.api";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { mutate: toggleTodo, isPending: isToggling} = useToggleTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  function handleToggle() {
    toggleTodo({
      id: todo._id,
      completed: !todo.completed,
    });
  }

  function handleDelete() {
    deleteTodo(todo._id);
  }

  return (
    <Card className="rounded-lg">
      <CardContent className="flex items-center gap-4">
        <Checkbox
          className="rounded-lg"
          checked={todo.completed}
          onCheckedChange={handleToggle}
          disabled={isToggling}
        />
        <div className="flex-1">
          <HoverCard>
            <HoverCardTrigger delay={100} closeDelay={200}>
              {" "}
              {todo.title}{" "}
            </HoverCardTrigger>
            {!todo.description || (
              <HoverCardContent className="w-64 max-h-32 overflow-y-auto">
                {" "}
                {todo.description}{" "}
              </HoverCardContent>
            )}
          </HoverCard>
        </div>
        <PriorityTag priority={todo.priority} />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <TrashIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
