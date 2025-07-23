import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORSORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit:"20kb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));
app.use(express.static("public"));

app.use(cookieParser());

export default app;


// Import routes
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js"; 
import locationRoutes from "./routes/locaton.routes.js";
// Use routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/location", locationRoutes);
