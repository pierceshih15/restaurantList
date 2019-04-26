module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('warning_msg', "請先登入帳號，才能使用");
    res.redirect('/users/login');
  }
}