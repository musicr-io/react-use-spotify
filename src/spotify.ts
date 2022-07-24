
export function loadSpotifySDK(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const existingScript = document.getElementById('spotify-player');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.id = 'spotify-player';
            script.async = true;
            script.onload = () => resolve(true)
            script.onerror = () => reject(false);
            document.head.appendChild(script);
            return
        }
        resolve(true)
    });
}

export function isValidVolume(volume: number): boolean {
    return volume >= 0 && volume <= 1;
}