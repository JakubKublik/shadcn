import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { ModeToggle } from "./change";
import Link from "next/link";


  export default function Menu(){
    return(
        <div className="relative w-full flex justify-center items-center my-5">
        <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent className="flex flex-col">

        <NavigationMenuLink className="m-5">
            <Link href="/">Główna</Link>
            </NavigationMenuLink>

        <NavigationMenuLink className="m-5">
            <Link href="./strona1">Strona1</Link>
            </NavigationMenuLink>
      
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<div className="absolute top-0 right-5 ">
<ModeToggle/>
</div>
</div>
    )
  }