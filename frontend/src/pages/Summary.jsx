import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import api from '../api';

const Symptoms = () => {
    const [symptoms, setSymptoms] = useState('');
    const [doctorRecommendations, setDoctorRecommendations] = useState('');
    const [caseCondition, setCaseCondition] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!symptoms.trim() || !doctorRecommendations.trim() || !caseCondition.trim()) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/summary/', { symptoms, doctorRecommendations, caseCondition });
            setSummary(response.data.summary || "");
        } catch (error) {
            setError('Something went wrong, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg"  // Increased form width
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Patient and Doctor Summary</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symptoms">
                            Symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            rows="5"
                            placeholder="Put the symptoms here..."
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorrecommendations">
                            Doctor Recommendations
                        </label>
                        <textarea
                            id="doctorrecommendations"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={doctorRecommendations}
                            onChange={(e) => setDoctorRecommendations(e.target.value)}
                            rows="5"
                            placeholder="Put the doctor recommendations here..."
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="case">
                            Case and Condition
                        </label>
                        <textarea
                            id="case"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={caseCondition}
                            onChange={(e) => setCaseCondition(e.target.value)}
                            rows="5"
                            placeholder="Put the case and condition here..."
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : 'Submit'}
                        </button>
                    </div>
                </form>

                {error && (
                    <motion.div
                        className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.div>
                )}

                {summary && (
                    <motion.div
                        className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ReactMarkdown className="markdown-summary">
                            {summary}
                        </ReactMarkdown>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Symptoms;