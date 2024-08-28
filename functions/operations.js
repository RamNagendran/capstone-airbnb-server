import { dbbookSlot, dbGetSlots, dbPlacestore, dbReviews, dbSelectedReviews } from "../db/db-operations.js"

export async function getAllPlaceStore(req, res, next) {
    try {
        const result = await dbPlacestore()
        if (result) {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            state: 500,
            message: "some internal server error"
        })
    }
}

export async function getReviews(req, res, next) {
    try {
        const result = await dbReviews()
        if (result) {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            state: 500,
            message: "some internal server error"
        })
    }
}


export async function getSelectedReviews(req, res, next) {
    try {
        const result = await dbSelectedReviews()
        if (result) {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            state: 500,
            message: "some internal server error"
        })
    }
}

export async function bookSlot(req, res, next) {
    const { username, user_id, place_id, dates, total_amount, issuer, confirmation_no, receiptfor } = req.body;
    try {
        const result = await dbbookSlot({ username, user_id, place_id, dates, total_amount, issuer, confirmation_no, receiptfor })
        if (result) {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            state: 500,
            message: "some internal server error"
        })
    }
}

export async function getAllSlots(req, res, next) {
    try {
        const result = await dbGetSlots()
        if (result) {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({
            state: 500,
            message: "some internal server error"
        })
    }
}