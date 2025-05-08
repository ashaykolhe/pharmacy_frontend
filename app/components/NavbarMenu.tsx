import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { logout } from "../utils/jwtStore";
import Link from "next/link";

const NavbarMenu = () => {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/home">Home</Link>
            &nbsp;<MenubarShortcut>Alt Shift H</MenubarShortcut>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/dashboard/god">God</Link>
              <MenubarShortcut>Alt Shift D G</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/admin">Admin</Link>
              <MenubarShortcut>Alt Shift D A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/user">User</Link>
              <MenubarShortcut>Alt Shift D U</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Employee</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/employee">View</Link>
              <MenubarShortcut>Alt Shift E</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Link href="/employee/add">Add</Link>
              <MenubarShortcut>Alt Shift E A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Update
              <MenubarShortcut>Alt Shift E U</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Product</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/product">View</Link>
              <MenubarShortcut>Alt Shift P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Link href="/product/add">Add</Link>
              {/* &nbsp;<MenubarShortcut>Alt p a</MenubarShortcut> */}
            </MenubarItem>
            <MenubarItem>
              Update
              {/* <MenubarShortcut>Alt p u</MenubarShortcut> */}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer" onClick={() => logout()}>
            Logout&nbsp;
            <MenubarShortcut>Alt Shift L</MenubarShortcut>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavbarMenu;
