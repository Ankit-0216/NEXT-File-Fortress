"use client";

import React from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { UploadButton } from "./upload-button";
import FileCard from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col items-center mt-24 gap-6">
          <Loader2 className="mr-1 h-28 w-28 animate-spin text-gray-600" />
          <div>Loading ....</div>
        </div>
      )}

      {!isLoading && files.length === 0 && (
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
      )}

      {!isLoading && files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your Files</h1>

            <UploadButton />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </main>
  );
}
