import { useState } from "react";

import "./App.css";
import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/Home/Home";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/header/Header";
import CreatePosts from "./components/create/CreatePosts";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};

function App() {
  const [isAuthenticated, isUserAutenticated] = useState(false);
  //pass isAutenticated in Login Component because inside login component we need to authenticate the user.

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAutenticated={isUserAutenticated} />}
            />

            {/* Private Route */}
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
            {/* Private Route ends here */}
            {/* Private Route */}
            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePosts />} />
            </Route>
            {/* Private Route ends here */}
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
