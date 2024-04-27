import { getItem, setItem } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const storedTodos = getItem("todos");
const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];

export interface ToDo {
  uid: string;
  text: string;
  date: string;
  time: string;
  completed: boolean;
}

interface ToDoState {
  todos: ToDo[];
}

const initialState: ToDoState = {
  todos: initialTodos,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todos = [...state.todos, action.payload];
      setItem("todos", state.todos);
    },
    deleteToDo: (state, action) => {
      const filteredData = state.todos.filter(
        (item) => item.uid !== action.payload.uid
      );

      state.todos = filteredData;
      setItem("todos", state.todos);
    },
    editToDo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((item) => item.uid === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.date = new Date().toDateString();
        todo.time = new Date().toTimeString();
      }
      setItem("todos", state.todos);
    },
    toggleToDo: (state, action) => {
      const todo = state.todos.find((item) => item.uid === action.payload.uid);
      if (todo) {
        todo.completed = !todo.completed;
      }
      setItem("todos", state.todos);
    },
  },
});

export const { addToDo, deleteToDo, editToDo, toggleToDo } = todoSlice.actions;

export default todoSlice.reducer;
