"use client";
import React, { useState } from "react";
import GameModal from "./GameModal";
import WaitModal from "./waitModal";
import GameDescriptionModal from "./GameDescModal";
import Image from 'next/image';

const HeroSection = () => {
  // const [modal, setmodal] = useState(false);
  // const [create, setcreate] = useState(true);
  // const [value, setValue] = useState<number>(0);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [multiplayerModal, setMultiplayerModal] = useState(false);
  const [descModal, setDescModal] = useState(true);


  // const handleIncrement = () => {
  //   setValue(value + 100);
  // };
  // const handleDecrement = () => {
  //   setValue(Math.max(value - 100, 0));
  // };

  return (
    <div className="bg-[url('../../public/homebg.jpg')] w-full h-[108vh] bg-center bg-cover max-md:h-[130vh] ">
      <div className="pt-20 w-10/12 m-auto flex justify-around h-screen max-md:flex-col">
        <div className="bg-[#ffffff60] my-auto rounded-xl text-center shadow-lg w-[350px] max-md:w-[300px] max-md:mx-auto max-md:mt-10">
          <Image
            src="/multi.png"
            alt=""
            width={220}
            height={0}
            className="mx-auto my-5 max-md:w-[200px]"
            sizes="(max-width: 768px) 200px, 220px"
            priority
          />
          <button
            onClick={() => setMultiplayerModal(true)}
            className="bg-slate-900 text-gray-300 m-auto flex mb-8 py-3 justify-center rounded-xl w-10/12 uppercase font-regular font-mono text-2xl max-md:text-xl"
          >
            Play with Friends
          </button>
        </div>
        <div className="bg-[#ffffff60] my-auto rounded-xl text-center shadow-lg w-[350px] max-md:w-[300px] max-md:mx-auto max-md:my-10">
          <Image
            src="/solo.png"
            alt=""
            width={220}
            height={0}
            className="mx-auto my-5 max-md:w-[180px]"
            sizes="(max-width: 768px) 180px, 220px"
            priority
          />
          <button
            onClick={() => setGameModalOpen(true)}
            className="bg-slate-900 m-auto text-gray-300 font-mono  flex mb-8 py-3 justify-center rounded-xl w-10/12 uppercase font-regular text-2xl mx-auto max-md:text-xl"
          >
            Play solo
          </button>
        </div>
      </div>

      {/* ========== Modal for Play with Friends ============ */}

      {/* <div>
        <div
          className={`${!modal ? "hidden" : ""
            } w-full h-screen fixed top-0 right-0 bg-[#00000086] uppercase`}
        >
          <div className="bg-[#13120D] m-auto w-[350px] h-[500px] flex flex-col justify-between my-32 rounded-xl">
            <div className="flex flex-col justify-between">
              <div className="flex bg-black justify-between py-4 px-10 rounded-t-xl">
                <p
                  onClick={() => setcreate(true)}
                  className={`${!create ? "text-[#6D6969]" : "font-[700]"
                    } cursor-pointer`}
                >
                  Create
                </p>
                <p
                  onClick={() => setcreate(false)}
                  className={`${create ? "text-[#6D6969]" : "font-[700]"} cursor-pointer`}
                >
                  Join
                </p>
              </div>

              <div className={`${create ? "" : "hidden"}`}>
                <p className={`text-center py-8 text-2xl`}>select lobby fee</p>
                <div className={`flex justify-around py-6`}>
                  <img
                    onClick={handleDecrement}
                    src="Minus.png"
                    alt=""
                    className="my-auto w-[40px] cursor-pointer"
                  />
                  <img src="diamond.png" alt="" className="w-[160px]" />
                  <img
                    onClick={handleIncrement}
                    src="Plus.png"
                    alt=""
                    className="my-auto w-[40px] cursor-pointer"
                  />
                </div>
                <input
                  type="number"
                  value={value}
                  className="w-1/2 m-auto flex text-center rounded py-1 text-black px-5"
                />
              </div>
              <div className={`${!create ? "" : "hidden"}`}>
                <p className={`text-center py-8 text-2xl`}>enter lobby code</p>
                <input
                  type="text"
                  className="w-1/2 m-auto flex text-center rounded py-1 text-black px-5"
                />
              </div>
            </div>

            <div className="flex flex-col m-3 ">
              <button
                onClick={() => setmodal(false)}
                className="py-1 mt-2 w-1/2 m-auto bg-[#342F2C] uppercase border border-white rounded-lg"
              >
                Next
              </button>
              <button
                onClick={() => setmodal(false)}
                className="py-1 mt-2 w-1/2 m-auto bg-[#342F2C] uppercase border border-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <WaitModal isOpen={multiplayerModal} onClose={() => setMultiplayerModal(false)} />
      <GameModal isOpen={gameModalOpen} onClose={() => setGameModalOpen(false)} />
      <GameDescriptionModal isOpen={descModal} onClose={() => setDescModal(false)} />
    </div>
  );
};

export default HeroSection;
