import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import { create } from "zustand";
import HomePage from "./components/homepage/homepage.js";
import PageFooter from "./components/incs/footers.js";
import PageHeader from "./components/incs/headers.js";
import Error, { AddTask } from "./components/incs/incs.js";
import PageNav from "./components/incs/navs.js";
import { navStore, task, taskStore } from "./utils/ts/types.js";
import "./style.scss";

function Page() {
  return (
    <>
      <PageHeader />
      <AddTask />
      <PageNav />
      <Outlet />
      <PageFooter />
    </>
  );
}

// ROUTER
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<HomePage />} />
      </Route>
    </Route>
  )
);

// STATE MANAGERS
export const useNavStore = create<navStore>((set) => ({
  visibleNav: false,
  hideNav: () => set((state) => ({ ...state, visibleNav: false })),
  toggleNav: () =>
    set((state) => ({ ...state, visibleNav: !state.visibleNav })),
}));

export const useTaskstore = create<taskStore>((set, get) => ({
  todoList: JSON.parse(localStorage.getItem("todo-list")!) || [],
  addTodo: (task: task) => {
    const newTodos = [...get().todoList, task];
    set((state) => ({ ...state, todoList: newTodos }));
    localStorage.setItem("todo-list", JSON.stringify(newTodos));
  },
  deleteTodo: (id: string) => {
    const newTodos = [...get().todoList].filter((task) => task.id !== id);
    set((state) => ({
      ...state,
      todoList: newTodos,
    }));
    localStorage.setItem("todo-list", JSON.stringify(newTodos));
  },
  updateTodo: (id: string, newTask: task) => {
    let Todos = [...get().todoList];
    let x = 0;
    while (x < Todos.length) {
      if (Todos[x].id === id) {
        Todos[x] = newTask;
      }
      x++;
    }
    set((state) => ({
      ...state,
      todoList: Todos,
    }));
    localStorage.setItem("todo-list", JSON.stringify(Todos));
  },
}));
