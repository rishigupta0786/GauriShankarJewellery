import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const catalogueSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Catalogue = mongoose.models.Catalogue || mongoose.model('Catalogue', catalogueSchema);

// GET single item
export async function GET(request, context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const item = await Catalogue.findById(id);
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}

// UPDATE item
export async function PUT(request, context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const { id } = await context.params;
    const body = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    // Validate required fields
    if (!body.title || !body.subtitle) {
      return NextResponse.json(
        { error: "Title and subtitle are required" },
        { status: 400 }
      );
    }
    
    const updatedItem = await Catalogue.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(request, context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const result = await Catalogue.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}