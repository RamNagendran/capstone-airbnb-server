import { MongoClient } from 'mongodb';
import { MONGO_URL } from '../env-credentials.js';

const client = new MongoClient(MONGO_URL);

export async function dbPlacestore() {
    try {
        // Connect to the MongoDB client
        await client.connect();
        const db = client.db('airbnb');
        const placestoreCollection = db.collection('placestore');
        const placeArrayCollection = db.collection('placesArray');

        const placestore = await placestoreCollection.find().toArray();
        const placesArray = await placeArrayCollection.find().toArray();

        if (placestore && placesArray) {
            return { placestore, placesArray };
        }
    } catch (error) {
        console.error('Error on fetch data:', error);
        throw error;
    }
}

export async function dbReviews() {
    try {
        // Connect to the MongoDB client
        await client.connect();
        const db = client.db('airbnb');
        const reviewesCollections = db.collection('reviewesArr');

        const reviews = await reviewesCollections.find().toArray();

        if (reviews) {
            return reviews;
        }
    } catch (error) {
        console.error('Error on fetch data:', error);
        throw error;
    }
}

export async function dbSelectedReviews() {
    try {
        // Connect to the MongoDB client
        await client.connect();
        const db = client.db('airbnb');
        const selectedRewCollection = db.collection('selectedPlace_reviews');

        const reviews = await selectedRewCollection.find().toArray();

        if (reviews) {
            return reviews;
        }
    } catch (error) {
        console.error('Error on fetch data:', error);
        throw error;
    }
}

export async function dbbookSlot(data) {
    try {
        // Connect to the MongoDB client
        await client.connect();
        const db = client.db('airbnb');
        const slotCollections = db.collection('bookedSlots');

        const collRes = await slotCollections.insertOne(data);
        if (collRes.acknowledged) {
            return collRes
        }
    } catch (error) {
        console.error('Error on fetch data:', error);
        throw error;
    }
}

export async function dbGetSlots(data) {
    try {
        await client.connect();
        const db = client.db('airbnb');
        const slotCollections = db.collection('bookedSlots');

        const res = await slotCollections.find().toArray();

        if (res) {
            return res;
        }
    } catch (error) {
        console.error('Error on fetch data:', error);
        throw error;
    }
}