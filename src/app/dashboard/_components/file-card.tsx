import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileTextIcon,
  GanttChart,
  ImageIcon,
  MoreVertical,
  StarIcon,
  StarOff,
  Trash2Icon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<"files">;
  isFavorited: boolean;
}) {
  const { toast } = useToast();

  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                });

                toast({
                  variant: "default",
                  title: "File Deleted Successfully.",
                  description: "Your file is now deleted cpmpletely.",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id });
            }}
            className="flex font-bold items-center cursor-pointer"
          >
            {isFavorited ? (
              <div className="flex gap-1">
                <StarIcon className="w-5 h-5" /> UnFavorite it
              </div>
            ) : (
              <div className="flex gap-1">
                <StarOff className="w-5 h-5" /> Add to Favorites
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="flex gap-1 text-red-500 font-bold items-center cursor-pointer"
          >
            <Trash2Icon className="w-5 h-5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// function getFileUrl(fileId: Id<"_storage">): string {
//   console.log("fileId", fileId);
//   const url = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
//   console.log("url", url);
//   return url;
// }

export default function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChart />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <div>
      <Card>
        <CardHeader className="relative">
          <CardTitle className="flex gap-2">
            <p>{typeIcons[file.type]}</p>
            {file.name}
          </CardTitle>
          <div className="absolute top-3 right-3">
            <FileCardActions isFavorited={isFavorited} file={file} />
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
        <CardFooter className="flex justify-center">
          {/* Add the download functionality */}
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
