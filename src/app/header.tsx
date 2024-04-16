import React from "react";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  return (
    <div className="border-b py-4 bg-gray-200">
      <div className="items-center container mx-auto justify-between flex">
        <div>FileFortress</div>

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
