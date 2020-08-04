const path = require('path');

const imageRoute = (app,_db)=>{
    app.get("/image/:filename", (req, res) => {
        res.sendFile(__dirname.replace('/routes',"") + '/public/images/'+req.params.filename);
    });
};

module.exports = imageRoute;