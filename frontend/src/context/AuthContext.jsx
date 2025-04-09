import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/auth/get-user", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Fetch User Error:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(import.meta.env.VITE_API_URL + "/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);