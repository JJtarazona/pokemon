import "./App.css";
// Router DOM
import { Routes, Route } from "react-router-dom";
import PathRoutes from "./Helpers/Routes.Helpers";

// Components
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import FormPoke from "./components/FormPoke/FormPoke";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={PathRoutes.LANDINGPAGE} element={<Landing />} />
        <Route path={PathRoutes.HOME} element={<Home />} />
        <Route path={PathRoutes.FORM} element={<FormPoke />} />
        <Route path={PathRoutes.DETAIL} element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
