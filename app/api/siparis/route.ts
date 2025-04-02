export async function POST(request:Request){

    const body = await request.text();

    console.log("Body:",body);

    return new Response("OK",{status:200});
}