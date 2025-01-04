import axios from 'axios';
import * as jose from 'jose';

const APPLE_TEAM_ID = import.meta.env.VITE_APPLE_TEAM_ID;
const APPLE_KEY_ID = import.meta.env.VITE_APPLE_KEY_ID;
const APPLE_PRIVATE_KEY = import.meta.env.VITE_APPLE_PRIVATE_KEY;

class AppleMusicService {
    constructor() {
        this.developerToken = null;
        this.tokenExpiryTime = null;
    }

    async generateDeveloperToken() {
        try {
            // Convert the private key from base64 if needed
            const privateKeyDER = atob(APPLE_PRIVATE_KEY.replace(/-----BEGIN PRIVATE KEY-----|\n|-----END PRIVATE KEY-----/g, ''));
            const privateKeyBytes = new Uint8Array(privateKeyDER.split('').map((c) => c.charCodeAt(0)));

            // Import the private key
            const privateKey = await jose.importPKCS8(privateKeyBytes, 'ES256');

            // Create the JWT
            const jwt = await new jose.SignJWT({})
                .setProtectedHeader({
                    alg: 'ES256',
                    kid: APPLE_KEY_ID,
                })
                .setIssuedAt()
                .setIssuer(APPLE_TEAM_ID)
                .setExpirationTime('24h')
                .sign(privateKey);

            this.developerToken = jwt;
            this.tokenExpiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
            return jwt;
        } catch (error) {
            console.error('Error generating developer token:', error);
            throw error;
        }
    }

    async getCurrentlyPlaying() {
        try {
            // Check if token needs refresh
            if (!this.developerToken || Date.now() >= this.tokenExpiryTime) {
                await this.generateDeveloperToken();
            }

            const response = await axios.get('https://api.music.apple.com/v1/me/recent/played', {
                headers: {
                    Authorization: `Bearer ${this.developerToken}`,
                    'Music-User-Token': localStorage.getItem('apple_music_user_token'),
                },
            });

            if (!response.data.data.length) {
                return null;
            }

            const recentTrack = response.data.data[0];
            return {
                title: recentTrack.attributes.name,
                artist: recentTrack.attributes.artistName,
                album: recentTrack.attributes.albumName,
                isPlaying: false,
                service: 'apple',
            };
        } catch (error) {
            console.error('Error fetching Apple Music status:', error);
            return null;
        }
    }
}

export default new AppleMusicService();
