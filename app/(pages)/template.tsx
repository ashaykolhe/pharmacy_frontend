"use client";

import { useEffect } from "react";
import JwtExpiryDialog from "../components/JwtExpiryDialog";
import { checkIfJwtValid } from "../utils/utils";
import NavbarMenu from "../components/NavbarMenu";
import Shortcuts from "../components/Shortcuts";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    checkIfJwtValid("general");
  }, []);

  return (
    <div>
      <JwtExpiryDialog />
      <NavbarMenu />
      <Shortcuts />
      {children}
    </div>
  );
}
