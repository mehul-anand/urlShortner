import Pages from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const { Auth, Dashboard, Landing, Layout, Redirect ,Link } = Pages;
  const appRouter = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/:id",
          element: <Redirect />,
        },
        {
          path: "/link/:id",
          element: <Link />,
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
