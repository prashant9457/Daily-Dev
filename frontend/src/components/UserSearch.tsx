import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useUsersPresence } from "@/hooks/useUsersPresence";
import type { User } from "@/api/auth.api";

export default function UserSearch() {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedUsername = useDebounce(username, 300);

  const {
    data,
    isLoading,
    error,
  } = useUserSearch(debouncedUsername);

  const userIds = data?.map((user) => user._id) ?? [];

  const {
    data: presenceData,
    isLoading: presenceLoading,
  } = useUsersPresence(userIds);

  const presenceMap = new Map(
    presenceData?.map((presence) => [
      presence.userId,
      presence.online,
    ])
  );

  return (
    <div className="w-full space-y-4">
      
      <div>
        <h2 className="text-lg font-semibold">
          Find a user
        </h2>

        <p className="text-sm text-muted-foreground">
          Search for someone to connect with.
        </p>
      </div>

      
      <input
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search username..."
      />

      {selectedUser && (
        <div className="rounded-lg bg-muted p-3 text-sm">
          Selected: @{selectedUser.username}
        </div>
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Searching...
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">
          Something went wrong
        </p>
      )}

      <div className="space-y-2">
        {data?.map((user) => {
          const online = presenceMap.get(user._id);

          return (
            <button
              key={user._id}
              type="button"
              onClick={() => setSelectedUser(user)}
              className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition hover:bg-muted"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  @{user.username}
                </p>
              </div>

              {presenceLoading ? (
                <span className="text-xs text-muted-foreground">
                  Checking...
                </span>
              ) : (
                <span
                  className={`text-xs ${
                    online
                      ? "text-green-500"
                      : "text-muted-foreground"
                  }`}
                >
                  ● {online ? "Online" : "Offline"}
                </span>
              )}
            </button>
          );
        })}
      </div>


    </div>
  );
}