import ReactDOM from "react-dom";
import { Layout } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ARCHIVED_ROUTE,
  CALL_DETAILS_ROUTE,
  HOMEPAGE_ROUTE,
} from "./constants/routes";
import { ArchivedPage, CallDetailsPage, Homepage } from "./pages";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout showBackButton={false} />}>
            <Route path={HOMEPAGE_ROUTE} element={<Homepage />} />
            <Route path={ARCHIVED_ROUTE} element={<ArchivedPage />} />
          </Route>
          <Route element={<Layout showFooter={false} showBackButton />}>
            <Route path={CALL_DETAILS_ROUTE} element={<CallDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
