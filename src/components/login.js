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
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PocketBase from 'pocketbase';
import New_user from "./new_user"
const pb = new PocketBase('http://172.16.15.142:8080');

export default function Login({onLogin}) {
    const[user,setUser]=useState(null)
    const[pass,setPass]=useState(null)
    const[error,setError]=useState(false)
    const[open,setOpen]=useState(false)

    useEffect(()=>{
        setError(false)
    },[open])

    const handleUser = (e)=>{
        setUser(e.target.value)
    }
    const handlePass = (e)=>{
        setPass(e.target.value)
    }
    const handleButton = async (e)=>{
        console.log(user)
        console.log(pass)
        try{
            const authData = await pb.collection('users').authWithPassword(
                user,
                pass,
            );
        }catch(err){
            setError(true)

        }
      
        onLogin()
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        login
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e)=>{
                handleUser(e)
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              type="password" 
              id="username"
              className="col-span-3"
              onChange={(e)=>{
                handlePass(e)
              }}
            />
          </div>
          <div  className="flex flex-col justify-center items-center w-full" >
        {error && <p className="">Nie udało się zalogować</p>}
        <Button onClick={handleButton} type="submit">Save changes</Button>
            </div>
        </div></TabsContent>
  <TabsContent value="password"><New_user setOpen={setOpen}/></TabsContent>
</Tabs>
        
        <DialogFooter>
           
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
