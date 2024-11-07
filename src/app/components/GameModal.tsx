import React from "react";
import SpaceBarGame from "./SpaceBarGame";

interface GameModalProps {
    isOpen: boolean;
    difficulty: 'easy' | 'medium' | 'hard' | null;
    onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, difficulty, onClose }) => {
    if (!isOpen) return null;

    const difficultyLevel = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 4 : 6;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-hidden">
            <div className="relative w-full h-full mx-auto bg-gray-800 bg-opacity-80 rounded-md backdrop-blur-md shadow-lg overflow-hidden">
                {/* <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-blue-400 transition duration-200"
                >
                    <X size={24} className="text-white" />
                </button> */}
                <div className="flex flex-col items-center h-full">
                    <SpaceBarGame difficulty={difficultyLevel} onClose={onClose} />
                </div>
            </div>
        </div>
    );
};

export default GameModal;
