const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// list command kamu
const COMMANDS = [
    {
        name: "Normal",
        value: "cmd game set --downscale 1.0 com.dts.freefireth"
    },
    {
        name: "Medium",
        value: "cmd game set --downscale 1.5 com.dts.freefireth"
    },
    {
        name: "High",
        value: "cmd game set --downscale 2.0 com.dts.freefireth"
    }
];

// endpoint API
app.get('/api/cmd', (req, res) => {

    // encode biar nggak keliatan jelas
    const data = COMMANDS.map(c => ({
        name: c.name,
        value: Buffer.from(c.value).toString('base64')
    }));

    res.json({
        status: "ok",
        data: data
    });
});

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
