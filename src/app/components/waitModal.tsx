import Image from 'next/image';
import React from "react";
import { X } from 'lucide-react';

interface WaitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WaitModal: React.FC<WaitModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg  flex justify-center items-center z-50">
            <div className="relative w-[90%] max-w-[800px] h-[450px] bg-blue-200 bg-gradient-to-b from-cyan-500 via-blue-600 to-blue-800  bg-opacity-90  backdrop-blur-md p-8 rounded-xl flex flex-col justify-center items-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:bg-blue-500 rounded-full p-1"
                >
                    <X size={32} />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col items-center">


                    <Image
                        src="/mulbg.jpeg"
                        alt=""
                        width={320}
                        height={0}
                        className="w-[500px] h-auto rounded-lg  shadow-lg"

                        priority
                    />
                    <p className="mt-6  text-lg max-md:text-sm font-light font-mono text-slate-300 tracking-wide">
                        Multiplayer Mode Launching Soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WaitModal;
