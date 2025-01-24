import React from "react";
import { motion } from "framer-motion";

const Home = () => {
	const username = localStorage.getItem("username");

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2, // Delay between animations
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	// Array of objects with unique content for each card
	const cards = [
		{
			id: 1,
			title: "Symptom analysis",
			content: "give a description of the symptoms, and some possible causes. ",
			link: "/symptoms",
		},
		{
			id: 2,
			title: "Osteoarthritis analysis",
			content: "This, takes in an x-ray image of the knee and gives the case number in the KL-grading. ",
			link: "/osteoarthritis",
		},
		{
			id: 3,
			title: "Analisis and summary",
			content: "gives a patient and doctor summary and takes in case, condition and symtoms. ",
			link: "/summary",
		},
	];

	return (
		<div className="container">
			<h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-900 mb-4">Welcome, {username}!</h1>
			<p className="text-center text-gray-200 dark:text-gray-800 mb-8">what feature would you like to use today?</p>

			<motion.div
				className="card-grid"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{cards.map((card) => (
					<motion.div
						key={card.id}
						className="card"
						variants={cardVariants}
					>
						<h3>
							<a href={card.link}>
								{card.title}
							</a>
						</h3>
						<p>{card.content}</p>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default Home;