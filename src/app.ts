import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import eventRoutes from "./modules/event/event.routes";
import venueRoutes from "./modules/venue/venue.routes";
import userRoutes from "./modules/user/user.routes";
import bookingRoutes from "./modules/booking/booking.routes"


const app=express();


app.use(express.json());

app.use("/auth", authRoutes );
app.use("/event", eventRoutes);
app.use("/venue", venueRoutes);
app.use("/users", userRoutes)
app.use("/bookings", bookingRoutes);

export default app;