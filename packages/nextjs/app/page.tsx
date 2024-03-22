"use client";

import { useState } from "react";
import { APIProvider, AdvancedMarker, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type LatLng = {
  lat: number;
  lng: number;
};

const Home: NextPage = () => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const initialPosition = { lat: -16.5068934, lng: -44.2878931 };

  //const [position, setPosition] = useState({ lat: -16.5068934, lng: -44.2878931 });
  const [position, setPosition] = useState<LatLng | null>(initialPosition); //useState(new google.maps.LatLng(-16.5068934, -44.2878931));

  const [contractPosition, setContractPosition] = useState({ lat: BigInt(165068934), lng: BigInt(442878931) });

  const { address } = useAccount();

  const { data: locations } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getLocationList",
    args: [address],
  });

  const PRECISION = 10000000;

  const setW3W = (newCenter: LatLng | null) => {
    //const setW3W = ( {lat: as number , lng: number } | null) => {
    let lat = Number(newCenter?.lat);
    let lng = Number(newCenter?.lng);

    setPosition(newCenter);

    lat = Math.abs(Math.trunc(lat * PRECISION));
    lng = Math.abs(Math.trunc(lng * PRECISION));
    setContractPosition({ lat: BigInt(lat), lng: BigInt(lng) });
  };

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "depositValue",
    args: [contractPosition.lat, contractPosition.lng],
    value: BigInt(1000),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      setPosition(initialPosition);
    },
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">DecenTREElized</span>
          </h1>

          <div className="flex justify-center items-center space-x-2">
            <BanknotesIcon className="h-8 w-8 fill-secondary" />
            <p>
              Select an area marked with the red map pin, then click{" "}
              <div className="btn btn-primary btn-sm font-normal gap-1" onClick={() => writeAsync()}>
                Donate
              </div>
            </p>
          </div>

          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              mapId={"bf51a910020fa25a"}
              defaultCenter={position}
              defaultZoom={15}
              mapTypeId={"satellite"}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              disableDoubleClickZoom={true}
              zoomControl={true}
            >
              <div style={{ height: 400, width: 600 }}>
                <Marker
                  position={position}
                  draggable
                  onDrag={(e: { latLng: { lat: () => any; lng: () => any } }) =>
                    setW3W({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })
                  }
                />
                {/* advanced marker with customized pin */}
                {locations?.map(coordinate => (
                  <AdvancedMarker
                    key={coordinate.lat + "_" + coordinate.lng}
                    position={{
                      lat: (Number(coordinate.lat) * -1) / PRECISION,
                      lng: (Number(coordinate.lng) * -1) / PRECISION,
                    }}
                    title={"Donated area"}
                  >
                    <Pin background={"#22ccff"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                  </AdvancedMarker>
                ))}
              </div>
            </Map>
          </APIProvider>
        </div>
      </div>
    </>
  );
};

export default Home;
