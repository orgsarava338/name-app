import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"

import Signup from "./pages/Signup"
import Login from "./pages/Login"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"

import NameFeed from "./pages/name/NameFeed"
import NamePage from "./pages/name/NamePage"
import NameAdd from "./pages/name/NameAdd"
import NameEdit from "./pages/name/NameEdit"

import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import Disclaimer from "./pages/Disclaimer"

import Error from "./pages/Error"

import NavBar from "./components/Nav"
import Footer from "./components/Footer"

import NameProvider from "./context/NameContext"

export default function App() {

  return (
    <Container>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <NameProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/:name" element={<NamePage /> } />
            <Route path="/name" element={<NameFeed />} />
            <Route path='/name/add' element={<NameAdd />} />
            <Route path="/name/edit/:name" element={<NameEdit />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            
            <Route path="*" element={<Error code="404"><p>Page Not Found</p></Error>} />
          </Routes>

          <Footer />
        </NameProvider>
      </BrowserRouter>
    </Container>
  )
}