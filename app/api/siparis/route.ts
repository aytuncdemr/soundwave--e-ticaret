export async function POST(request:Request){

    const body = await request.json();

    console.log("Body:",body);

    return new Response(JSON.stringify({message:"SoundwaveSKY Başarıyla iletinizi almıştır."}),{status:200});
}