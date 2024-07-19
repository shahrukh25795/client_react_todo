import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Users from "./user";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ]);

  return <RouterProvider router={router} />
}

export default App