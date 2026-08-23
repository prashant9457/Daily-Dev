import { Button } from "@/components/ui/button";
import Login from "../auth/Login";
import UserSearch from "@/components/UserSearch";
import AddTodo from "@/pages/todo/components/AddTodo";
import TodoList from "@/pages/todo/components/TodoList";
import Pomodoro from "@/pages/pomodoro/pomodoro";
import { useTodos } from "@/hooks/useTodos";
import type { User } from "@/api/auth.api";

interface HomeGridProps {
  user: User | null | undefined;
  isLoading: boolean;
  logout: () => void;
  isLoggingOut: boolean;
}

export default function HomeGrid({
  user,
  isLoading,
  logout,
  isLoggingOut,
}: HomeGridProps) {
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useTodos();

  return (
    <main className="w-full p-6">
      <div className="grid w-full grid-cols-4 grid-rows-[auto_auto_auto] gap-6">

        {/* 1 - Username / Login */}
        <div className="col-start-1 row-start-1 min-w-0">
          {isLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <p className="text-lg font-semibold">
              Welcome, {user.name}
            </p>
          ) : (
            <Login />
          )}
        </div>

        {/* 5 - Logout */}
        <div className="col-start-2 row-start-1 min-w-0">
          {user && (
            <Button
              onClick={() => logout()}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          )}
        </div>

        {/* 8 - Add Todo */}
        <div className="col-start-3 col-span-2 row-start-1 row-span-2 min-w-0">
          <AddTodo />
        </div>

        {/* 3 - User Search */}
        <div className="col-start-1 col-span-2 row-start-2 min-w-0">
          <UserSearch />
        </div>

        {/* 4 - Pomodoro */}
        <div className="col-start-1 col-span-2 row-start-3 min-w-0">
          <Pomodoro />
        </div>

        {/* 9 - Todo List */}
        <div className="col-start-3 col-span-2 row-start-3 min-w-0">
          {todosLoading ? (
            <p>Loading...</p>
          ) : todosError ? (
            <p>{todosError.message}</p>
          ) : (
            <TodoList todos={todos ?? []} />
          )}
        </div>

      </div>
    </main>
  );
}