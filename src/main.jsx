import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SignInPage from "./auth/SignInPage.jsx";
import SignUpPage from "./auth/SignUpPage.jsx";
import { DashboardPage, HomePage, AddNewExpense } from "./pages/index.js";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/incomes" element={<DashboardPage />} />
        <Route path="/dashboard/budgets" element={<DashboardPage />} />
        <Route path="/dashboard/expenses" element={<DashboardPage />} />
        <Route path="/dashboard/upgrade" element={<DashboardPage />} />
        <Route
          path="/dashboard/expenses/:budgetId"
          element={<AddNewExpense />}
        />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}>
        <Toaster />
      </RouterProvider>
    </ClerkProvider>
  </StrictMode>
);
