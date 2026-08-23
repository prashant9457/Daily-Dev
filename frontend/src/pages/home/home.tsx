import { useCurrentUser } from "../../hooks/userCurrentUser";
import { useLogout } from "@/hooks/useLogout";
import HomeGrid from "./HomeGrid";

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();

  const {
    mutate: logout,
    isPending,
  } = useLogout();

  return (
    <HomeGrid
      user={user}
      isLoading={isLoading}
      logout={logout}
      isLoggingOut={isPending}
    />
  );
}