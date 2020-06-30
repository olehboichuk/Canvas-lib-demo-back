import * as mongoose from 'mongoose';
import {UserSchema} from '../models/userModel';
import {Request, Response} from 'express';

const User = mongoose.model('User', UserSchema);

export class ContactController {

    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);
        newUser.save((err, contact) => {
            if (err) {
                if
                (err.code === 11000) res.send({message: 'User already exists!'});
                else
                    res.send(err);
            }
            res.status(201).json(contact);
        });
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(contact);
        });
    }

    public getUserWithID(req: Request, res: Response) {
        User.findById(req.params.userId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(contact);
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(contact);
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.remove({_id: req.params.userId}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json({message: 'Successfully deleted contact!'});
        });
    }

    public login(req: Request, res: Response) {
        User.findOne({login: req.body.login}, (err, result) => {
            if (err) {
                return res.send(err);
            }
            if (result)
                result.comparePassword(req.body.password, (err, contact) => {
                    if (err) res.send(err);
                    if (contact) res.send(result);
                    else res.status(401).send({message: 'BAD LOGIN OR PASSWORD!'});
                });
            else
                res.status(401).send({message: 'BAD LOGIN OR PASSWORD!'});
        });
    }

}
