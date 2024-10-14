const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require(`./app`);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Successfuly Connected with DB');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
