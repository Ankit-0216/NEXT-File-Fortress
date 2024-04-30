"use client";

import React, { useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import FileCard from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import SearchBar from "./search-bar";

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

export default function FileBrowser({
  title,
  favoritesOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly } : "skip"
  );

  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col items-center mt-24 gap-6">
          <Loader2 className="mr-1 h-28 w-28 animate-spin text-gray-600" />
          <div>Loading ....</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>

            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
          </div>

          {files.length === 0 && <Placeholder />}

          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return (
                <FileCard
                  key={file._id}
                  file={file}
                  favorites={favorites ?? []}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
