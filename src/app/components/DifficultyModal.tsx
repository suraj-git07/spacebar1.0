
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
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg w-80 text-center text-white font-mono">
                <h2 className="text-2xl font-medium font-mono mb-4">Select Difficulty</h2>
                <div className="flex justify-around space-x-4">
                    <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('medium')}
                        className="px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
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
