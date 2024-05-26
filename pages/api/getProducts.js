import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      const database = client.db(process.env.MONGODB_DB);
      const collection = database.collection("products");
      const products = await collection.find({}).toArray();
      const formattedProducts = products.map((product) => ({
        id: product._id.toString(),
        ...product,
        title: product.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }));
      res.status(200).json(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
      console.log("MongoDB connection closed");
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
