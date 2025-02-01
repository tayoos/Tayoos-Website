const axios = require('axios');

exports.handler = async (event) => {
    try {
        // Replace this with your actual AWS REST API endpoint
        const apiEndpoint = 'https://<api-id>.execute-api.<region>.amazonaws.com/prod/currently-playing';

        const response = await axios.get(apiEndpoint);

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
