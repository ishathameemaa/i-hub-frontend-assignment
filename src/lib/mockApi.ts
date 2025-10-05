interface LoginData {
  email: string;
  password: string;
}

export async function mockLogin(data: LoginData) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}