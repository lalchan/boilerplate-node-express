import mongoose from "mongoose";
import { createHmac } from "crypto";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        select: false
    },
    salt: {
        type: String,
        trim: true,
        select: false
    }
})
userSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
});
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    pipelineData: function () {
        return userDataPipeline(this);
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },
    getUserData: function () {
        const {
            _id, name, email
        } = this
    }
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
};

export default mongoose.model('User', userSchema);