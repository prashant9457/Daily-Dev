import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLogin();
  const queryClient = useQueryClient();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["currentUser"],
          });
        },
      }
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isPending ? (
            <Spinner />
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}