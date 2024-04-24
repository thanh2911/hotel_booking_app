import express, { Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult,  } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    [
        check("firstName","First Name is requires").isString(),
        check("lastName","Last Name is requires").isString(),
        check("email","Email is requires").isEmail(),
        check("password","Password with 6 or characters required").isLength({
            min:6
        }),

    ], 
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }
    try {
        let user = await User.findOne({
            email: req.body.email,
        })

        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            {userID: user.id},
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.json({user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong"});
        
    }
})

export default router;