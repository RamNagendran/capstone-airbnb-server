import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { MONGO_URL } from '../env-credentials.js';

const client = new MongoClient(MONGO_URL);

export const addNewUser = async (username, email, password) => {
    try {
        // Connect to the MongoDB client
        await client.connect();
        const db = client.db('airbnb');
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ username: username });

        if (existingUser) {
            return {
                userExist: true
            }
        }

        const result = await usersCollection.insertOne({
            username: username,
            email: email,
            password: password,
            createdAt: new Date()
        });

        return result;
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
};


export async function checkCredentials({username, password}) {
    try {
        await client.connect();

        const db = client.db('airbnb');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ username: username });

        if (!user) {
            return {
                success: false,
                message: 'Username not found.'
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return {
                success: true,
                result: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                }
            };
        } else {
            return {
                success: false,
                message: 'Invalid password.'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while checking credentials.'
        };
    } finally {
        await client.close();
    }
}