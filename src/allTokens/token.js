const crypto = require('crypto');
const express = require('express');

const key = "secreatekeyrashdebdjfjd456789431";
const iv = "easdfhdkdlk23421";


const encrypt = (email) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (encryptedToken)=>{
    const decipher = crypto.createDecipheriv('aes-256-cbc',  key, iv  );
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports = {encrypt, decrypt};


