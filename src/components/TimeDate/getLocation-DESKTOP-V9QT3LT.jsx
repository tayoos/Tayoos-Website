const getLocation = async () => {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) {
            throw new Error('Failed to fetch location data.');
        }
        const data = await response.json();
        return {
            ip: data.ip,
            country: data.country,
            region: data.region, // Not always available
            city: data.city, // Not always available
            latitude: data.latitude,
            longitude: data.longitude,
        };
    } catch (err) {
        console.error('Error fetching location:', err.message);
        return null;
    }
};

export default getLocation;
