"use client";

import React from "react";
import Image from "next/image";
import type { NextPage } from "next";

const AboutUsPage: NextPage = () => {
  return (
    <div>
      <div className="bg-base-300/60">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div className="flex flex-col items-center">
            <div className="max-w-[900px] lg:max-w-none">
              <Image src="/tree3.jpeg" alt="Tree along the road" width={900} height={900}></Image>
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center lg:items-end">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 lg:w-3/4 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">decenTREElized</p>
            </div>
            <div className="lg:w-3/4 space-y-5">
              <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
                Small donations that have a social impact!
              </h2>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
                decenTREElized connects farmers and good samaritans using Ethereum smart contracts. Many farmers have
                plots of land that they cannot use for crops, and they therefore cannot make any profit from the land.
                There are also many people who like to help preserve the environment or to improve small communities.
              </p>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:pr-6 ">
                Why is decenTREElized different from other products that already help environment? Because it is
                completely decentralized. Our smart contracts only transfer 10% of the donated funds to the farmer each
                year, for 10 years. During this time, farmers must send pictures to prove that donated money is being
                used to help the environment and preserve green areas - this ensures they receive their payment each
                year. If the money is not being put to good use, the person who donated can ask for a refund of the
                remainder of their deposit at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-300/20">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 pt-4 lg:pt-0">
              <p className="text-center lg:text-left text-xl m-0 font-light">HOW DOES IT WORK?</p>
            </div>

            <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
              Simplicity <br /> transparency and secure
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
              Donate 1 Ether per tree. <br />
              <br />
              Farmers will get 0.1 Ether for each year for 10 years. <br />
              <br />
              Only after 10 years will the farmer get full amount. <br />
              <br />
              Farmer must keep donators happy by posting pictures of the healthy tree/area.
              <br />
              <br />
              The donator can ask for a refund at anytime.
              <br />
              <br />
              Donators get back the remaining balance if they are not satisfied.
            </p>
          </div>
          <div className="max-w-[400px] lg:max-w-none">
            <Image src="/tree2.jpg" alt="Tree and sky" width={1400} height={1400} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
