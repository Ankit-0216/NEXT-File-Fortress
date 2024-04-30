"use client";

import React, { useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { UploadButton } from "./dashboard/_components/upload-button";
import FileCard from "./dashboard/_components/file-card";
import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";
import SearchBar from "./dashboard/_components/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Placeholder() {
  return (
    <div className="flex flex-col items-center mt-20 gap-8">
      <Image
        src="/empty.svg"
        alt="empty svg"
        width="350"
        height="350"
        loading="lazy"
      />

      <div>You have no files, Upload one</div>

      <UploadButton />
    </div>
  );
}

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");

  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-12">
      <div className="flex gap-8">
        <div className="w-40 flex flex-col gap-4">
          <Link href="/dashboard/files">
            <Button variant={"link"} className="flex gap-2">
              <FileIcon /> All Files
            </Button>
          </Link>

          <Link href="/dashboard/favorites">
            <Button variant={"link"} className="flex gap-2">
              <StarIcon /> Favorites
            </Button>
          </Link>
        </div>

        <div className="w-full">
          {isLoading && (
            <div className="flex flex-col items-center mt-24 gap-6">
              <Loader2 className="mr-1 h-28 w-28 animate-spin text-gray-600" />
              <div>Loading ....</div>
            </div>
          )}

          {!isLoading && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Your Files</h1>

                <SearchBar query={query} setQuery={setQuery} />

                <UploadButton />
              </div>

              {files.length === 0 && <Placeholder />}

              <div className="grid grid-cols-3 gap-4">
                {files?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
