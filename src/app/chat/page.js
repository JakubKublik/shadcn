"use client"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://172.16.15.142:8080');
export default function Chat(){
    const[dane,setDane] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const resultList = await pb.collection('chat').getList(1, 50, {
                    sort: '-created',
                });
                setDane(resultList.items)
                console.log(resultList)
            } catch (error) {

            }
        }

        getData()
    }, [])
    pb.collection('chat').subscribe('RECORD_ID', function (e) {
        console.log(e.action);
        console.log(e.record);
        if(e.action == "create"){
        setDane((prev)=>(
            [...prev, e.record]
        ))
    }
    }, { /* other options like expand, custom headers, etc. */ });
    


    return <div>
            {
                dane &&
                dane.map((wiadomosc)=>(
                    <p key={id}></p>
                ))
            }

        </div>
    
}