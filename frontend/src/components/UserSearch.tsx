import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserSearch } from "@/hooks/useUserSearch";
import type { User } from "@/api/auth.api";

export default function UserSearch() {
  const [username, setUsername] = useState("");

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

      {data?.map((user : User) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>@{user.username}</p>
        </div>
      ))}
    </div>
  );
}