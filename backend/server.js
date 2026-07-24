import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';
import logger from './src/config/logger.js';
import { startLimitCheckJob } from './src/jobs/limitCheckJob.js';
import { startDailySummaryJob } from './src/jobs/dailySummaryJob.js';


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
   
    startLimitCheckJob();
    startDailySummaryJob();

  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();