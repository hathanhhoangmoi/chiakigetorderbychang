const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/api/order/:inoutputId', async (req, res) => {
  const { inoutputId } = req.params;
  const cookie = req.headers['x-cookie'] || '';

  try {
    const response = await fetch(
      `https://ec.megaads.vn/service/inoutput/find-promotion-codes-api?inoutputId=${inoutputId}`,
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate',
          'platform': 'ios',
          'Cookie': `laravel_session=${cookie}`,
          'User-Agent': 'chiakiApp/3.6.2'
        }
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
