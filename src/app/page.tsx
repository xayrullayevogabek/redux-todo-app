import AddTodo from "./components/add-todo";
import TodoList from "./components/todo-list";

export default function Home() {
  return (
    <div className=" w-full h-screen flex justify-center items-start py-10">
      <div className=" w-full px-40">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
