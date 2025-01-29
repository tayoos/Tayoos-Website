import axios from 'axios';

// Debug log to check environment variables
console.log('Environment Variables Check:', {
    VITE_SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID?.slice(0, 4) + '...',
    VITE_SPOTIFY_CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET ? 'Present' : 'Missing',
    VITE_SPOTIFY_REFRESH_TOKEN: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN ? 'Present' : 'Missing',
});

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

class SpotifyService {
    constructor() {
        // Log the actual values we're working with (first 4 chars only for security)
        console.log('SpotifyService Initialization:', {
            clientIdPrefix: SPOTIFY_CLIENT_ID?.slice(0, 4) || 'missing',
            hasClientSecret: !!SPOTIFY_CLIENT_SECRET,
            hasRefreshToken: !!SPOTIFY_REFRESH_TOKEN,
            rawClientIdType: typeof SPOTIFY_CLIENT_ID,
            rawClientSecretType: typeof SPOTIFY_CLIENT_SECRET,
            rawRefreshTokenType: typeof SPOTIFY_REFRESH_TOKEN,
        });

        this.lastApiCall = null;
        this.minCallInterval = 1000; // minimum 1 second between calls

        this.accessToken = null;
        this.tokenExpiryTime = null;
    }
    async throttleCall() {
        if (this.lastApiCall) {
            const timeSinceLastCall = Date.now() - this.lastApiCall;
            if (timeSinceLastCall < this.minCallInterval) {
                await new Promise((resolve) => setTimeout(resolve, this.minCallInterval - timeSinceLastCall));
            }
        }
        this.lastApiCall = Date.now();
    }
    async refreshAccessToken() {
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
            throw new Error('Missing required Spotify credentials');
        }

        const tokenData = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN.trim(), // Add trim() to remove any whitespace
        });

        const base64Credentials = btoa(`${SPOTIFY_CLIENT_ID.trim()}:${SPOTIFY_CLIENT_SECRET.trim()}`);

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', tokenData, {
                headers: {
                    Authorization: `Basic ${base64Credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.data || !response.data.access_token) {
                throw new Error('Invalid token response from Spotify');
            }

            this.accessToken = response.data.access_token;
            this.tokenExpiryTime = Date.now() + response.data.expires_in * 1000;

            return this.accessToken;
        } catch (error) {
            // Add more specific error handling
            if (error.response?.status === 400) {
                throw new Error('Invalid Spotify credentials or refresh token');
            }
            throw error;
        }
    }

    async getCurrentlyPlaying() {
        await this.throttleCall();
        try {
            console.log('Fetching currently playing track...');

            // Ensure we have a valid token
            if (!this.accessToken || Date.now() >= this.tokenExpiryTime) {
                console.log('No valid token, refreshing...');
                await this.refreshAccessToken();
            }

            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });

            console.log('Spotify API Response:', {
                status: response.status,
                hasData: !!response.data,
                dataType: response.data ? typeof response.data : null,
            });

            // If no track is playing, return null
            if (response.status === 204 || !response.data) {
                console.log('No track currently playing');
                return null;
            }

            // Log the raw response data for debugging
            console.log('Track data:', {
                name: response.data.item?.name,
                artists: response.data.item?.artists,
                album: response.data.item?.album?.name,
                isPlaying: response.data.is_playing,
            });

            // Check if we have the necessary data
            if (!response.data.item) {
                console.log('No item in response data');
                return null;
            }

            // Return formatted track info
            return {
                title: response.data.item.name,
                artist: response.data.item.artists.map((artist) => artist.name).join(', '),
                album: response.data.item.album.name,
                isPlaying: response.data.is_playing,
                service: 'spotify',
            };
        } catch (error) {
            console.error('Error fetching current track:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });

            if (error.response?.status === 401) {
                console.log('Token expired, attempting refresh...');
                try {
                    await this.refreshAccessToken();
                    return this.getCurrentlyPlaying();
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            }

            return null;
        }
    }

    // Helper method to test the connection
    async testConnection() {
        try {
            console.log('Testing Spotify connection...');
            await this.refreshAccessToken();
            const result = await this.getCurrentlyPlaying();
            console.log('Connection test result:', {
                hasToken: !!this.accessToken,
                tokenExpiry: this.tokenExpiryTime,
                currentTrack: result,
            });
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
    // Add this helper method to your SpotifyService class
    async debugTokenRefresh() {
        // Check environment variables
        console.log('Debug Info:', {
            // Only show first 4 chars of sensitive data
            clientIdPrefix: SPOTIFY_CLIENT_ID?.slice(0, 4),
            clientSecretPrefix: SPOTIFY_CLIENT_SECRET?.slice(0, 4),
            refreshTokenPrefix: SPOTIFY_REFRESH_TOKEN?.slice(0, 4),
            // Check lengths
            clientIdLength: SPOTIFY_CLIENT_ID?.length || 0,
            clientSecretLength: SPOTIFY_CLIENT_SECRET?.length || 0,
            refreshTokenLength: SPOTIFY_REFRESH_TOKEN?.length || 0,
            // Check for common issues
            hasWhitespace: {
                clientId: SPOTIFY_CLIENT_ID?.includes(' ') || false,
                clientSecret: SPOTIFY_CLIENT_SECRET?.includes(' ') || false,
                refreshToken: SPOTIFY_REFRESH_TOKEN?.includes(' ') || false,
            },
            // Verify Base64 encoding
            base64Check: {
                isValid: true,
                encoded: btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).slice(0, 10) + '...',
            },
        });

        try {
            await this.refreshAccessToken();
            console.log('Token refresh successful!');
        } catch (error) {
            console.error('Detailed refresh error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers,
            });
        }
    }
}

// Create instance and immediately test environment variables
const spotifyService = new SpotifyService();

// Immediate test of environment variables
console.log('Final environment check:', {
    hasClientId: !!SPOTIFY_CLIENT_ID,
    hasClientSecret: !!SPOTIFY_CLIENT_SECRET,
    hasRefreshToken: !!SPOTIFY_REFRESH_TOKEN,
});

export default spotifyService;
