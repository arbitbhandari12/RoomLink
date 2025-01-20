const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db.js');
const router = require('./router/auth-router.js');
const PropertyRouter = require('./router/Property-router.js');
const shifting = require("./router/shiftRequest-router.js")
const adminRouter = require('./router/admin-router.js');
const cors = require('cors');
const app = express();

dotenv.config();

const coreOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, POST ,PUT ,DELETE ,PATCH, HEAD',
  credentials: true
};

app.use(cors(coreOptions));
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT || 4000;

app.use('/api/auth', router);
app.use('/api/properties', PropertyRouter);
app.use('/api/shifting', shifting);
app.use('/api/admin', adminRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// GZGpctYGDvnhWy9I
