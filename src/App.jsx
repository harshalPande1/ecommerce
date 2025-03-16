import Login from "./components/auth/login"
import Register from "./components/auth/register"
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "../store";
import PlaceOrder from "./components/Order/PlaceOrder";

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route path="/" element={<Layout />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* llayout routes */}
              <Route path="/placeOrder" element={<PlaceOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
