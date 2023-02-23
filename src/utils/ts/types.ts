import { MouseEventHandler } from "react";

export type routeError = {
  statusText?: string;
  message?: string;
};

export type task = {
  id: string;
  content: string;
  completed: boolean;
  category: string;
};

export type tasks = task[] | [];

export type navStore = {
  visibleNav: boolean;
  hideNav: Function;
  toggleNav: MouseEventHandler;
};
export type taskStore = {
  todoList: tasks;
  addTodo: Function;
  deleteTodo: Function;
  updateTodo: Function;
};
