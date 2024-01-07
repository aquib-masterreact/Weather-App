const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const locations = ["Mumbai","Kolkata","Chennai","Delhi"];

app.get('/locations', (req, res) => {
  res.json(locations);
});

app.post('/locations', (req, res) => {
  const { name } = req.body;
    if (!name) {
    return res.status(400).json({ error: 'Name is required for a location' });
  }

  if (locations.some(location => location.name === name)) {
    return res.status(400).json({ error: 'Location with the same name already exists' });
  }

  locations.push({ name });

  res.json({ message: 'Location added successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
