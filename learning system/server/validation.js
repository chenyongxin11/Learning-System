const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(16),
    email: Joi.string().required().email().min(6).max(1024),
    password: Joi.string().required().min(6).max(1024),
    role: Joi.string().required().valid("student", "teacher"),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(6).max(1024),
    password: Joi.string().required().min(6).max(1024),
  });
  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(3).max(100),
    price: Joi.number().required().min(0).max(200),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
