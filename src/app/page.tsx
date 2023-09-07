import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "./component/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function deleteTodo(id: string) {
  "use server";

  await prisma.todo.delete({ where: { id } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href={"/new"}
          className="rounded border border-slate-300 px-2 py-1 text-slate-300
          outline-none focus-within:bg-slate-700 hover:bg-slate-700"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
