import { useScaffoldContractRead } from "./useScaffoldContractRead";

export const useFetchLocations = (address?: string) => {
  const { data: locations } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getLocationList",
    args: [address],
  });

  return {
    locations,
  };
};
