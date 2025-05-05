"use client";
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
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JwtExpiryDialog from "../components/JwtExpiryDialog";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const keys = {};
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      if (keys["Control"] && keys["p"] && keys["a"]) {
        redirect("/product/add");
      } else if (keys["Control"] && keys["p"]) {
        redirect("/product");
      } else if (keys["Control"] && keys["d"]) {
        redirect("/dashboard");
      }
      keys[event.key] = false;
    });
    return () => {
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("keyup", () => {});
    };
  }, [keys]);

  return (
    <div>
      <JwtExpiryDialog />
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/dashboard">Dashboard</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/product">Product</Link>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/product/add">Add Product</Link>{" "}
                <MenubarShortcut>Alt p m</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Update <MenubarShortcut>Alt p u</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>
                Always Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer" onClick={() => logout()}>
              Logout
              <MenubarShortcut></MenubarShortcut>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
      {children}
    </div>
  );
}
