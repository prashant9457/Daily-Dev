import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Button className="w-64" onClick={() => navigate("/todo")}>
        todo App
      </Button>
      <Button className="w-64" onClick={() => navigate('/pomodoro')}>pomodoro</Button>
      <Button className="w-64">Login</Button>
      <Button className="w-64">mini project 2</Button>
    </div>
  );
}
