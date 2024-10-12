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
            <div className="relative w-[90%] max-w-[800px] max-sm:w-[380px] max-sm:h-[560px] h-[400px] mx-auto bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg flex flex-col items-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:bg-gray-700 p-2 rounded-full"
                >
                    <X size={24} className="text-white" />
                </button>
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-gray-300 text-2xl font-semibold font-mono text-center">
                        Welcome to SpaceBar!
                    </h2>
                    <p className="text-gray-300 mt-4 text-center text-lg max-md:text-sm font-light font-mono">
                        SpaceBar is a fun arcade space adventure where players control an astronaut navigating through a path filled with lasers. You can play alone in Solo Play or join your friends in Multiplayer mode for some friendly competition. Connect your MetaMask wallet to get started and use in-game currency (gems) to join the action. Dodge the lasers, take on exciting challenges, and compete to win gems in this thrilling space journey!
                    </p>

                    <h2 className="text-gray-300 text-2xl mt-6 font-semibold font-mono text-center">
                        How to Play ?
                    </h2>
                    <p className="text-gray-300 mt-4 text-center text-lg max-md:text-sm font-light font-mono">
                        Press the Spacebar or tap the screen to keep your astronaut flying and dodge the lasers. Stay alive as long as possible to win gems!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameDescriptionModal;
