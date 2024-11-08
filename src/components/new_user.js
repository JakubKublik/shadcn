import { useState } from "react";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import PocketBase from 'pocketbase';
import { Button } from "./ui/button";
const pb = new PocketBase('http://172.16.15.142:8080');

export default function New_user({setOpen}){
    const[user,setUser]=useState(null)
    const[pass1,setPass1]=useState(null)
    const[error,setError]=useState(false)
    const[pass2,setPass2]=useState(null)
    const[zdj,setZdjecie] = useState(null)

    const formData = new FormData()

    formData.append("username",user)
    formData.append("password",pass1)
    formData.append("passwordConfirm",pass2)
    formData.append("avatar",zdj)
    const handleUser = (e)=>{
        setUser(e.target.value)
    }
    const handlePass1 = (e)=>{
        setPass1(e.target.value)
    }
    const handlePass2 = (e)=>{
        setPass2(e.target.value)
    }
    const handleZdjecie = (e)=>{
        console.log(e)
        setZdjecie(e.target.files[0])
    }
    const handleButton = async (e)=>{
        console.log(user)
        console.log(pass1)
        console.log(pass2)
        try{
            const record = await pb.collection('users').create(formData);
            setOpen()
        }catch(err){
            setError(true)
            console.log(err)
        }

      
        
    }
    return(
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="pass1" className="text-right">
              Password
            </Label>
            <Input
              type="password"  
              id="pass1"
              className="col-span-3"
              onChange={(e)=>{
                handlePass1(e)
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pass2" className="text-right">
              Password
            </Label>
            <Input
              type="password"  
              id="pass2"
              className="col-span-3"
              onChange={(e)=>{
                handlePass2(e)
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zdj" className="text-right">
              avatar
            </Label>
            <Input
              type="file"  
              id="zdj"
              className="col-span-3"
              onChange={(e)=>{
                handleZdjecie(e)
              }}
            />
          </div>
          <div  className="flex flex-col justify-center items-center w-full" >
        {error && <p className="">Nie udało się zalogować</p>}
        <Button onClick={handleButton} type="submit">Save changes</Button>
            </div>
        </div>
    )
}