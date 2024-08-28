import { addNewUser, checkCredentials } from "../db/auth.js";
import { JWT_SECRET } from "../env-credentials.js";
import { passwordHasing } from "./helper.js";
import jwt from 'jsonwebtoken'


export function generateToken(data) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

export function authorize(req, res, next) {

    const authHeader = req.headers.authorization || req.body.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'No authorization header'
        });
    }

    var parts = authHeader?.split(" ");

    if (parts.length != 2 || parts[0] != "Bearer") {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const token = parts[1];
    try {
        const decoded = verifyToken(token);
        if (decoded) {
            next();
        }
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export const authentication = async (req, res, next) => {
    try {
        let response = await checkCredentials(req.body)
        let result = {
            authentication: response.authentication
        }
        if (response.success === false) {
            result.message = response.message
            res.status(500).json(result)
            return next();
        } else {
            let authToken = generateToken({ username: req.body.username })
            result.userDetails = response.result
            result.authToken = authToken
            res.json(result);
            return next();
        }
        
    } catch (err) {
        res.status(500).json({
            authentication: false,
            message: "Internal Server Error"
        })
    }
}


export async function registeration(req, res, next) {
    const {username, email, password} = req.body;
    if (username != '' && email != '' && password != '') {
        try {
            const hashedPassword = await passwordHasing(password)
            const result = await addNewUser(username, email, hashedPassword)
            if (result.acknowledged) {
                res.json({
                    message: "User added successfully",
                    result
                })
            } else if (result?.userExist) {
                res.status(400).json({
                    message: "User name already exists"
                })
            } else {
                res.status(500).json({
                    message: "Some internal server error, try some other time"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "Some internal server error, try some other time"
            })
        }
    }
}