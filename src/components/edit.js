import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Pencil } from "lucide-react"
import { useState } from "react"
import PocketBase from 'pocketbase';
import { DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"




export function DialogDemo({item, onupdated}) {
    const[dane, setDane] = useState({marka: item.marka, model: item.model, czas_parkowania: item.czas_parkowania})
    const[zdjecie,setZdjecie] = useState(null)

    const pb = new PocketBase('http://172.16.15.142:8080');

    const handleInputChange = (id,e)=>{
        setDane((prev)=>({
            ...prev,
            [id]: e.target.value
    }))
    console.log(dane)
    }
    
    const handleZdjecie = (e)=>{
        console.log(e)
        setZdjecie(e.target.files[0])
    }
    const update = async ()=>{
        const formData = new FormData()
            formData.append("marka",dane.marka)
            formData.append("model",dane.model)
            formData.append("czas_parkowania",dane.czas_parkowania)
            formData.append("zdjecie",zdjecie)
            const record = await pb.collection('samochody').update(item.id, formData);

            onupdated(record)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className='flex flex-col'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="marka">Marka</Label>
                      <Input defaultValue={item.marka} onChange={(e)=>handleInputChange("marka", e)} type="text" id="marka" placeholder="Marka" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="model">Model</Label>
                      <Input defaultValue={item.model} onChange={(e)=>handleInputChange("model", e)} type="text" id="model" placeholder="Model" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="czas_parkowania">Czas parkowania</Label>
                      <Input defaultValue={item.czas_parkowania} onChange={(e)=>handleInputChange("czas_parkowania", e)} type="number" id="czas_parkowania" placeholder="Czas parkowania" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="zdjecie">Zdjecie</Label>
                      <Image 
                    src={pb.files.getUrl(item, item.zdjecie)}
                    alt={item.zdjecie}
                    width={500}
                    height={500}
                    />
                      <Input  onChange={(e)=>{handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjecie" />
                    </div>

                </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
          <Button onClick={update}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
