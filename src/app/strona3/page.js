"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://172.16.15.142:8080');

export default function Home(){
    const[sklep,setSklep]=useState(null)
    const[zdj,setZdj]=useState(null)
    const[dane,setDane]=useState({nazwa: null, cena: null, opis:null})
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const records = await pb.collection('sklep').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setSklep(records)
            }catch(err){

            }finally{

            }
        }
        getData()
    },[])
    const handleInputChange = (id,e)=>{
        setDane((prev)=>({
            ...prev,
            [id]: e.target.value
    }))
    const handleSubmit = async ()=>{
        const formData = new FormData()
            formData.append("nazwa",dane.nazwa)
            formData.append("cena",dane.cena)
            formData.append("opis",dane.opis)
            formData.append("zdj",zdj)
        try{
            const record = await pb.collection('sklep').create(formData);
            setSklep((prev)=>([
                ...prev,
                record
            ]))
        }catch(err){

        }
    }
    const handleZdj = (e)=>{
        console.log(e)
        setZdj(e.target.files[0])
    }
   
    console.log(dane)
    }
    return(
        <div>
            <Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Dodaj gre</SheetTitle>
      <SheetDescription>
      {
                sklep &&
                
                <div className='flex flex-wrap w-full justify-center gap-5'>
                                <div className='flex flex-col'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="nazwa">Nazwa</Label>
                      <Input onChange={(e)=>handleInputChange("nazwa", e)} type="text" id="nazwa" placeholder="nazwa" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="cena">Cena</Label>
                      <Input onChange={(e)=>handleInputChange("cena", e)} type="text" id="cena" placeholder="cena" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="opis">Opis</Label>
                      <Input onChange={(e)=>handleInputChange("opis", e)} type="number" id="opis" placeholder="opis" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="zdj">Zdjecie</Label>
                      <Input onChange={(e)=>{handleZdj(e)}} type="file" id="zdj" placeholder="zdj" />
                    </div>
                    <div className='flex flex-wrap gap-5 justify-center mt-5'>
                    <Button onClick={handleSubmit}>Dodaj</Button> 
                    
                    </div>
                </div>

                </div>
}
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

        </div>
    )
}