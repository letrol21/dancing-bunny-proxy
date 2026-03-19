const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic "Heartbeat" to check if server is awake
app.get('/', (req, res) => {
    if (req.query.query) {
        return handleProxy(req, res);
    }
    res.send("Server is Online and Ready.");
});

async function handleProxy(req, res) {
    const targetUrl = req.query.query;
    
    try {
        const response = await axios.get(targetUrl, {
            timeout: 10000, // 10 second limit
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        // Strip security headers
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        res.removeHeader('Content-Security-Policy-Report-Only');
        
        // Send the data
        res.send(response.data);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).send(`Proxy Error: Could not load ${targetUrl}. The site might be blocking proxy requests.`);
    }
}

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
