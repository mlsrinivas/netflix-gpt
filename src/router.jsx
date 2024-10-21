import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/login";
import Dashboard from "./views/dashboard";

export const Navigations = () => {
  
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        }
    ])

    return(
        <RouterProvider router={router}/>
    )
}

