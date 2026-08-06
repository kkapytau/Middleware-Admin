import { createBrowserRouter, Navigate } from "react-router";

import { ProtectedLayout } from "@/app/layouts/ProtectedLayout";
import { PublicLayout } from "@/app/layouts/PublicLayout";
import { appRoutes } from "@/app/routes";

import { buildRouteObjects } from "./buildRouteObjects";

const publicRoutes = buildRouteObjects(appRoutes.filter((route) => route.access === "public"));

const protectedRoutes = buildRouteObjects(
    appRoutes.filter((route) => route.access === "protected"),
);

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: publicRoutes,
    },
    {
        element: <ProtectedLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/location/airports" replace />,
            },
            ...protectedRoutes,
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);
