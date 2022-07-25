import { useEffect, useState } from "react"

type useSpotifyAuthProps = {
    clientID: string;
    clientSecret: string;
}
const useSpotifyAuth = ({ clientSecret, clientID }: useSpotifyAuthProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);

    const aquireAccessToken = async () => {
        if (authToken) {
            const res = await fetch(`https://accounts.spotify.com/api/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=authorization_code&code=${authToken}&redirect_uri=http://localhost:5173`,
            })
            const json = await res.json();
            setAccessToken(json.access_token);
            setRefreshToken(json.refresh_token);
        }
    }

    const refreshAccessToken = async () => {
        console.log("refreshing token")
        const res = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            })
        })
        const json = await res.json();
        setAccessToken(json.access_token);
    }

    useEffect(() => {
        if (authToken) {
            aquireAccessToken();
        }
    }, [authToken])

    return { accessToken, refreshAccessToken, aquireAccessToken, setAuthToken }
}

export default useSpotifyAuth;