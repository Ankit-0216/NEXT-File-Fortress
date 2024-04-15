import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="border-b py-4 bg-gray-200">
      <div className="items-center container mx-auto justify-between flex">
        <div>FileFortress</div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
