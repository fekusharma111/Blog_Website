import "./App.css";
import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
