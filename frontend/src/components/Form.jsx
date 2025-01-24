import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { motion } from "framer-motion";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setUsernameError("");

        try {
            const res = await api.post(route, { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access || res.data.tokens.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh || res.data.tokens.refresh);
            localStorage.setItem("username", username);
            
            navigate("/");
        } catch (error) {
            console.error("Error during submission:", error.response?.data || error.message);

            if (error.response?.data?.username) {
                setUsernameError("The username is already taken.");
            } else {
                alert(error.response?.data?.detail || "An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray100 rounded-xl shadow-2xl border-t-4 border-teal-400 max-w-md w-full sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto"
            initial={{ opacity: 0, y: -50 }} // Starts from top and invisible
            animate={{ opacity: 1, y: 0 }} // Ends at normal position with full opacity
            transition={{ duration: 0.5 }} // Animation duration
        >
            <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-900 mb-4">
                <span className="border-b-4 border-teal-500 dark:border-teal-400">{name}</span>
            </h1>

            <div className="flex flex-col space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-400 dark:text-gray-700">
                    Username
                </label>
                <input
                    id="username"
                    className="border border-gray-300 dark:border-gray-600 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 nightowl-daylight"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
                {usernameError && (
                    <p className="text-sm text-red-500 mt-1">{usernameError}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-400 dark:text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    className="border border-gray-300 dark:border-gray-600 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 nightowl-daylight"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
            </div>

            {loading && <div className="loader mx-auto"></div>}

            <button
                disabled={loading}
                className={`w-full bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform 
                    ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                type="submit"
            >
                {loading ? "Submitting..." : name}
            </button>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-400 dark:text-gray-700">
                    {method === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <span
                        className="text-teal-500 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-500 cursor-pointer ml-1"
                        onClick={() =>
                            navigate(method === "login" ? "/register" : "/login")
                        }
                    >
                        {method === "login" ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </motion.form>
    );
}

export default Form;
