const Joi = require("joi");
const {
  userSubscriptionTypes,
} = require("../../models");

const addUserSchema = Joi.object().keys({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ multiple: false })
    .required(),
  subscription: Joi.string().valid(
    ...userSubscriptionTypes
  ),
});

module.exports = addUserSchema;
