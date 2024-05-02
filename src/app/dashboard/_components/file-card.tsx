import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FileTextIcon, GanttChart, ImageIcon } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { formatRelative } from "date-fns";
import { FileCardActions } from "./file-actions";

export default function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean };
}) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChart />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  return (
    <div>
      <Card>
        <CardHeader className="relative">
          <CardTitle className="flex gap-2">
            <p>{typeIcons[file.type]}</p>
            {file.name}
          </CardTitle>
          <div className="absolute top-3 right-3">
            <FileCardActions isFavorited={file.isFavorited} file={file} />
          </div>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="h-[120px] flex items-center justify-center">
          {file.type === "image" && (
            <ImageIcon className="w-20 h-20" />
            // <Image
            //   src={getFileUrl(file.fileId)}
            //   alt={file.name}
            //   height="100"
            //   width="200"
            // />
          )}

          {file.type === "csv" && <GanttChart className="w-20 h-20" />}

          {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 text-sm font-semibold text-gray-600 items-center">
            <Avatar className="h-7 w-7">
              <AvatarImage src={userProfile?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {userProfile?.name}
          </div>

          <div className="text-sm font-semibold text-gray-600">
            Uploaded on{" "}
            {formatRelative(new Date(file._creationTime), new Date())}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
