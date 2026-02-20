export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "import export";
  const page = searchParams.get("page") || 1;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&page=${page}&apikey=${process.env.GNEWS_API_KEY}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // cache 5 min
    });

    const data = await res.json();

    return Response.json(data);
  } catch (e) {
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
