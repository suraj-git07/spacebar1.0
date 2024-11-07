'use client';
import React from 'react'
import Image from 'next/image'
import { ConnectButton } from "thirdweb/react";
import { client, myChain, contract } from "../../../utils/constants";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { ethers } from "ethers";

const Navbar = () => {
  const account = useActiveAccount();

  const { data: userBal, isLoading: loadingUserBal } = useReadContract({
    contract,
    method: "viewBalance",
    params: [account?.address || ""],
  });

  const userBalEth = userBal ? parseFloat(ethers.utils.formatEther(userBal?.toString())).toFixed(2) : 0;

  return (
    <div className='  fixed w-full top-0 left-0'>
      <div className='w-11/12 flex justify-between m-auto py-3'>
        <Image
          src="/Logo.png"
          alt=""
          width={200}
          height={0}
          className="max-md:w-[150px] max-sm:w-[180px]"
          sizes="(max-width: 640px) 180px, (max-width: 768px) 150px, 200px"
          priority
        />
        <div className="flex items-center space-x-4">
          {account ? (
            <>
              {loadingUserBal ? (
                <h4>Loading...</h4>
              ) : (
                <h4 className='font-mono font-semibold max-sm:text-sm'>
                  {userBalEth?.toString()} ZON
                </h4>
              )}
              <ConnectButton client={client} chain={myChain} connectModal={{ size: "compact" }} />
            </>
          ) : (
            <ConnectButton client={client} chain={myChain} connectModal={{ size: "compact" }} />
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
