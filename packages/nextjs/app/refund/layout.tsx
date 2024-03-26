import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Refund",
  description: "Refund values",
});

const RefundLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RefundLayout;
