"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteSite } from "@/utils/actions/sites/delete-site"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DeleteSite({ site_id }: { site_id: string }) {
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Trash className='mr-2 w-4 h-4' />
          Delete Site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your site
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={async () => {
            try {
              const response = await deleteSite(site_id)
              toast(`Site has been deleted`)
              router.push("/cms")
              return response
            } catch (error) {
              console.log('e', error)
              toast(`There's been an error`)
              return error
            }
          }}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
