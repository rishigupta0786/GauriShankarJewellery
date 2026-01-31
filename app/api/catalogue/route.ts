import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Create a simple schema
const catalogueSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Catalogue = mongoose.models.Catalogue || mongoose.model('Catalogue', catalogueSchema);

export async function GET() {
  try {
    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
    
    // Fetch all items, sorted by newest first
    const items = await Catalogue.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }
    
    const body = await request.json();
    
    // Create and save
    const item = new Catalogue(body);
    await item.save();
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}