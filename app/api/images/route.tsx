import fs from "fs/promises";
let url = "public";
let langUrl = url + "/languages";
let frameUrl = url + "/frameworks"

export async function GET() {
    const langImgs = await fs.readdir(langUrl);
    //const frameImgs = await fs.readdir(frameUrl);
    console.log("S");
    console.log(langImgs);
    return Response.json({
        languages : langImgs
        //frameworks : frameImgs
    })
}