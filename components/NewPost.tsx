'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"


export default function createPost() {

    const [content, setContent] = useState("");

    async function handleSubmit() {
        fetch('api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
            })
        });
        console.log("Sending content:", content);
    }

  return (
    <div>

        <Dialog>
            <DialogTrigger>
                Add thought:
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Write a new thought: </DialogTitle>
                </DialogHeader>


                    <FieldLabel htmlFor="checkout-7j9-optional-comments">
                        Comments
                    </FieldLabel>
                    <Textarea
                        id="checkout-7j9-optional-comments"
                        placeholder="Add any additional comments"
                        className="resize-none"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    />
                    <FieldSeparator> </FieldSeparator>
                    <Button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full">
                        Submit
                    </Button>


            </DialogContent>
        </Dialog>

    </div>

  )
}
