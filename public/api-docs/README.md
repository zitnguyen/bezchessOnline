# 🚀 API Documentation & Swagger Setup

## 📍 Access Points

### Interactive API Documentation

```
http://localhost:5000/api-docs
```

- Beautiful Swagger UI interface
- Try out API endpoints directly
- See request/response examples
- Test authentication with JWT tokens

### Raw OpenAPI JSON Specification

```
http://localhost:5000/api-docs.json
```

- Machine-readable format
- Import into Postman, Insomnia, Thunder Client, etc.
- Use for code generation
- Use for CI/CD integration

---

## 📂 File Structure

```
bezchessOnline/
├── public/
│   └── api-docs/
│       └── index.html          ← Swagger UI entry point
├── config/
│   └── swagger.js              ← OpenAPI specification
├── server.js                   ← API server with routes
└── routes/
    ├── authRoutes.js
    ├── userRoutes.js
    ├── courseRoutes.js
    └── ... (other routes)
```

---

## 🔧 Configuration

### Static Files Serving (server.js)

```javascript
// Line ~40: Serve API documentation
app.use("/api-docs", express.static("public/api-docs"));

// Line ~47: Serve OpenAPI JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});
```

### Swagger Specification (config/swagger.js)

- OpenAPI 3.0.0 standard
- All endpoints documented
- Authentication requirements specified
- Request/response schemas
- Error handling documentation

---

## 🌐 Deployment to EC2

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

```bash
export NODE_ENV=production
export MONGO_URI=your_mongodb_uri
export JWT_SECRET=your_jwt_secret
export PORT=5000
```

### 3. Start Server

```bash
npm start
# OR for production
npx pm2 start server.js --name "bezchess-api"
```

### 4. Access From Browser

```
http://your-ec2-ip:5000/api-docs
```

### 5. Enable Port in Security Group

- Allow TCP 5000 from your IP or 0.0.0.0/0

---

## 📝 Available Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login

### Users

- `GET /api/users/me` - Current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users/teachers` - List teachers

### Courses

- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (Admin)
- `GET /api/courses/{id}` - Course details
- `PUT /api/courses/{id}` - Update course (Admin)
- `DELETE /api/courses/{id}` - Delete course (Admin)

### Schedules

- `GET /api/schedules` - List schedules
- `GET /api/schedules/day/{day}` - Schedules by day
- `POST /api/schedules` - Create (Admin)

### Posts (Blog)

- `GET /api/posts` - List posts
- `GET /api/posts/search` - Search
- `POST /api/posts` - Create (Admin)
- `PUT /api/posts/{id}` - Update (Admin)
- `DELETE /api/posts/{id}` - Delete (Admin)

### Finance

- `GET /api/finance/kpi` - Finance KPI (Admin)
- `GET /api/finance/transactions` - Transactions (Admin)

### Attendance

- `GET /api/attendance` - Records (Admin/Teacher)
- `POST /api/attendance` - Record (Admin/Teacher)

### Learning

- `GET /api/learning` - User learning progress
- `PUT /api/learning/{id}/progress` - Update progress

### Enrollments

- `GET /api/enrollments` - List enrollments
- `POST /api/enrollments` - Enroll in course

---

## 🔐 Authentication

### Get JWT Token

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "student"
  }'

# Sign in
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Use Token in Requests

```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 Testing in Postman/Insomnia

### 1. Import OpenAPI

```
File → Import → URL
URL: http://localhost:5000/api-docs.json
```

### 2. Set Variables

```
base_url: http://localhost:5000/api
token: (obtained from /auth/signin)
```

### 3. Use in Requests

```
GET {{base_url}}/users/me
Header: Authorization: Bearer {{token}}
```

---

## 🐛 Troubleshooting

### Swagger UI Not Loading

```bash
# Check if server running
netstat -ano | findstr :5000
# on Mac/Linux: lsof -i :5000

# Check if public/api-docs/index.html exists
ls -la public/api-docs/

# Test JSON endpoint
curl http://localhost:5000/api-docs.json
```

### CORS Issues

- Already configured in server.js
- Allows: localhost:3000, localhost:5173, localhost:5174
- Add your EC2 domain if needed

### MongoDB Connection Issues

```bash
# Check env variables
echo $MONGO_URI

# Test connection
node -e "const m = require('mongoose'); m.connect(process.env.MONGO_URI).then(()=>console.log('✅ Connected')).catch(e=>console.log('❌', e.message))"
```

---

## 📈 Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection tested
- [ ] JWT_SECRET set securely
- [ ] Node.js v18+ installed
- [ ] npm dependencies installed
- [ ] Server starts without errors
- [ ] `/api-docs` accessible
- [ ] `/api-docs.json` returns valid JSON
- [ ] Sample API calls work
- [ ] CORS configured for frontend domain
- [ ] Database backups configured
- [ ] PM2 or similar process manager installed

---

## 🚀 Quick Start

```bash
# Install
npm install

# Start dev server
npm start

# Access docs
# Open browser: http://localhost:5000/api-docs
```

---

## 📚 Additional Resources

- **OpenAPI 3.0 Spec**: https://spec.openapis.org/oas/v3.0.3
- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/

---

**Last Updated**: March 4, 2026  
**API Version**: 2.0.0  
**Status**: Production Ready ✅
