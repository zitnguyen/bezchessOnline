require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const contactRoutes = require("./routes/contactRoutes");
const financeRoutes = require("./routes/financeRoutes");
const learningRoutes = require("./routes/learningRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      process.env.CLIENT_URL || "http://localhost:3000",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Serve static files for API documentation
app.use("/api-docs", express.static("public/api-docs"));

// Swagger JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/posts", postRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`,
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
