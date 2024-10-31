"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GameDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const getDeals = async () => {
      try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/deals`);
        const data = await response.json();
        setDeals(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching game deals:", error);
      }
    };

    getDeals();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {deals.map((deal, idx) => (
        <div
          className="border m-2 p-2 w-[30%] flex flex-col items-center justify-between h-[400px]" 
          key={idx}
        >
          <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
            <Image
              src={deal.thumb}
              alt={deal.title}
              width={200}
              height={200}
              style={{ objectFit: "contain" }} 
            />
          </div>

          
          <h3 className="text-center mt-2">{deal.title}</h3>
          <p className="text-center">Sale Price: ${deal.salePrice}</p>
          <p className="text-center">Normal Price: ${deal.normalPrice}</p>
          <p className="text-center">Deal Rating: {deal.dealRating}</p>
        </div>
      ))}
    </div>
  );
}