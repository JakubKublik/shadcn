"use client"

import { Button } from "@/components/ui/button"

export default function Pow(){
    const powiadom = () =>{
        fetch('https://ntfy.sh/powiadomienie', {
            method: 'POST', // PUT works too
            body: 'Backup successful 😀'
          })
    }
    return(
        <Button onClick={powiadom}></Button>
    )
}