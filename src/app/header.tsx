import React from "react";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="relative z-10 border-b py-3 bg-gray-200">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" alt="File Fortress" width="45" height="5" />
          FileFortress
        </Link>

        <SignedIn>
          <Button variant={"ghost"}>
            <Link href="/dashboard/files">Your files</Link>
          </Button>
        </SignedIn>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default Header;
