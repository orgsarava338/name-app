import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

import NavBar from "./components/Nav"
import Footer from "./components/Footer"
import NameProvider from "./context/NameContext"
import AuthProvider from "./context/AuthContext"
import { Helmet } from "react-helmet"

export default function App() {

  const queryClient = new QueryClient()

  return (
    <Container>
        <Helmet>
          <title>பெயர் செயலி</title>
        </Helmet>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
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
                  
                  <Route path="*" element={<h1>404</h1>} />
                </Routes>

                <Footer />
              </NameProvider>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
    </Container>
  )
}