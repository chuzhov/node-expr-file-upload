const { Schema, model } = require("mongoose");

//in this case, getting 'admin' role is possible only manually by mongoDB admin
const usersRoles = ["customer", "admin"];

const userSubscriptionTypes = [
  "starter",
  "pro",
  "business",
];

const userSchema = Schema(
  {
    name: {
      type: String,
      required: false,
      default: function () {
        return this.email;
      },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: usersRoles,
      default: usersRoles[0], //to get admin role you schould edit this field manually
      validate: {
        validator: function (value) {
          value === "admin" ? false : true;
        },
        message: (props) =>
          `${props.value} could not be assigned this way`,
      },
    },
    subscription: {
      type: String,
      enum: userSubscriptionTypes,
      default: userSubscriptionTypes[0],
    },
    token: String,
  },
  { timestamps: true }
);

//this is example how to create custom validator for the whole Schema:
userSchema.methods.validateSchema = function () {
  const errors = this.validateSync();
  if (errors) {
    throw new Error(errors.message);
  }
};

const User = model("user", userSchema);

module.exports = { User, userSubscriptionTypes };
