import express from 'express';
import authRoutes from './modules/auth/auth.routes'
import eventRoute from "./modules/event/event.route"
import venueRoutes from "./modules/venue/venue.routes"


const app=express();
app.use(express.json());

app.use("/auth", authRoutes );
app.use("/event", eventRoute);
app.use("/venue", venueRoutes);

export default app;