const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) return res.status(400).send("No URL provided.");

    try {
        // 1. Fetch the target website
        const response = await axios.get(targetUrl, {
            responseType: 'text',
            headers: { 'User-Agent': 'Mozilla/5.0' } // Pretend to be a browser
        });

        // 2. Strip the security headers that block iframes
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        res.removeHeader('X-Content-Type-Options');

        // 3. Send the modified HTML back to the user
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching the site.");
    }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
