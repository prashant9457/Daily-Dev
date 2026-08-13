import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pomodoro() {
  const WORK_TIME = 25 * 60;

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const resetTimer = () => {
    setIsRunning(false);
    setTime(WORK_TIME);
  };

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border p-6">
      <h2 className="text-2xl font-semibold">Pomodoro</h2>

      <div className="text-6xl font-bold tabular-nums">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start
            </>
          )}
        </Button>

        <Button variant="destructive" onClick={resetTimer}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
