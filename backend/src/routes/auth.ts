import express, { Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult,  } from "express-validator";


const router = express.Router();

router.post("/login",[
    check("email","Email is requires").isEmail(),
    check("password","Password with 6 or characters required").isLength({
        min:6
    }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});

        }

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

        res.json({userId: user._id})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong"});
    }
})

export default router;