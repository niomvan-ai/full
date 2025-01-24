import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import api from '../api';

const Osteoarthritis = () => {
    const [files, setFiles] = useState([]);
    const [caseNo, setCaseNo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    // Cleanup object URLs when files change or component unmounts
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleRemoveFile = (file) => {
        setFiles(files.filter(f => f.name !== file.name));
        URL.revokeObjectURL(file.preview);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 

        const formData = new FormData();
        files.forEach(file => {
            formData.append("images", file);
        });

        try {
            const response = await api.post("osteoarthritis/", formData);

            const result = await response;
            setCaseNo(result.data.case_no); // Store case number once response is successful
            console.log("Case No:", result.data.case_no);
        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setIsSubmitting(false); // Re-enable the button after submission
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
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-4 border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-100 transition duration-300">
                    <input {...getInputProps()} />
                    <p className="text-gray-600">Drag and drop some files here, or click to select files from your computer.</p>
                </div>
                <div className="mt-4">
                    {files.map(file => (
                        <div key={file.name} className="mt-2 flex items-center justify-between">
                            <img src={file.preview} alt={file.name} className="w-16 h-16 rounded-md object-cover" />
                            <button onClick={() => handleRemoveFile(file)} className="text-red-500 ml-2 hover:text-red-700 transition duration-200">Remove</button>
                        </div>
                    ))}
                </div>

                {caseNo && (
                    <div className="mt-4 text-center p-4 bg-green-100 text-green-700 rounded-lg border border-green-300">
                        <p className="text-sm">Suggested Case No for osteoarthritis in Kellgren-Lawrence grade: <strong>{caseNo}</strong></p>
                        <p className="text-xs italic">This is a suggestion; you can edit it if needed.</p>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    className={`mt-4 bg-blue-500 text-white p-2 rounded-lg w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-200`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Osteoarthritis;