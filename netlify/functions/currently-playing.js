const axios = require('axios');

exports.handler = async (event) => {
    try {
        const aEP = process.env.AEP; // Access the API endpoint
        if (!aEP) {
            console.error('API endpoint (AEP) is not defined in environment variables.');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'API endpoint not configured' }),
            };
        }

        const response = await axios.get(aEP);

        // Forward the response from the AWS REST API
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error in proxy function:', error);

        // Handle specific errors from the AWS REST API
        if (error.response) {
            console.error('AWS REST API Error:', error.response.status, error.response.data);
            return {
                statusCode: error.response.status || 500,
                body: JSON.stringify({ error: error.response.data?.message || 'Internal Server Error' }),
            };
        }

        // Generic error handling
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
