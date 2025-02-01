const axios = require('axios');

exports.handler = async (event) => {
    try {
        // Retrieve the API endpoint from environment variables
        const aEP = import.meta.env.AEP;

        // Forward the request to your AWS REST API
        const response = await axios.get(aEP);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error in proxy function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
