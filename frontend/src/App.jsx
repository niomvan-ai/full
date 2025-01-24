import react from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Symptoms from "./pages/Symptoms"
import Osteoarthritis from "./pages/Osteoarthritis"
import Summary from "./pages/Summary"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function Logout() {
	localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

	return <Navigate to="/login" />
}

function RegisterAndLogout() {
	localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
	
	return <Register />
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/register" element={<RegisterAndLogout />} />
					<Route path="/about" element={<About />} />
					<Route path="/symptoms" element={<ProtectedRoute><Symptoms /></ProtectedRoute>} />
					<Route path="/osteoarthritis" element={<ProtectedRoute><Osteoarthritis /></ProtectedRoute>} />
					<Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
					<Route path="*" element={<NotFound />} />
				</Route> 
			</Routes>
		</BrowserRouter>
	)
}

export default App
