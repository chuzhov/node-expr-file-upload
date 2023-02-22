const {
  Contact,
  User,
} = require("../../models/index");
const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const removeUser = async (req, res) => {
  const { userId } = req.params;
  const dbUserAnswer = await User.deleteOne({
    _id: userId,
  });
  if (!dbUserAnswer)
    throw HttpError(
      404,
      `Not found. [id ${req.params.contactId}]`
    );
  const dbUsersContactsAnswer =
    await Contact.deleteMany({ owner: userId });

  res.json({
    "User deleted": dbUserAnswer,
    "User`s contacts deleted":
      dbUsersContactsAnswer,
  });
};

module.exports = removeUser;
