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
import { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JwtExpiryDialog from "../components/JwtExpiryDialog";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  type StringKeyObject = {
    [key: string]: boolean;
  };

  const keys: StringKeyObject = {};
  //   const router = useRouter();

  function keyDown(event: KeyboardEvent) {
    event.preventDefault();
    // event.stopPropagation();
    keys[event.key] = true;
  }

  function keyUp(event: KeyboardEvent) {
    console.log("before");
    console.log(keys);
    if (keys["Alt"]) {
      if (keys["p"] && keys["a"]) {
        // event.preventDefault();
        //   router.push("/product/add");d
        console.log("alt p a");
        keys[event.key] = false;
        redirect("/product/add");
      } else if (keys["d"]) {
        //   router.push("/dashboard");
        console.log("alt d");
        keys[event.key] = false;
        redirect("/dashboard");
      } else if (keys["p"]) {
        //   router.push("/product");
        console.log("alt p");
        keys[event.key] = false;
        redirect("/product");
      } else {
        console.log("No alt shortcut available");
      }
    } else {
      console.log("No shortcut available");
    }

    keys[event.key] = false;
    // keys = {};
    console.log("after");
    console.log(keys);
  }

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    return () => {
      console.log("cleanup");
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
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
              &nbsp;<MenubarShortcut>Alt d</MenubarShortcut>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/product">Product</Link>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/product/add">Add Product</Link>{" "}
                <MenubarShortcut>Alt p a</MenubarShortcut>
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
