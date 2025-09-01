"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in (stub)</h1>
      <input className="border p-2 w-full mb-2" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-4" placeholder="password (use 'demo')" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded"
        onClick={()=>signIn("credentials",{email,password,callbackUrl:"/dashboard"})}>
        Sign in
      </button>
    </div>
  );
}
