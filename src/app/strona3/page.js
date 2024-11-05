"use client"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://172.16.15.142:8080');
export default function Home(){
    const[sklep, setSklep] = useState(null)
    const[zdj,setZdj] = useState(null)
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

    return(
        <div>
            {sklep &&
                sklep.map((gry)=>(
                    
                    <Card key={gry} className="w-[400px] h-[400px]">
            <CardTitle> <Image 
                src={pb.files.getUrl(gry, gry.zdj)}
                alt={gry.zdj}
                width={500}
                height={500}
                /></CardTitle>
            <CardDescription className="flex flex-wrap">{gry.nazwa}{gry.cena}</CardDescription>
            <CardContent>
            
            </CardContent>
            <CardFooter>


            </CardFooter>
        </Card>
                

            ))

            }
        </div>
    )
}