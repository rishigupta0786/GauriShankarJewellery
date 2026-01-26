import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminUser from "../../../models/AdminUser";
export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await connectDB();

    const user = await AdminUser.findOne({ username });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create response
    const response = NextResponse.json({ message: "Login successful" });

    // ✅ Set login cookie
    response.cookies.set("isLoggedIn", "true", {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
