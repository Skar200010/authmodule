const {loginService} = require('../services/auth/user/loginService')
const {registerService} = require('../services/auth/user/registerService')
const {logoutService} = require('../services/auth/user/logoutService')
const {profileService} = require('../services/auth/user/profileService')

exports.register = async (req, res, next) => {

    try {
      const data = await registerService(req.body) 
     
      return res.json(data)
  
    } catch (error) {
      console.log(error);
      if (error.status && error.error) {
        res.status(error.status).send(error.error);
        return next(error);
      }
      if (error.status) {
        res.sendStatus(error.status);
        return next(error);
      }
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return next(error);
    }
  };
  
  // User login
  exports.login = async (req, res , next) => {
    try {
      const data = await loginService(req.body);
      if(data.success){
        return res.json({success : true , token : data.token , message: data.message});
      }
      else{
        return res.status(401).json({success : false , message: data.message })
      }
  
    } catch (error) {
      console.log(error);
      if (error.status && error.error) {
        res.status(error.status).send(error.error);
        return next(error);
      }
      if (error.status) {
        res.sendStatus(error.status);
        return next(error);
      }
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return next(error);
    }
  };
  exports.logout = async (req , res , next) => {
    try {
       const data = await logoutService(req.body, req.headers);
  
        return res.json(data)
        
    } catch (error) {
        console.log(error);
    if (error.status && error.error) {
      res.status(error.status).send(error.error);
      return next(error);
    }
    if (error.status) {
      res.sendStatus(error.status);
      return next(error);
    } 
    res.status(500).json({ status: false, message: "Internal Server Error" });
    return next(error);
        
    }
  
  };
  exports.profile = async (req , res , next) => {
    try {
        const data = await profileService(req.userId)
        return res.json(data)
  
    } catch (error) {
        console.error(error);
        if (error.status && error.error) {
          res.status(error.status).send(error.error);
          return next(error);
        }
        if (error.status) {
          res.sendStatus(error.status);
          return next(error);
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return next(error);
      }
    };