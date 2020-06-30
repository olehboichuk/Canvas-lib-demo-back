import * as mongoose from 'mongoose';

let bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

export class ZoneModel {
    maxPointValue: Number;
    zoneColor: String;
    textColor: String;
}

export class CircleOptionsModel {
    fillWightPercentage: Number;
    fillHeightPercentage: Number;
    radius: Number;
    backgroundColor: String;
}

// export class ValueOptionsModel {
//     private _zones: [ZoneModel];
//     private _maxValue: Number;
//     private _displayZoneLine: Boolean;
//
//     constructor(maxValue: Number,
//                 displayZoneLine: Boolean,
//                 zones: [ZoneModel]) {
//         this._maxValue = maxValue;
//         this._displayZoneLine = displayZoneLine;
//         this._zones = zones;
//
//     }
// }
//
// export interface ValueOptionsModel {
//     maxValue: Number;
//     displayZoneLine: Boolean;
//     zones: [ZoneModel];
// }

export const UserSchema = new Schema({
        login: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isStartFromCenter: Boolean,
        valuesToTest: [Number],
        circleOptions: {
            fillWightPercentage: Number,
            fillHeightPercentage: Number,
            radius: Number,
            backgroundColor: String
        },
        valueOptions: {
            maxValue: Number,
            displayZoneLine: Boolean,
            zones: [{
                maxPointValue: Number,
                zoneColor: String,
                textColor: String
            }]
        }
    })
;

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

