"use client"
import Del from '@/components/del';
import { DialogDemo } from '@/components/edit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Timer } from 'lucide-react';
import Image from 'next/image';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://172.16.15.142:8080');

export default function Strona5(){
    const[samochody,setSamochody]  = useState(null)
    const[dane, setDane] = useState({marka: null, model: null, czas_parkowania:null})
    const[zdjecie,setZdjecie] = useState(null)
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const records = await pb.collection('samochody').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setSamochody(records)
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
    console.log(dane)
    }
    const handleSubmit = async ()=>{
        const formData = new FormData()
            formData.append("marka",dane.marka)
            formData.append("model",dane.model)
            formData.append("czas_parkowania",dane.czas_parkowania)
            formData.append("zdjecie",zdjecie)
        try{
            const record = await pb.collection('samochody').create(formData);
            setSamochody((prev)=>([
                ...prev,
                record
            ]))
        }catch(err){

        }
    }
    const handleZdjecie = (e)=>{
        console.log(e)
        setZdjecie(e.target.files[0])
    }
    const deleted = (id)=>{
        try{
            setSamochody((prev)=>
            prev.filter((samochod)=>samochod.id !== id)
            )
        }catch(err){

        }
    }
    const updated = (item)=>{
        console.log(item)
        var index = null
        var tmpsamochody = [...samochody]
        for(let i in samochody){
            if(samochody[i].id == item.id){
                index=i
            }
        }
        tmpsamochody[index] = item
        setSamochody(tmpsamochody)
        console.log("index: " + index)
    }


    return(
        <div>
            {
                samochody &&
                
                <div className='flex flex-wrap w-full justify-center gap-5'>
                                <div className='flex flex-col'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="marka">Marka</Label>
                      <Input onChange={(e)=>handleInputChange("marka", e)} type="text" id="marka" placeholder="Marka" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="model">Model</Label>
                      <Input onChange={(e)=>handleInputChange("model", e)} type="text" id="model" placeholder="Model" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="czas_parkowania">Czas parkowania</Label>
                      <Input onChange={(e)=>handleInputChange("czas_parkowania", e)} type="number" id="czas_parkowania" placeholder="Czas parkowania" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="zdjecie">Zdjecie</Label>
                      <Input onChange={(e)=>{handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjecie" />
                    </div>
                    <div className='flex flex-wrap gap-5 justify-center mt-5'>
                    <Button onClick={handleSubmit}>Dodaj</Button> 
                    
                    </div>
                </div>
                {samochody.map((samochod)=>(
                    
                        <Card key={samochod} className="w-[400px] h-[400px]">
                <CardTitle>{samochod.marka}</CardTitle>
                <CardDescription>{samochod.model}</CardDescription>
                <CardContent>
                    <Image 
                    src={pb.files.getUrl(samochod, samochod.zdjecie)}
                    alt={samochod.zdjecie}
                    width={500}
                    height={500}
                    />
                </CardContent>
                <CardFooter>
                    <div className='w-full flex justify-between'>
                        <div>
                        <Del id={samochod.id} ondeleted={deleted}/>
                        <DialogDemo item={samochod} onupdated={updated}/>
                        </div>
                        <div className='flex justify-end w-full mt-5 gap-5'>
                        <Timer/><p>czas parkowania {samochod.czas_parkowania}min</p>
                        
                    </div>
                    </div>

                </CardFooter>
            </Card>
                    

                ))}
            

                </div>
}
        </div>
    )
}