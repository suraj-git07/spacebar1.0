
import React from "react";
import { X } from 'lucide-react';

interface WaitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WaitModal: React.FC<WaitModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="relative w-[90%] max-w-[800px] h-[450px] bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-xl flex flex-col justify-center items-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-400"
                >
                    <X size={32} />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col items-center">
                    <img
                        src="mulbg.jpeg"
                        alt="Multiplayer"
                        className="w-[500px] h-auto rounded-lg shadow-lg" // Image with rounded corners and shadow
                    />
                    <p className="mt-6 text-xl font-thin font-sans text-slate-300 tracking-wide">
                        Multiplayer Mode Launching Soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WaitModal;
