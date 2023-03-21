const mongoose = require("mongoose");
const path =require("path");

require ("dotenv").config();
console.log(process.env.MONGO_URI);

//connect to data base

mongoose.connect(process.env.MONGO_URI, {family: 4})
  .then(() => console.log('Connected To MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err.message));

//Schema
const PersonSchema = new mongoose.Schema({
    name:{type:String ,required:true}  ,
    age: {type:Number},
    favoriteFoods: [{type:String }],

  });
// Model
const Person = mongoose.model('Person', PersonSchema);

// Create Person 
const createPerson = async () => {
const Person = new Person({
      fullName: 'Jane Doe',
      age: 25,
      favoriteFoods:["Spaguetti","Hamburgur"],
    })

    try {
      const result = await Person.save();
      console.log(result)
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
// create people 

  let arrayOfPeople = [
    {
      name: "Sara",
      age: 40,
      favoriteFoods: ["pasta", "cheese"],
    },
    {
      name: "lina",
      age: 25,
      favoriteFoods: ["KFC", "Pizza"],
    },
  ];
  Person.create(arrayOfPeople, (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
  Person.create(arrayOfPeople)
  .then((savedPeople) => {
    console.log("People saved successfully!");
  })
  .catch((error) => {
    console.error(error);
  });

// Search in db
Person.find({ name: "Bob" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  
//Search one person which has a certain food in the person's favorites

Person.findOne({ favoriteFoods: 0 })
  .then((person) => {
    console.log(person);
  })
  .catch((err) => {
    console.error(err);
  });
//Find by Id

Person.findById(" ")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
//Perform Classic Updates by Running Find, Edit, then Save

const doc = await Person.findById("");
console.log(doc);

person.favoriteFoods.push("hamburger");

person.save(function (err, updatedPerson) {
  if (err) return console.error(err);

  console.log("Updated Person:", updatedPerson);
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate(
  { firstName: "lina" },
  { age: 20 },
  { new: true },
  function (err, updatedPerson) {
    if (err) {
      console.log("Error updating person:", err);
    } else {
      console.log("Updated person:", updatedPerson);
    }
  }
);
// Delete One Document Using model.findByIdAndRemove

const personId = mongoose.Types.ObjectId("");

Person.findByIdAndRemove(personId, function (err, deletedPerson) {
  if (err) {
    console.log("Error while deleting person:", err);
  } else {
    console.log("Deleted person:", deletedPerson);
  }
});

//Delete Many Documents with model.remove()
Person.deleteMany({ firstName: "lina" }, function (err, result) {
  if (err) {
    console.log("Error while deleting people:", err);
  } else {
    console.log("Number of people deleted:", result.deletedCount);
  }
});

//Chain Search Query Helpers to Narrow Search Results

Person.find({ favoriteFoods: "Pizza" })
  .sort("firstName")
  .limit(2)
  .select("-age")
  .exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("People who like Pizza:", data);
    }
  });