const express = require('express');
const cors = require('cors');
const app = express();
const sh = require('./routes/crawlStudentHall');
const sub = require('./routes/crawlSub');
const gunja = require('./routes/crawlGunja');
const port = 4000;

app.use(cors());
app.use('/api', sh);
app.use('/api', sub);
app.use('/api', gunja);

app.listen(port, ()=>console.log(`실행중 ${port}`));
