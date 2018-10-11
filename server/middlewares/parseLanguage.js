module.exports = (req, res, next) => {
  const languages = req.acceptsLanguages();
  const userLng = languages ? languages[0] : 'en';
  req.langauge = userLng;
  next();
};
