import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Layout() {
    const [animate, setAnimate] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");

    useEffect(() => {
        setAnimate(true);

        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { width, height } = currentTarget.getBoundingClientRect();

            // Calculate percentage position relative to the container
            const xPercent = (clientX / width) * 100;
            const yPercent = (clientY / height) * 100;

            setBackgroundPosition(`${xPercent}% ${yPercent}%`);
        };

        // Add event listener to the backdrop
        const backdrop = document.getElementById("backdrop");
        backdrop.addEventListener("mousemove", handleMouseMove);

        return () => {
            backdrop.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="w-full bg-black dark:bg-gray-200 shadow-md py-4 px-6 flex items-center">
                <h1 className="text-xl font-bold text-gray-200 dark:text-gray-900">niomvan.ai</h1>
                <div className="flex space-x-4 ml-2">
                    <Link to="/" className="text-gray-300 dark:text-gray-700 hover:text-teal-500 dark:hover:text-teal-400">Home</Link>
                    <Link to="/about" className="text-gray-300 dark:text-gray-700 hover:text-teal-500 dark:hover:text-teal-400">About Us</Link>
                    <Link to="/logout" className="text-gray-300 dark:text-gray-700 hover:text-teal-500 dark:hover:text-teal-400">Logout</Link>
                </div>
            </nav>

            {/* Global Background Effect Container */}
            <div
                id="backdrop"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(56, 189, 248, 0.4), rgba(136, 84, 208, 0.4)),
                        radial-gradient(circle at ${backgroundPosition}, 
                            rgba(255, 105, 180, 0.6),  /* Hot pink with opacity */
                            rgba(136, 84, 208, 0.2))  /* Soft purple edge fade */
                    `,
                    backgroundBlendMode: "overlay",
                }}
                className="min-h-screen flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-transform"
            >
                {/* Render the page content here */}
                <main className="flex-grow pb-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
