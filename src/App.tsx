import ReactDOM from "react-dom";
import { Layout } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOMEPAGE_ROUTE } from "./constants/routes";
import { Homepage } from "./pages";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={HOMEPAGE_ROUTE} element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
