// Imports
const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");

// DB connect Options
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'noel',
    password : 'pOpminge43!',
    database : 'apiDB'
});

// Attempt to Connect To DB
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("Success DB Connected!");
});

// init express
const app = express();

/* configure Middleware */

// set up cors
app.use(cors({
    origin: "https://reporting.noeldev.site",
}));

// auto parse json
app.use(express.json());

// set up express-session
app.use(session({
    secret : 'my secret',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge: 1000*60*60 // one hour 
    }
}));

const counter = function (req, res, next){
    if (!req.session.counter){
        req.session.counter = 1;
    } else {
        req.session.counter++;
    }
    console.log("Session Request " + req.session.counter 
        + " : req.session.id = " + req.session.id);
    next();
}

app.use(counter);

const genSessID = function (req, res, next) {
    console.log("databaseID : " + req.session.databaseID);

    // if no dbID is set then gen one
    if (!req.session.databaseID) {

        function recurQuery() {
            req.session.databaseID = '_' + Math.random().toString(36).substr(2, 9);
            console.log("generated new dbID : " + req.session.databaseID);
            
            let sql = "SELECT * FROM sessionID WHERE sessID = "
                    + "'" + req.session.databaseID + "'";
            db.query(sql, (err, result) => {
                if (err) {
                    throw err;
                }
                // if no matching db id is found
                if (result.length == 0){
                    let sql = 'INSERT INTO sessionID '
                            + '(sessID) '
                            + 'VALUES (?)';

                    let vars = [req.session.databaseID];

                    db.query(sql, vars, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        //console.log(result);
                    });
                // else generate new ID
                } else {
                    recurQuery();
                }
            });
        }

        recurQuery();

    }
    next();
}

app.use(genSessID);


/* set up express routes */

// GET /api 
app.get("/", (req,res) => {
    res.send("Hello World API!");
});

/* session table */

// GET /api/sessID
app.get("/sessID", (req,res) => {
    let sql = "SELECT * FROM sessionID";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// GET /api/sessID/{id}
app.get("/sessID/:id", (req,res) => {
    let sql = 'SELECT * FROM sessionID WHERE id = ' 
                + req.params.id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// POST /api/sessID
app.post("/sessID", (req,res) => {
    let sql = 'INSERT INTO sessionID '
        + '(sessID) '
        + 'VALUES (?)';

    let vars = [req.body.sessID];

    db.query(sql, vars, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// DELETE /api/sessID/{id}

// PUT /api/sessID/{id}

/* static */

// GET /api/static
app.get("/static", (req,res) => {
    let sql = "SELECT * FROM static";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// GET /api/static/{id}
app.get("/static/:id", (req,res) => {
    let sql = 'SELECT * FROM static WHERE id = ' 
                + req.params.id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// POST /api/static
app.post("/static", (req,res) => {
    console.log(req.session.id + " static POST");

    let sql = 'INSERT INTO static '
        + '(agentString, '
        + 'userLang, '
        + 'acceptCookie, '
        + 'acceptJS, '
        + 'acceptCSS, '
        + 'acceptImg, '
        + 'screenHeight, '
        + 'screenWidth, '
        + 'windowHeight, '
        + 'windowWidth, '
        + 'connectType, '
        + 'sessID) '
        + 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

    let vars = [req.body.agentString,
                req.body.userLang,
                req.body.acceptCookie,
                req.body.acceptJS,
                req.body.acceptCSS,
                req.body.acceptImg,
                req.body.screenHeight,
                req.body.screenWidth,
                req.body.windowHeight,
                req.body.windowWidth,
                req.body.connectType,
                req.session.databaseID];

    db.query(sql, vars, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// DELETE /api/static/{id}
app.delete("/static/:id", (req,res) => {
    let sql = 'DELETE FROM static WHERE id = ' 
                + req.params.id;
    console.log("CONNECTED");
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// PUT /api/static/{id}
app.put("/static/:id", (req,res) => {
    let sql = 'UPDATE static SET ' +
                'agentString = ?,' +
                'userLang = ?,' +
                'acceptCookie = ?,' +
                'acceptJS = ?,' +
                'acceptCSS = ?,' +
                'acceptImg = ?,' +
                'screenHeight = ?,' + 
                'screenWidth = ?,' +
                'windowHeight = ?,' +
                'windowWidth = ?,' + 
                'connectType = ?,' +
                'sessID = ? ' +
                'WHERE id =' + req.params.id;
        
    let vars = [req.body.agentString,
                req.body.userLang,
                req.body.acceptCookie,
                req.body.acceptJS,
                req.body.acceptCSS,
                req.body.acceptImg,
                req.body.screenHeight,
                req.body.screenWidth,
                req.body.windowHeight,
                req.body.windowWidth,
                req.body.connectType,
                req.session.databaseID];

    db.query(sql, vars, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

/* performance */

// GET /api/performance
app.get("/performance", (req,res) => {
    let sql = "SELECT * FROM performance";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// GET /api/performance/{id}
app.get("/performance/:id", (req,res) => {
    let sql = 'SELECT * FROM performance WHERE id = ' 
                + req.params.id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// POST /api/performance
app.post("/performance", (req,res) => {
    console.log(req.session.id + " performance POST");

    let sql = 'INSERT INTO performance '
        + '(pageLoadStart, '
        + 'pageLoadEnd, ' 
        + 'pageLoadms, '
        + 'sessID) '
        + 'VALUES (?,?,?,?)';

    let vars = [req.body.pageLoadStart,
                req.body.pageLoadEnd,
                req.body.pageLoadms,
                req.session.databaseID];

    db.query(sql, vars, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// TODO perf DELETE and PUT

/* activity */

// GET /api/activity
app.get("/activity", (req,res) => {
    let sql = "SELECT * FROM activity";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// GET /api/activity/{id}
app.get("/activity/:id", (req,res) => {
    let sql = 'SELECT * FROM activity WHERE id = ' 
                + req.params.id;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// POST /api/activity
app.post("/activity", (req,res) => {
    console.log(req.session.id + " activity POST");

    let sql = 'INSERT INTO activity '
        + '(type, '
        + 'data1, ' 
        + 'data2, '
        + 'time, '
        + 'sessID) '
        + 'VALUES (?,?,?,?,?)';

    let vars = [req.body.type,
                req.body.data1,
                req.body.data2,
                req.body.time,
                req.session.databaseID];

    db.query(sql, vars, (err, result) => {
        if (err) {
            throw err;
        }
        //console.log(result);
        res.send(result);
    });
});

// TODO activity DELETE and PUT


// start express server
app.listen(3001);