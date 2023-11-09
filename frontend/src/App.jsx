import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";
import Login, { loginAction } from "./pages/Login";
import Register, { registerAction } from "./pages/Register";
import { useStore } from "./store";
import logoutAction from "./actions/logout";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const getUser = useStore((store) => store.getUser);
  const signup = useStore((store) => store.signup);
  const login = useStore((store) => store.login);
  const logout = useStore((store) => store.logout);
  const createBudget = useStore((store) => store.createBudget);
  const clearState = useStore((store) => store.clearState);
  const clearTokens = useStore((store) => store.clearTokens);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorBoundaryPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader({ getUser }),
          action: dashboardAction({ createBudget }),
          errorElement: <ErrorBoundaryPage />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction({ login }),
          errorElement: <ErrorBoundaryPage />,
        },
        {
          path: "/signup",
          element: <Register />,
          action: registerAction(signup),
          errorElement: <ErrorBoundaryPage />,
        },
        {
          path: "/logout",
          action: logoutAction(logout, clearState, clearTokens),
        },
      ],
    },
    ,
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
