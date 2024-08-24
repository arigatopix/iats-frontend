import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import { StyleSheetManager } from "styled-components";
import ProtectedRoute from "./ui/ProtectedRoute";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Project from "./pages/Project";
import ProjectCreate from "./pages/ProjectCreate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StyleSheetManager shouldForwardProp={prop => prop !== "variation"}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="tickets" />}></Route>
              <Route path="projects" element={<Projects />}></Route>
              <Route path="projects/create" element={<ProjectCreate />}></Route>
              <Route path="projects/:projectId" element={<Project />}></Route>
              <Route path="tickets" element={<Tickets />}></Route>
              <Route path="tickets/:ticketId" element={<Ticket />}></Route>
              {/* OLD 
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="account" element={<Account />}></Route>
              */}
            </Route>

            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </StyleSheetManager>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
