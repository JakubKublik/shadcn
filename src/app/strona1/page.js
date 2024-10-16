"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function  Strona1(){
    const[licznik,setLicznik] = useState(0)
    const[zmiany,setZmiany] = useState(0)

    const dodaj = ()=>{
        setLicznik(licznik + 1)
        
    }
    const minus = ()=>{
        setLicznik(licznik - 1)
    }
    const zero = ()=>{
        setLicznik(0)
        setZmiany(zmiany + 1)
    }

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen gap-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <HoverCard>
                    <HoverCardTrigger>{licznik}</HoverCardTrigger>
                    <HoverCardContent >
                        <p>licznik:{licznik}</p>
                        <p>ilość zmian:{zmiany}</p>
                    </HoverCardContent>
                </HoverCard>
            </h1>
            <div>
            <Button disabled={licznik==10? true: false}  className="m-5" onClick={dodaj}>+1</Button>
            <Button disabled={licznik==0? true: false}  className="m-5" onClick={minus}>-1</Button>
                        <AlertDialog className="m-5">
              <AlertDialogTrigger >Wyzeruj</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  {licznik==0? "licznik jest już 0.": "Czy chcesz wyzerować swój licznik?"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction disabled={licznik==0? true: false} onClick={zero}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            </div>
        </div>
    )
}