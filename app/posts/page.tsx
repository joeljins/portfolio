'use client'
import Post from '@/components/Post'
import NewPost from '@/components/NewPost'
import { useEffect, useState } from 'react'
import { stringify } from 'querystring';

export default function Posts() {

    const [posts, setPosts] = useState<Props[]>([]);

    async function fetchPosts () {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();

    }, []);

    interface Props {
        content: string,
        id : string
    }
    function renderPosts(post: Props[]) {
        return(
            posts.map( (post) => (
                <Post key={post.id} content={post.content} ></Post>
            )))
        }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           {renderPosts(posts)} 
            
            <NewPost></NewPost>

        </div>


    )
}