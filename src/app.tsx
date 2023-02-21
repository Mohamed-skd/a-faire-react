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
import Error from "./components/incs/incs.js";
import PageNav from "./components/incs/navs.js";
import { store } from "./utils/ts/types.js";
import "./style.scss";

function Page() {
  return (
    <>
      <PageHeader />
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
      </Route>
    </Route>
  )
);

// STATE MANAGER
export const useStore = create<store>((set) => ({}));
