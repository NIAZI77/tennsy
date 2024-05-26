import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db(process.env.MONGODB_DB);
      const collection = database.collection("products");
      const result = await collection.insertOne(req.body);
      res.status(200).json({ message: "Product added successfully", productId: result.insertedId });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
