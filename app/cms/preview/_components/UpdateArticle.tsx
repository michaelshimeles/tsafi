import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { updateArticle } from "@/utils/actions/articles/update-article";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateArticle({ html, slug }: { html: string, slug: string }) {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Article</DialogTitle>
        </DialogHeader>
        <Button type="submit" onClick={async () => {
          try {
            const response = await updateArticle(slug, html)
            toast("Article has been updated")
            setOpen(false)
            return response
          } catch (error) {
            return error
          }
        }}>Save changes</Button>
      </DialogContent>
    </Dialog>
  )
}
