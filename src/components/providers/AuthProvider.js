import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signin as login } from "../../apis/auth";
import { signout as logout } from "../../apis/auth";
// import { getCountryy as getCountry } from "../../apis/countries"
import { AuthContext } from "../../context";


export default function AuthProvider({ children }) {
    const initialUser = useLoaderData();
    const [user, setUser] = useState(initialUser);
    // const [country, setCountry] = useState("");

    async function signin(credentials) {
        const newUser = await login(credentials);
        setUser(newUser);
    }

    async function signout() {
        await logout();
        setUser(null);
    }

    // async function getCountryy() {
    //     const newCountry = await getCountry();
    //     setCountry(newCountry);
    // }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}