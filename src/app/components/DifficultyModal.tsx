
import React from 'react';

interface DifficultyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({ isOpen, onClose, onSelectDifficulty }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className=" bg-gradient-to-b from-cyan-500 via-blue-600 to-blue-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-80 text-center text-white font-mono">
                <h2 className="text-2xl font-medium font-mono mb-4">Select Difficulty</h2>
                <div className="flex justify-around space-x-4">
                    {/* <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Easy
                    </button> */}

                    <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="relative z-30 inline-flex items-center shadow-lg shadow-gray-800 justify-center w-auto px-8 py-3 overflow-hidden font-bold text-gray-500 transition-all duration-500 border mb-5 border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white font-regular font-mono text-xl max-md:text-xl"
                    >
                        <span className="w-full h-0.5 absolute bottom-0 left-0 bg-gray-100 group-active:bg-transparent"></span>
                        <span className="h-full w-0.5 absolute bottom-0 right-0 bg-gray-100 group-active:bg-transparent"></span>
                        Easy
                    </button>
                    {/* <button
                        onClick={() => onSelectDifficulty('medium')}
                        className="px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Medium
                    </button> */}

                    <button
                        onClick={() => onSelectDifficulty('medium')}
                        className="relative z-30 inline-flex items-center shadow-lg shadow-gray-800 justify-center w-auto px-8 py-3 overflow-hidden font-bold text-gray-500 transition-all duration-500 border mb-5 border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white font-regular font-mono text-xl max-md:text-xl"
                    >
                        <span className="w-full h-0.5 absolute bottom-0 left-0 bg-gray-100 group-active:bg-transparent"></span>
                        <span className="h-full w-0.5 absolute bottom-0 right-0 bg-gray-100 group-active:bg-transparent"></span>
                        Medium
                    </button>
                    {/* <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Hard
                    </button> */}

                    <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden shadow-lg shadow-gray-800 font-bold text-gray-500 transition-all duration-500 border mb-5 border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white font-regular font-mono text-xl max-md:text-xl"
                    >
                        <span className="w-full h-0.5 absolute bottom-0 left-0 bg-gray-100 group-active:bg-transparent"></span>
                        <span className="h-full w-0.5 absolute bottom-0 right-0 bg-gray-100 group-active:bg-transparent"></span>
                        Hard
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 text-gray-400 underline hover:text-gray-200 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DifficultyModal;
