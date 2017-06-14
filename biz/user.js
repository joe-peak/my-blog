const User = global.dbHelper.getModel('user');
let getUser = (req) => {
  return new Promise((resolve, reject) => {
    User.findOne(req, (err, doc) => {
      if (err)
      {
        reject({ 'success': false, 'errorMsg': '网络异常错误！', statusCode: 500 });
      }
      else
      {
        resolve(doc);
      }  
    })
  })
};

let newUser = (req, res, next) => {
  let reqEntity = {
    password: req.body.password,
    name: req.body.username,
    avartar:'http://img.zcool.cn/community/0128f856c71b2e6ac7252ce616fac4.gif'
  };
  getUser({ name: reqEntity.name }).then(rep => {
    if (!rep)
    {
        User.create(reqEntity, (err, doc) => {
          if (err)
          {
            res.send(err);
            req.session.error='创建失败';
          }
          res.send({ 'success': true });
      });
    }  
    else
    {
      req.session.error = '用户名已存在！';
      res.send('用户名已存在！');
    }  
  }).catch(err => {
    req.session.error = err.errorMsg;
  })
};

let login = (req, res, next) => {
    let reqEntity = {
      password: req.body.password,
      name: req.body.name
  };
    /*if (req.session.user)
    {
      console.log('*******req.session.user*******');
      console.log(req.session.user);
      res.redirect('/');
    }  */
  getUser({ name: reqEntity.name }).then(rep => {
     if (!rep)
     {
        res.send('用户不存在');
     }
     else if(rep.password !== reqEntity.password)
     {
       req.session.error = '密码错误';
       res.send({success:false,errorMsg:'密码错误'});
     }  
     else
     {
       req.session.user = rep;
       req.session.userId = rep._id;
       res.send({ success: true, errorMsg: '' });
     }  
   }).catch(err => {
    req.session.error = err.errorMsg;
  });
};

let loginout = (req, res, next) => {
  req.session.user = null;
  req.session.userId = null;
  res.redirect('/login');
}

let authorize = (req, res, next) => {
  if (!req.session.user)
  {
    res.redirect('/login');
  }
  else
  {
    next();
  }  
};
 
module.exports = {
  newUser,
  login,
  loginout,
  authorize
};