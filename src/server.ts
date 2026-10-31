import app from './app';
import config from './config';
import connectDB from './config/db';

const PORT = config.port;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${config.env} mode`);
  });
};

startServer();