import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Names from "./pages/Names"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

export default function App() {
  return (
    <>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/names" element={<Names />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}