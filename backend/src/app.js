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
import orderRoutes from "./routes/order.routes.js";
import shopRoutes from "./routes/shop.routes.js"
import dashBoardRoutes from "./routes/dashBoard.routes.js"
import bannerRoutes from "./routes/banner.routes.js"
// Use routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/order", orderRoutes);
app.use('/api/v1/shop',shopRoutes);
app.use('/api/v1/dashBoard',dashBoardRoutes);
app.use('/api/v1/banner',bannerRoutes);
