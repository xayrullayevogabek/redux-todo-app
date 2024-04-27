import { ToDo } from "@/redux/todoSlice";

export const setItem = (key: string, todo: ToDo[]) =>
  localStorage.setItem(key, JSON.stringify(todo));

export const getItem = (key: string) => localStorage.getItem(key);
