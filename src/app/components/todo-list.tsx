"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deleteToDo, toggleToDo, editToDo, ToDo } from "@/redux/todoSlice";

const TodoList = () => {
  const [editedText, setEditedText] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<string>("");

  const store = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleEdit = (id: string, text: string) => {
    setEditedText(text);
    setEditingIndex(id);
  };

  const handleSaveEdit = (todo: ToDo) => {
    if (editedText.trim() !== "") {
      dispatch(editToDo({ id: todo.uid, text: editedText }));
      setEditedText("");
      setEditingIndex("");
    }
  };

  return (
    <div className="w-full py-10">
      <ul className="flex flex-col gap-5">
        {store.map((todo, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-between bg-gray-200 p-5 rounded-md"
          >
            {editingIndex === todo.uid ? (
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => handleSaveEdit(todo)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSaveEdit(todo);
                  }
                }}
                autoFocus
                className={
                  " focus:outline-none py-2 px-2 w-full mr-2 rounded-md"
                }
              />
            ) : (
              <span className={`${todo.completed ? "line-through" : ""}`}>
                {todo.text}
              </span>
            )}

            <div className=" flex items-center gap-5">
              <button onClick={() => dispatch(toggleToDo(todo))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    todo.completed && "bg-green-500 rounded-full text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <button
                disabled={todo.completed}
                onClick={() => handleEdit(todo.uid, todo.text)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    todo.completed ? "text-gray-500" : " text-orange-400"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button onClick={() => dispatch(deleteToDo(todo))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
