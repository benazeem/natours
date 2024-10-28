const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Review = require('../../models/reviewModel')
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Successfuly Connected with DB');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};


const importReviews = async ()=>{
  try {await Review.create(reviews) }catch(err){
    console.log(err)
  }
  process.exit()
}

const deleteReviews = async ()=>{
  try{await Review.deleteMany()}catch(err){
    console.log(err)
  }
  process.exit()
}



if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--importR') {
  importReviews()
} else if (process.argv[2] === '--deleteR') {
  deleteReviews();
}

console.log(process.argv);



