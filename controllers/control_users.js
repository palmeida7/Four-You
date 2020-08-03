const db = require('./config');
const img = require('./setup');
const bcrypt = require('bcrypt');

let user = {};

user.updateProfile = async function (id, fullName, proImg, covImg, bio){
    let getProImg = `
        SELECT * FROM images
        WHERE img_url = '${proImg}'
    `;
    let proImgObj = await db.one(getProImg);

    let getCovImg = `
        SELECT * FROM images
        WHERE img_url = '${covImg}'
    `;
    let covImgObj = await db.one(getCovImg);

    let proImgId, covImgId;
    if (proImgObj == null){
        proImgId = await img.uploadImg(proImg);
    } else {
        proImgId = proImgObj.id;
    };

    if (covImgObj == null){
        covImgId = await img.uploadImg(covImg);
    } else {
        covImgId = covImgObj.id;
    };

    let userSql = `
        UPDATE users 
        SET 
        full_name = '${fullName}',
        pro_id = '${proImgId}',
        cov_id = '${coImgId}',
        bio = '${bio}'
        WHERE id = '${id}' RETURNING *
    `;
    let userObj = await db.one(userSql);
    return userObj;
};

user.createUser = async function (username, password, email) {
    let existUserSql = `
        SELECT id FROM users
        WHERE username = '${username}'
    `;
    let existUserObj = await db.one(existUserSql);
    let encPass = await bcrypt.hash(password, 10);
    if (existUseObj == null){
        let newUserSql = `
        INSERT INTO users (username, password, email) 
        VALUES ('${username}','${encPass}','${email}')
        RETURNING *
        `; 
        let newUserObj = await db.one(newUserSql);
        return newUserObj;
    } else {
        return null;
    }
}


module.exports = user;