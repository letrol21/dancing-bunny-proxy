const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const targetUrl = req.query.query;
    
    // 1. If no URL, show a simple status page
    if (!targetUrl) {
        return res.send("Dancing Bunny Proxy is Online. Usage: /?query=https://example.com");
    }

    try {
        console.log(`Fetching: ${targetUrl}`);

        // 2. Fetch with a timeout and real browser headers
        const response = await axios.get(targetUrl, {
            timeout: 10000, // Stop waiting after 10 seconds
            responseType: 'text',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Connection': 'keep-alive'
            }
        });

        // 3. Strip security headers that block iframes
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        res.removeHeader('Content-Security-Policy-Report-Only');
        res.set('Access-Control-Allow-Origin', '*');

        res.send(response.data);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`
            <body style="background:#000;color:#f55;font-family:sans-serif;padding:20px;">
                <h3>Proxy Error</h3>
                <p>Could not load: ${targetUrl}</p>
                <p>Reason: ${error.message}</p>
                <p><i>Tip: Some sites (Google/Instagram) block cloud-based proxies entirely.</i></p>
            </body>
        `);
    }
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
