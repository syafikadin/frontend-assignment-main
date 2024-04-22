import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@/components/Table/Index";
import { Auth } from "@/components/Auth/Auth";
import { useQuery } from "@tanstack/react-query";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";

const queryClient = new QueryClient()

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    return (
        <QueryClientProvider client={queryClient}>
            {!isLoggedIn ? (    //handle is logged in or not
                <Auth onLogin={handleLogin} />
            ) : (
                <App />         //Go to app when logged in
            )}
        </QueryClientProvider>
    );
}

function App() {

    const [accessToken, setAccessToken] = useState(localStorage.accessToken) //retrive token

    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://datacore-dev.machinevision.global/items/perusahaan_bei', {
                headers: {
                    Authorization: `Bearer ${accessToken}` //Use Bearer Token Authorization
                }
            }).then((res) =>
                res.json(),
            ),
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Box
            sx={{
                my: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kode Saham</th>
                        <th>Nama Perusahaan</th>
                        <th>Tanggal Listing</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.kode_saham}</td>
                            <td>{item.nama}</td>
                            <td>{item.tanggal_listing}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Box>
    )
}