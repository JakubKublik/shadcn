"use client"
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
=======
>>>>>>> 57807f763bd0e09b1c68f60e67a1d126366b0e87
import {
    Sheet,
    SheetContent,
    SheetDescription,
<<<<<<< HEAD
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import PocketBase from "pocketbase";
import { SquarePlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
  

const pb = new PocketBase("http://172.16.15.142:8080");

export default function Home() {
    const [gry, setGry] = useState([]);
    const [nazwa, setNazwa] = useState("");
    const [cena, setCena] = useState("");
    const [zdj, setZdj] = useState(null);
    const [opis, setOpis] = useState("");
    const [selectedGra, setSelectedGra] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const [deleteId, setDeleteId] = useState(null); 

    useEffect(() => {
        const getData = async () => {
            try {
                const records = await pb.collection("sklep").getFullList({
                    sort: "-created",
=======
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
>>>>>>> 57807f763bd0e09b1c68f60e67a1d126366b0e87
                });
                setGry(records);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await pb.collection("sklep").delete(deleteId);
            setGry((prevGry) => prevGry.filter((gra) => gra.id !== deleteId));
            setDeleteId(null); 
        } catch (err) {
            console.error("Error deleting record:", err);
        }
<<<<<<< HEAD
    };

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            formData.append("nazwa", nazwa);
            formData.append("cena", cena);
            if (zdj) formData.append("zdj", zdj);
            formData.append("opis", opis);
            formData.append("stan", false);

            const createdRecord = await pb.collection("sklep").create(formData);
            setGry((prevGry) => [createdRecord, ...prevGry]);
            setNazwa("");
            setCena("");
            setZdj(null);
            setOpis("");
        } catch (err) {
            console.error("Error adding record:", err);
        }
    };

    const handleEdit = async () => {
        if (!selectedGra) return;
        try {
            const formData = new FormData();
            formData.append("nazwa", nazwa);
            formData.append("cena", cena);
            if (zdj) formData.append("zdj", zdj);
            formData.append("opis", opis);

            const result = await pb.collection("sklep").update(selectedGra.id, formData);
            setGry((prevGry) =>
                prevGry.map((gra) => (gra.id === selectedGra.id ? result : gra))
            );
            setSelectedGra(null);
            setNazwa("");
            setCena("");
            setOpis("");
            setZdj(null);
            setIsDialogOpen(false); 
        } catch (err) {
            console.error("Error updating record:", err);
        }
    };

    const toggleStatus = async (gra) => {
        try {
            const updatedGra = await pb.collection("sklep").update(gra.id, {
                stan: !gra.stan,
            });
            setGry((prevGry) =>
                prevGry.map((item) => (item.id === gra.id ? updatedGra : item))
            );
        } catch (err) {
            console.error("Error updating stan:", err);
        }
    };

    const openEditDialog = (gra) => {
        setSelectedGra(gra);
        setNazwa(gra.nazwa);
        setCena(gra.cena);
        setOpis(gra.opis);
        setZdj(null);
        setIsDialogOpen(true); 
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    return (
        <div>
            {gry && (
                <div className="flex flex-wrap w-full justify-center gap-5">
                    {gry.map((gra) => (
                        <Card key={gra.id} className="w-[500px] h-[500px]">
                            <CardTitle>
                                <Image
                                    src={pb.files.getUrl(gra, gra.zdj)}
                                    alt={gra.zdj}
                                    height={500}
                                    width={500}
                                    className="rounded-mb"
                                />
                            </CardTitle>
                            <CardContent className="flex justify-center">
                                <div>
                                    <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                {gra.nazwa}
                                    </div>
                                 <br /> 
                                    <div className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex justify-center gap-1">
                                    {gra.cena}<p> zł</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardDescription className="flex justify-center">{gra.opis}</CardDescription>
                            <CardFooter className="flex justify-between items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>...</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem onClick={(e) => { 
                                        e.preventDefault(); 
                                        confirmDelete(gra.id); 
                                    }}>
                                        <Button>usun</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openEditDialog(gra)}>
                                        <Button>edytuj</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                                
                            
                            <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
                                <AlertDialogTrigger asChild>
                                    
                                    
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this game and remove its data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                                



                                <div className="ml-auto flex flex-row gap-3">
                                    <p>dostępność: </p>
                                <Switch
                                    checked={gra.stan}
                                    onCheckedChange={() => toggleStatus(gra)}
                                    
                                />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}

                    <Sheet>
                        <SheetTrigger>
                            <Card className="flex items-center justify-center w-[500px] h-[500px]">
                                <SquarePlus size={500} />
                            </Card>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Dodawanie</SheetTitle>
                                <SheetDescription>Dodaj nową grę do bazy danych</SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4 p-4">
                                <Input
                                    placeholder="Nazwa"
                                    value={nazwa}
                                    onChange={(e) => setNazwa(e.target.value)}
                                />
                                <Input
                                    placeholder="Cena"
                                    value={cena}
                                    onChange={(e) => setCena(e.target.value)}
                                />
                                <Input type="file" onChange={(e) => setZdj(e.target.files[0])} />
                                <Input
                                    placeholder="Opis"
                                    value={opis}
                                    onChange={(e) => setOpis(e.target.value)}
                                />
                            </div>
                            <SheetFooter>
                                <Button onClick={handleAdd}>Dodaj</Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edycja gry</DialogTitle>
                        <DialogDescription>
                            Edytuj dane gry i zapisz zmiany.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 p-4">
                        <Input
                            placeholder="Nazwa"
                            value={nazwa}
                            onChange={(e) => setNazwa(e.target.value)}
                        />
                        <Input
                            placeholder="Cena"
                            value={cena}
                            onChange={(e) => setCena(e.target.value)}
                        />
                        <Input
                            type="file"
                            onChange={(e) => setZdj(e.target.files[0])}
                        />
                        <Input
                            placeholder="Opis"
                            value={opis}
                            onChange={(e) => setOpis(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleEdit}>Zapisz</Button>
                </DialogContent>
            </Dialog>
=======
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

>>>>>>> 57807f763bd0e09b1c68f60e67a1d126366b0e87
        </div>
    );
}
