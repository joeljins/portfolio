'use client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
    content: string
}
export default function Post({ content }: Props) {
    return (
        <Card className="w-1/4 h-[200px] m-2">
            <CardContent>
                <p> {content} </p> 
            </CardContent>
        </Card>

  );
}