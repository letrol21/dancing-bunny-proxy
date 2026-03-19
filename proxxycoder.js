const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("No URL provided.");

    try {
        const response = await axios.get(targetUrl, {
            responseType: 'text',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        // Delete the headers that block iframes
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Proxy error: Could not reach the site.");
    }
});

app.listen(PORT, () => console.log(`Proxy active on port ${PORT}`));
