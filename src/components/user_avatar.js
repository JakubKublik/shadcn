import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import PocketBase from 'pocketbase';
import { useEffect, useState } from "react";
import Login from "./login";

const pb = new PocketBase('http://172.16.15.142:8080');
   
  export function AvatarDemo({onLogin, user, setUser}) {
    // const[user, setUser]=useState(null)

    useEffect(()=>{
        setUser(pb.authStore.model)
    },[])
    // const login = async ()=>{
    //     setUser(pb.authStore.model)
    // }
    const logout = ()=>{
        pb.authStore.clear();
        console.log(pb.authStore)
        setUser(null)
    }

    return (

      <DropdownMenu>
      <DropdownMenuTrigger>
      <Avatar className="w-20 h-20">
        <AvatarImage src={user && pb.files.getUrl(user, user.avatar)} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user ? user.username : "niezalogowany"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {user ? 
        <DropdownMenuItem onClick={logout}>logout</DropdownMenuItem>
        : 
        <DropdownMenuItem asChild onClick={onLogin}><Login onLogin={onLogin}/></DropdownMenuItem>
        }
        
      </DropdownMenuContent>
    </DropdownMenu>
    )
  }