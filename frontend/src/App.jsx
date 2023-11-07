import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root, { rootLoader } from "./pages/Root";
import Dashboard, { dashboardAction } from "./pages/Dashboard";
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        action: dashboardAction,
        errorElement: <ErrorBoundaryPage />,
      },
    ],
  },
  ,
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
