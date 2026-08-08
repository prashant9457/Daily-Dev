import { Badge } from "@/components/ui/badge";
import type { Todo } from "@/types/todo";

interface PriorityTagProps {
    priority : Todo["priority"];
}

export default function PriorityTag ({priority} : PriorityTagProps) {
    const priorityStyles = {
        low: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        medium: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        high: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    } 

    return (
        <Badge className={priorityStyles[priority]}> {priority} </Badge>
    );
}