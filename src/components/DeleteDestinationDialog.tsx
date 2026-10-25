import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { buttonVariants } from "@/components/ui/button";
import { Destination } from "@/lib/destinations";
import { cn } from "cn";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
type DestinationProps = {
  destination: Destination;
};
const DeleteDestinationDialog = ({ destination }: DestinationProps) => {
  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    console.log(data);
    redirect("/destination");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-9 gap-1.5 border-red-200 bg-white px-3 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600",
        )}
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
