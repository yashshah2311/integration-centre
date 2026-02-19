import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { IntegrationsPage } from "../features/integrations/IntegrationsPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Navigate to="/settings/integrations" replace /> },
      { path: "/settings/integrations", element: <IntegrationsPage /> },
    ],
  },
]);
