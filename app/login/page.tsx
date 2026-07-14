"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";

import { useAuthStore } from "@/store/auth-store";

import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const { token, setToken } = useAuthStore();

    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token || localStorage.getItem("access_token")) {
            router.push("/dashboard");
        }
    }, []);

    async function handleLogin() {
        setError("");
        setLoading(true);

        try {
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

            setToken(response.data.access_token);
            router.push("/dashboard");
        } catch {
            setError("Téléphone ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-10 max-w-md mx-auto">

            <h1 className="text-3xl font-bold mb-5">
                Connexion
            </h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <input
                className="border p-3 w-full mb-3 rounded"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) =>
                    setPhone(e.target.value)
                }
            />

            <input
                type="password"
                className="border p-3 w-full mb-3 rounded"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
                disabled={loading || !phone || !password}
                className="bg-black text-white px-5 py-3 rounded disabled:opacity-50"
            >
                {loading ? "Connexion..." : "Se connecter"}
            </button>

        </div>
    );
}