const Joi = require("joi");
const {
  userSubscriptionTypes,
} = require("../../models");

const updateSubscriptionSchema =
  Joi.object().keys({
    subscription: Joi.string()
      .required()
      .valid(...userSubscriptionTypes),
  });

module.exports = updateSubscriptionSchema;
