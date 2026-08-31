require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const proxy = require('express-http-proxy');

const app = express();
app.use(cors());

const UPLOAD_SERVICE_URL = process.env.UPLOAD_SERVICE_URL;
const FILE_SERVICE_URL = process.env.FILE_SERVICE_URL;
const METADATA_SERVICE_URL = process.env.METADATA_SERVICE_URL;

// /api/upload → upload-service /upload
app.use('/api/upload', proxy(UPLOAD_SERVICE_URL, {
    proxyReqPathResolver: () => '/upload',
}));

// /api/files → file-service /files
app.use('/api/files', proxy(FILE_SERVICE_URL, {
    proxyReqPathResolver: (req) => '/files' + req.url,
}));

// /api/metadata → metadata-service /metadata
app.use('/api/metadata', proxy(METADATA_SERVICE_URL, {
    proxyReqPathResolver: (req) => '/metadata' + req.url,
}));

// Health check
app.get('/health', async (req, res) => {
    const services = [
        { name: 'Upload Service', url: UPLOAD_SERVICE_URL },
        { name: 'File Service', url: FILE_SERVICE_URL },
        { name: 'Metadata Service', url: METADATA_SERVICE_URL },
    ];

    const checks = await Promise.allSettled(
        services.map(({ url, name }) =>
            axios.get(`${url}/health`).then((r) => ({ service: name, status: r.data.status }))
        )
    );

    const results = checks.map((c, i) =>
        c.status === 'fulfilled'
            ? c.value
            : { service: services[i].name, status: 'DOWN' }
    );

    const allUp = results.every((r) => r.status === 'UP');
    res.status(allUp ? 200 : 207).json({ gateway: 'UP', services: results });
});

app.listen(process.env.GATEWAY_PORT, () =>
    console.log(`API Gateway → http://localhost:${process.env.GATEWAY_PORT}`)
);