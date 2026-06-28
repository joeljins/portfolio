// post
export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    return new Response(JSON.stringify({ message: "Post created successfully" }), { status: 201 });
}
//  get
export async function GET(request: Request) {
    const posts = [
        { id: 1, content: "This is the first post" },
        { id: 2, content: "This is the second post" },
        { id: 3, content: "This is the third post" },
    ];
    return new Response(JSON.stringify(posts), { status: 200 });
}