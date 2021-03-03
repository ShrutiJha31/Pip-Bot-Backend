var pool = require('../config/db_config');
const { exec } = require("child_process");
const { stderr } = require("process");
module.exports = {
  addWebsites: (website_name, tags, link, interval, userid) => {
    return new Promise((resolve, reject) => {
    
    
           

   pool.query(
        'INSERT INTO websites (website_name, tags, link, intervals, user_id) VALUES (?, ?, ?, ?, ?)',[website_name, tags, link, interval, userid]
       ,
        (error, result) => {
          if (error) {
            return reject({
              status: 500,
              error,
            });
          }

          else
          {
            pool.query('SELECT COUNT(*) FROM websites', (err, result) => {
                id = result[0]['COUNT(*)'];
                console.log(id);
            });
            console.log("Website Inserted Successfully");
          }
            var command = `curl -sL -Is -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -w ";%{http_code};%{time_total}" "${link}" `
 
            child = exec(command, function(error, stdout, stderr){
             
               if(stderr){
                console.log(`stderr:${stderr}`)
               } 
               else{
                this.interval = setInterval(() => {
                const response = stdout.split(";")
                const reverse = response.reverse()
                let sql1 = 'INSERT INTO logs (user_id,website_id,status,response_time) VALUES (?,?,?,?)'
                  pool.query(sql1,[userid,id,reverse[1],reverse[0]],(err,result)=>{
                     if(err)
                     console.log(err)
                     else{
                        
                            console.log(link),
                            console.log(reverse[1]),
                            console.log( reverse[0]),
                            console.log(interval)
                        console.log("Checked this Website"+id);
                        
                     }
                  })
          },interval*60*1000);
        }

        
         
        });
        
    });
    });


  }

}