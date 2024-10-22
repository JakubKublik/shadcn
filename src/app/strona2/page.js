"use client"
import { ModeToggle } from "@/components/change";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


export default function Ceny() {
  const [zloto, setZloto] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(`https://api.nbp.pl/api/cenyzlota/last/30/?format=json`);
        const json = await data.json();
        setZloto(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-3 pt-4 items-center justify-center h-screen">
      {zloto && zloto.map((cena, idx) => {
        const previousCena = idx > 0 ? zloto[idx - 1].cena : null;
        let Icon = null;
        let priceChange = null;

        if (previousCena) {
          priceChange = cena.cena - previousCena;
          Icon = priceChange > 0 ? <TrendingUp className="text-green-500" size={60} /> : <TrendingDown className="text-red-500" size={60} />;
        }

        return (
            <Card key={idx} className="p-0 w-[350px] px-5">
                <CardContent className=" p-2 flex flex-row items-center justify-center">
          <div key={idx} className="p-2 flex flex-row items-center gap-8 ">
            <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">{cena.cena} zł</h1>
            <h2 className="flex flex-col items-center justify-center text-sm font-medium leading-none text-muted-foreground">{cena.data}</h2>
            </div>
            {Icon && (
              <div className="flex flex-col items-end justify-end mt-2" >
                {Icon}
                <h3 className={`ml-2 ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {priceChange.toFixed(2)} zł
                </h3>
              </div>
            )}
          </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
