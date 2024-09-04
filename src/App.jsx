import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { StyleSheetManager } from "styled-components";
import ProtectedRoute from "./ui/ProtectedRoute";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Project from "./pages/Project";
import ProjectCreate from "./pages/ProjectCreate";
import AdminAndManagerRoute from "./ui/AdminAndManagerRoute";

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
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="tickets" />}></Route>
              <Route
                path="projects"
                element={
                  <AdminAndManagerRoute>
                    <Projects />
                  </AdminAndManagerRoute>
                }
              ></Route>
              <Route
                path="projects/create"
                element={
                  <AdminAndManagerRoute>
                    <ProjectCreate />
                  </AdminAndManagerRoute>
                }
              ></Route>
              <Route
                path="projects/:projectId"
                element={
                  <AdminAndManagerRoute>
                    <Project />
                  </AdminAndManagerRoute>
                }
              ></Route>
              <Route path="tickets" element={<Tickets />}></Route>
              <Route path="tickets/:ticketId" element={<Ticket />}></Route>
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
