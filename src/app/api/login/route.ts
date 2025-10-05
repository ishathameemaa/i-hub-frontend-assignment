import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const mockUsers = [
  { id: "1", email: "admin@example.com", role: "admin", name: "Admin User" },
  { id: "2", email: "employee@example.com", role: "employee", name: "Employee User" },
  { id: "3", email: "superadmin@example.com", role: "super-admin", name: "Super Admin User" },
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

 
  const user = mockUsers.find(u => u.email === email);

  if (!user || password !== "password") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token, user });
}