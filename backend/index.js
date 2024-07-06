// import status from 'http-status';
import pkg from 'express';
import express from 'express';

const { json, urlencoded } = pkg;
const app = express()
import { serve, setup } from 'swagger-ui-express';
import swaggerFile from './swagger.json' assert { type: 'json' };


import cors from "cors";
import helmet from "helmet";

import category from './src/routes/category.js';
import activity from './src/routes/activity.js';
import user from './src/routes/user.js';
import authRoutes from './src/routes/authRoutes.js';
// import dotenv from 'dotenv';
// dotenv.config();

app.use(cors());
app.use(helmet());
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/categoria', category)
app.use('/atividade', activity)
app.use('/usuario', user)
app.use('/auth', authRoutes);
app.use('/api-doc', serve, setup(swaggerFile))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
