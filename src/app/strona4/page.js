"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function News() {
  const [newsy, setNewsy] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e6d9b7edf7d347d4b3bb9848d49f3773`
        );
        const json = await data.json();
        setNewsy(json.articles);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-wrap justify-center">
      {newsy &&
        newsy.map((item, idx) => (
          <div
            className="border m-2 p-2 w-[30%] flex flex-col items-center h-[600px]" 
            key={idx}
          >
            <div>
              {item.urlToImage ? (
                <div className="relative h-[200px] w-[500px]">
                <Image
                  src={item.urlToImage}
                  alt={item.title || "News Image"}
                  layout="fill"
                />
                </div>
              ) : (
                <div className="relative h-[200px] w-[500px]">
                <Image
                  src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                  alt="No Image Available"
                  layout="fill" 
                />
                </div>
              )}
            </div>
            <p className="text-center mt-2">{item.title}</p>
            <p className="text-center mt-2">{item.content}</p>
            <div className="flex flex-row mt-2">
              <p className="gap-2">Source: {item.source.name}</p>
              <p className="gap-2 ml-4">
                Author: {item.author ? item.author : "Unknown author"}
              </p>
            </div>
            <Button
              className="mt-auto" 
              onClick={() => handleButtonClick(item.url)}
            >
              More
            </Button>
          </div>
        ))}
    </div>
  );
}
