import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Updated schema with jewelry fields
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  categoryId: String,
  // New jewelry fields
  articleCode: String,
  grossWeight: String,
  netWeight: String,
  designName: String,
  purity: String,
  gallery: {
    image: String,
    side1: String,
    side2: String,
    side3: String
  },
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export async function GET(request) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let query = {};
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    const items = await Item.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const body = await request.json();
    
    if (!body.name || !body.description || !body.price) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }
    
    // Ensure gallery object exists
    const itemData = {
      ...body,
      gallery: body.gallery || {
        image: "",
        side1: "",
        side2: "",
        side3: ""
      }
    };
    
    const item = new Item(itemData);
    await item.save();
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

// Updated PUT method - accept ID in body like DELETE
export async function PUT(request) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    const body = await request.json();
    const { id, ...updateData } = body;
    
    console.log("PUT request body:", body);
    console.log("ID to update:", id);
    console.log("Update data:", updateData);
    
    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }
    
    if (!updateData.name || !updateData.description || !updateData.price) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID format" }, { status: 400 });
    }
    
    const item = await Item.findByIdAndUpdate(
      id,
      {
        ...updateData,
        gallery: updateData.gallery || {
          image: "",
          side1: "",
          side2: "",
          side3: ""
        }
      },
      { new: true }
    );
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    // Get ID from request body
    const body = await request.json();
    const { id } = body;
    
    console.log("Delete request body:", body);
    console.log("ID to delete:", id);
    
    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID format" }, { status: 400 });
    }
    
    const item = await Item.findByIdAndDelete(id);
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Item deleted successfully",
      deletedId: id 
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}