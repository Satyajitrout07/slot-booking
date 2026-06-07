import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import slotRoutes from "./modules/slot/slot.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import aiRoutes from "./modules/ai/ai.routes";
import adminRoutes from "./modules/admin/admin.routes";
import whatsappRoutes from "./modules/whatsapp/whatsapp.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/whatsapp", whatsappRoutes);

export default app;