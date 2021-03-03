const {
    addWebsites
  } = require('./addWebsitesService');
  
  module.exports = {
    NewWebsites: (req, res) => {
        const userid=req.userId;
        const body=req.body;
        console.log(body.link);
        console.log("userid"+userid);
      addWebsites(body.website_name, body.tags, body.link, body.intervals, userid)
        .then((result) => {
          if (!result) {
            return res.status(500).json({
              success: 0,
              message: 'Error occurred ',
            });
          }
  
          return res.status(200).json({
            success: 1,
            message: 'Website Added',
            data: result,
          });
        })
        .catch((e) => {
          res.status(e.status).send(e).end();
        });
    }
}