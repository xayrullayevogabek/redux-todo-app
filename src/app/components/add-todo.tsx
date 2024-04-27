"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "@/redux/todoSlice";
import { uuid } from "uuidv4";

const AddTodo = () => {
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();

  const onAddTodo = () => {
    if (value.trim() !== "") {
      const newTodo = {
        uid: uuid(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        text: value,
        completed: false,
      };
      dispatch(addToDo(newTodo));
      setValue("");
    }
  };

  return (
    <div className="w-full flex items-center justify-between ">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-5/6 bg-gray-200 py-4 px-4 rounded-md focus:border-none focus:outline-none"
        placeholder="Add Todo..."
      />
      <button
        onClick={onAddTodo}
        className=" bg-green-600 text-white py-3 px-7 rounded-md"
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
