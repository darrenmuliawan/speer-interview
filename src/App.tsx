import ReactDOM from "react-dom";
import { Layout } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOMEPAGE_ROUTE } from "./constants/routes";
import { Homepage } from "./pages";
import "./index.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={HOMEPAGE_ROUTE} element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
