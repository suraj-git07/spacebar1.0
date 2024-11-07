import React from "react";
import { X } from 'lucide-react';

interface GameDescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GameDescriptionModal: React.FC<GameDescriptionModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center z-50">
            <div className="relative w-[90%] max-w-[800px] max-sm:w-[380px] max-sm:h-[560px] h-[400px] mx-auto bg-gradient-to-b from-cyan-500 via-blue-600 to-blue-800  bg-opacity-90 rounded-lg p-6 shadow-lg flex flex-col items-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:bg-blue-500 p-2 rounded-full"
                >
                    <X size={24} className="text-white" />
                </button>
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-gray-300 text-2xl font-semibold font-mono text-center">
                        Welcome to SpaceBar!
                    </h2>
                    <p className="text-gray-300 mt-4 text-center text-lg max-md:text-sm font-light font-mono">
                        SpaceBar is an exciting arcade game where you control a bird navigating through a series of pipes. Score points by dodging these obstacles, and in return, earn ZON tokens based on your score! Challenge yourself to fly as far as possible while avoiding collisions and climbing the leaderboard.
                    </p>

                    <h2 className="text-gray-300 text-2xl mt-6 font-semibold font-mono text-center">
                        How to Play?
                    </h2>
                    <p className="text-gray-300 mt-4 text-center text-lg max-md:text-sm font-light font-mono">
                        First, connect your wallet to get started! Then, tap the Spacebar or the screen to keep your bird flying and dodge the pipes. Stay alive for as long as you can to maximize your score and earn more ZON tokens!
                    </p>

                </div>
            </div>
        </div>
    );
};

export default GameDescriptionModal;
