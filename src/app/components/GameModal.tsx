import React from "react";
import { X } from "lucide-react";

interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-hidden">
            <div className="relative w-full h-full mx-auto bg-gray-800 bg-opacity-80 rounded-md backdrop-blur-md shadow-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition duration-200"
                >
                    <X size={24} className="text-white" />
                </button>
                <div className="flex flex-col items-center h-full">
                    <iframe
                        src="/spaceBar-game/index.html"
                        className="w-[calc(100%-20px)] h-[calc(100%-20px)] mt-2 rounded-lg border-2 border-gray-600 shadow-lg"
                        title="SpaceBar1.0"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
