import Express from "express";
import Cors from 'cors';
import { port } from "./env-credentials.js";
import { authentication, authorize, registeration } from "./functions/auth.js";
import { bookSlot, getAllPlaceStore, getAllSlots, getReviews, getSelectedReviews } from "./functions/operations.js";

const app = Express();
app.use(Cors());
app.use(Express.json())

// ---------------------------------------------------------------||
app.post("/api/v1/login", authentication);
app.post("/api/v1/register", registeration)

// ---------------------------------------------------------------||
app.get("/api/v1/get-places", getAllPlaceStore);
app.get("/api/v1/get-reviews", authorize, getReviews)
app.get('/api/v1/selectedPlace-reviews', authorize, getSelectedReviews)

app.get("/api/v1/get-bookedSlots",authorize, getAllSlots)
app.post('/api/v1/book-slot', authorize, bookSlot)

app.listen(port, function () {
    console.log('listening on port', port);
})