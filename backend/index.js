const router = require('./routes/index');
const cors = require('cors');
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`server is running at ${PORT}....`));
