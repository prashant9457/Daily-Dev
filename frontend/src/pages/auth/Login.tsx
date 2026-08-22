import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            {email, password},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["currentUser"],
                    });
                }
            }
        );
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-5">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input type="password" value={password} placeholder="Password" onChange={(p) => setPassword(p.target.value)}/>
                
                {
                    isPending ? 
                    ( <Spinner/> ) :
                    ( <Button type="submit">Login</Button> )
                }
            </form>
        </Card>
    )
}