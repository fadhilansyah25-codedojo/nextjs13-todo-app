"use client";

import { useRouter } from "next/navigation";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
};

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    deleteTodo(id);
    router.refresh();
  };

  return (
    <li className="flex items-center gap-1">
      <input
        type="checkbox"
        id={id}
        className="peer cursor-pointer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:text-slate-500 peer-checked:line-through"
      >
        {title}
      </label>
      <button
        className="text-sm text-slate-500 hover:text-red-500 hover:underline"
        onClick={() => handleDelete(id)}
      >
        delete
      </button>
    </li>
  );
}
