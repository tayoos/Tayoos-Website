import axios from 'axios';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

class SpotifyService {
    static instance = null;
    constructor() {
        if (SpotifyService.instance) {
            return SpotifyService.instance;
        }

        this.accessToken = null;
        this.tokenExpiryTime = null;
        this.lastApiCall = null;
        this.minCallInterval = 1000;

        // Validate credentials on initialization
        this.validateCredentials();

        SpotifyService.instance = this;
    }

    validateCredentials() {
        /*console.log('Validating Spotify credentials:', {
            hasClientId: !!SPOTIFY_CLIENT_ID,
            hasClientSecret: !!SPOTIFY_CLIENT_SECRET,
            hasRefreshToken: !!SPOTIFY_REFRESH_TOKEN,
            clientIdLength: SPOTIFY_CLIENT_ID?.length,
            tokenLength: SPOTIFY_REFRESH_TOKEN?.length,
        });*/ // Testing to be removed.

        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
            throw new Error('Missing required Spotify credentials');
        }
    }

    async ensureValidToken() {
        if (!this.accessToken || !this.tokenExpiryTime || Date.now() >= this.tokenExpiryTime - 60000) {
            await this.refreshAccessToken();
        }
    }

    async refreshAccessToken() {
        try {
            const tokenData = new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_REFRESH_TOKEN.trim(),
            });

            // Base64 encode the client ID and client secret
            const base64Credentials = btoa(`${SPOTIFY_CLIENT_ID.trim()}:${SPOTIFY_CLIENT_SECRET.trim()}`);

            const response = await axios.post('https://accounts.spotify.com/api/token', tokenData, {
                headers: {
                    Authorization: `Basic ${base64Credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.data?.access_token) {
                throw new Error('Invalid token response from Spotify');
            }

            this.accessToken = response.data.access_token;
            this.tokenExpiryTime = Date.now() + response.data.expires_in * 1000;

            return this.accessToken;
        } catch (error) {
            console.error('Token refresh error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });

            if (error.response?.status === 400) {
                throw new Error('Invalid Spotify credentials or refresh token. Please check your environment variables.');
            }

            throw error;
        }
    }

    async getCurrentlyPlaying() {
        try {
            await this.ensureValidToken();

            // Implement rate limiting
            if (this.lastApiCall) {
                const timeSinceLastCall = Date.now() - this.lastApiCall;
                if (timeSinceLastCall < this.minCallInterval) {
                    await new Promise((resolve) => setTimeout(resolve, this.minCallInterval - timeSinceLastCall));
                }
            }
            this.lastApiCall = Date.now();

            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });

            // No track playing
            if (response.status === 204 || !response.data) {
                return null;
            }

            // Ensure we have valid track data
            if (!response.data.item) {
                return null;
            }

            // Extract album artwork (use the medium-sized image by default)
            const albumArtwork = response.data.item.album.images.find((image) => image.height === 300)?.url || response.data.item.album.images[0]?.url; // Fallback to the first available image

            return {
                title: response.data.item.name,
                artist: response.data.item.artists.map((artist) => artist.name).join(', '),
                album: response.data.item.album.name,
                isPlaying: response.data.is_playing,
                service: 'spotify',
                albumArtwork: albumArtwork, // Add album artwork URL
            };
        } catch (error) {
            console.error('Error fetching current track:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });

            if (error.response?.status === 401) {
                // Token expired, try refreshing once
                this.accessToken = null;
                return this.getCurrentlyPlaying();
            }

            throw error;
        }
    }
}

// Export a singleton instance
export default new SpotifyService();
