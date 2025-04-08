import UrlProvider from "./context";
import Pages from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NeedAuth from "./components/NeedAuth";
function App() {
  const { Auth, Dashboard, Landing, Layout, Redirect, Link } = Pages;
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
          element: (
            <NeedAuth>
              <Dashboard />
            </NeedAuth>
          ),
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
          element: (
            <NeedAuth>
              <Link />
            </NeedAuth>
          ),
        },
      ],
    },
  ]);
  return (
    <UrlProvider>
      <RouterProvider router={appRouter} />
    </UrlProvider>
  );
}

export default App;
