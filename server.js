const express = require('express');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 3000;

// 🔑 SECRET (usahakan panjang & random)
const SECRET = "panzox_super_secret_123";

// derive key (32 byte) + IV (16 byte)
const KEY = crypto.createHash('sha256').update(SECRET).digest();
const IV = Buffer.alloc(16, 0); // IV statis biar simpel (lihat catatan di bawah)

// fungsi encrypt
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// list command
const COMMANDS = [
    { name: "Normal", value: "cmd game set --downscale 1.0 com.dts.freefireth" },
    { name: "Medium", value: "cmd game set --downscale 1.5 com.dts.freefireth" },
    { name: "High", value: "cmd game set --downscale 2.0 com.dts.freefireth" }
];

// endpoint
app.get('/api/cmd', (req, res) => {
    const data = COMMANDS.map(c => ({
        name: c.name,
        value: encrypt(c.value) // 🔐 AES
    }));

    res.json({ status: "ok", data });
});

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
