const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down...');
  console.log(err);
  // process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require(`./app`);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Successfuly Connected with DB');
  })
  .catch((err) => {
    console.log(err.name, err.message);
  });

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
