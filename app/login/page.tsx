"use client";

import { useState } from "react";

import { api } from "@/services/api";

import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [phone, setPhone] = useState("");

    const [password, setPassword] =
        useState("");

    async function handleLogin() {

        const formData = new URLSearchParams();

        formData.append("username", phone);

        formData.append("password", password);

        const response = await api.post(
            "/auth/login",
            formData,
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                }
            }
        );

        localStorage.setItem(
            "access_token",
            response.data.access_token
        );

        router.push("/dashboard");
    }

    return (
        <div className="p-10 max-w-md mx-auto">

            <h1 className="text-3xl font-bold mb-5">
                Connexion
            </h1>

            <input
                className="border p-3 w-full mb-3"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) =>
                    setPhone(e.target.value)
                }
            />

            <input
                type="password"
                className="border p-3 w-full mb-3"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
                className="bg-black text-white px-5 py-3"
            >
                Se connecter
            </button>

        </div>
    );
}