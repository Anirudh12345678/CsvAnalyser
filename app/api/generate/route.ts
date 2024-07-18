export async function GET(request: Request, response: Response){
    const {searchParams} = new URL(request.url);
    const name = searchParams.get("prompt");
    const response1 = await fetch(`http://localhost:8081/ai/csv?prompt=${name}`,{method: "GET",});
    return response1;
}