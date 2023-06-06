import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import { useState, useEffect } from "react";
import { getDeviceType } from './utils/checkDevice'
import Header from "./components/Header/Header";
import { RequiresAuth } from "./utils/RequiresAuth";

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const device = getDeviceType()
    if(device == "mobile") {
        setIsMobile(true)
    }
    else if(device == "tablet") {
        setIsMobile(true)
    }
    else {
        setIsMobile(false)
    }
    
    window.addEventListener('resize', () => {
        const device = getDeviceType()
        if(device == "mobile") {
            setIsMobile(true)
        }
        else if(device == "tablet") {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    })
  }, [])

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductPage />} />
        <Route 
          path="/cart" 
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
        } 
        />
        <Route path="/mock-api" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App; 
