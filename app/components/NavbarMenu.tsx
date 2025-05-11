import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { logout } from "../utils/jwtStore";
import ShortcutToolTip from "./ShortcutToolTip";

const NavbarMenu = () => {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <ShortcutToolTip
              link={"/home"}
              shortcut={"Alt Shift H"}
              text={"Home"}
            />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <ShortcutToolTip
                link={"/dashboard/god"}
                shortcut={"Alt Shift D G"}
                text={"God"}
              />
            </MenubarItem>
            <MenubarItem>
              <ShortcutToolTip
                link={"/dashboard/admin"}
                shortcut={"Alt Shift D A"}
                text={"Admin"}
              />
            </MenubarItem>
            <MenubarItem>
              <ShortcutToolTip
                link={"/dashboard/user"}
                shortcut={"Alt Shift D U"}
                text={"User"}
              />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <ShortcutToolTip
              link={"/employee"}
              shortcut={"Alt Shift E"}
              text={"Employee"}
            />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <ShortcutToolTip
              link={"/product"}
              shortcut={"Alt Shift P"}
              text={"Product"}
            />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <ShortcutToolTip
              link={"/logout"}
              shortcut={"Alt Shift L"}
              text={"Logout"}
              onClickFunc={() => logout()}
            />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavbarMenu;
