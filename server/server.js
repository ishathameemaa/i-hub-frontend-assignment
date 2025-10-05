import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your-secret-key";

const mockUsers = [
  { id: "1", email: "admin@example.com", role: "admin", name: "Admin User" },
  { id: "2", email: "employee@example.com", role: "employee", name: "Employee User" },
  { id: "3", email: "superadmin@example.com", role: "super-admin", name: "Super Admin User" },
];


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = mockUsers.find((u) => u.email === email);

  if (!user || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({ token, user });
});


app.get("/", (req, res) => {
  res.send("Mock Auth API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Mock API running on http://localhost:${PORT}`));
