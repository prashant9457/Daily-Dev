import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserSearch } from "@/hooks/useUserSearch";
import type { User } from "@/api/auth.api";

export default function UserSearch() {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedUsername = useDebounce(username, 300);

  const { data, isLoading, error } = useUserSearch(debouncedUsername);

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search username"
      />

      {isLoading && <p>Searching...</p>}

      {error && <p>Something went wrong</p>}

      {data?.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
        >
          <p>@{user.username}</p>
        </div>
      ))}

      {selectedUser && (
        <div>
          Selected: @{selectedUser.username}
        </div>
      )}
    </div>
  );
}