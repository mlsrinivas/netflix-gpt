import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/loader";

const LoginComponent = React.lazy(() => import('./views/login'));
const DashboardComponent = React.lazy(() => import('./views/dashboard'));

export const Navigations = () => {
  
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LoginComponent />
        },
        {
            path: '/dashboard',
            element: <DashboardComponent />,
        }
    ])

    return(
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}