const mainPage = require("../../templates/mainPage");

const getMainPage = async (req, res) => {
  const markup = mainPage();
  res.send(markup);
};

module.exports = getMainPage;
