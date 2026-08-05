import { useTodos } from "../../hooks/useTodos";
import { Card, CardContent, CardDescription } from "../../components/ui/card";
import AddTodo from "./components/AddTodo";

export default function Todo() {
  const { data, isLoading, error } = useTodos();

  if(isLoading) {
    return <> Loading ... </>
  }

  if(error) {
    return <> {error as Error}</>
  }

  return (

    <>
      <h1 className="text-4xl font-bold text-center mb-8"> Todo Application </h1>
      <AddTodo></AddTodo>
      <div className="max-w-3xl mx-auto mb-8">  
        {
          data?.map((todo) => {
            return (
              <Card className="rounded-lg mb-3">
                <CardContent>
                    {todo.title}
                </CardContent>
                <CardDescription className="mb-2"> {todo.description} </CardDescription>
                {(todo.completed)?<>completed</> : <>not done</>}
              </Card> 
            );
          })
        }

      </div>
    </>
  );
}