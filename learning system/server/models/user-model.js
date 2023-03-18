const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 16,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher"],
  },
  date: {
    type: Date,
    default: Date(),
  },
});

userSchema.methods.idStudent = () => {
  return this.role == "student";
};

userSchema.methods.isTeacher = () => {
  return this.role == "teacher";
};

userSchema.methods.isAdmin = () => {
  return this.role == "admin";
};

// userSchema.methods.comparePassword = function (password, cd) {
//   bcrypt.compare(password, this.password, (err, result) => {
//     if (err) {
//       return cb(err, result);
//     }
//     return cb(null, result);
//   });
// };

// //midleware function
// userSchema.pre("save", async (next) => {
//   console.log("5");
//   if (this.isModified("password") || this.isNew) {
//     console.log("1");
//     const hash = await bcrypt.hash(this.password, 10);
//     console.log("2");
//     this.password = hash;
//     console.log("3");
//     next();
//   } else {
//     console.log("6");
//     next();
//   }
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
