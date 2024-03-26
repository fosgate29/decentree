import { Refunds } from "./_components/Refunds";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Refund",
  description: "Ask for a refund",
});

const Refund: NextPage = () => {
  return (
    <>
      <Refunds />
    </>
  );
};

export default Refund;
