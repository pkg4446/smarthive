const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;

DBpath('./models',"./");

function DBpath(filepath,dbpath){
    const FS    = require('fs');
    const list  = FS.readdirSync(filepath, 'utf8');
    for (const name of list) {
        const file = name.split('.js');
        if(file.length == 1){         
            DBpath(`${filepath}/${file}`,dbpath + file + '/');
        }else if(file[0] != "index"){    
            DBinit(dbpath,file[0]);
        }
    }
    return true;
}

function DBinit(path,name){
    const database = require(path+name);
    db[name] = database;
    database.init(sequelize);    
    database.associate(db);
    return true;
}

module.exports = db;