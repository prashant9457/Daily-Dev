import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/userCurrentUser";
import Login from "../auth/Login";

export default function Home() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {
        isLoading ? 
        (<p>Loading...</p>) :  user ? 
        (<p>Welcome, {user.name}</p>) :
        (<Login />)
      }
      <div className="w-64">
        <Button onClick={() => navigate("/todo")}>Todo App</Button>
        <Button onClick={() => navigate("/pomodoro")}>Pomodoro</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button>Mini project 2</Button>
      </div>
    </div>
  );
}