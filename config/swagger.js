const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BEZ CHESS ONLINE - Educational API",
      version: "2.0.0",
      description:
        "Complete REST API for BEZ CHESS ONLINE - An online chess learning platform",
      contact: {
        name: "BEZ CHESS Team",
        email: "support@bezchess.com",
        url: "https://bezchess.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      x_logo: {
        url: "https://bezchess.com/logo.png",
      },
    },
    externalDocs: {
      description: "Find out more about BEZ CHESS",
      url: "https://bezchess.com",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
        variables: {
          port: {
            default: "5000",
          },
        },
      },
      {
        url: "https://api.bezchess.com/api",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token for authentication. Use the token returned from /auth/signin endpoint",
        },
      },
      schemas: {
        // User Schema
        User: {
          type: "object",
          required: ["email", "name", "role"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
              description: "Unique identifier",
            },
            username: {
              type: "string",
              description: "Username for login",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            name: {
              type: "string",
              description: "Full name",
            },
            role: {
              type: "string",
              enum: ["admin", "teacher", "parent", "student"],
              description: "User role",
            },
            phone: {
              type: "string",
              description: "Phone number",
            },
            avatar: {
              type: "string",
              description: "Avatar URL",
            },
            bio: {
              type: "string",
              description: "User biography",
            },
            isActive: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Course Schema
        Course: {
          type: "object",
          required: ["title", "description", "instructor"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            title: {
              type: "string",
              description: "Course title",
            },
            slug: {
              type: "string",
              description: "URL-friendly course name",
            },
            description: {
              type: "string",
              description: "Detailed course description",
            },
            category: {
              type: "array",
              items: { type: "string" },
              description: "Course categories",
            },
            level: {
              type: "string",
              enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
            },
            price: {
              type: "number",
              description: "Course price",
            },
            instructor: {
              type: "string",
              format: "ObjectId",
              description: "Instructor user ID",
            },
            thumbnail: {
              type: "string",
              description: "Course thumbnail image URL",
            },
            enrollment: {
              type: "number",
              description: "Number of enrolled students",
            },
            rating: {
              type: "number",
              minimum: 0,
              maximum: 5,
            },
            isPublished: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Schedule Schema
        Schedule: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            student: {
              type: "string",
              format: "ObjectId",
            },
            lesson: {
              type: "string",
              format: "ObjectId",
            },
            dayOfWeek: {
              type: "integer",
              minimum: 0,
              maximum: 6,
              description: "0=Sunday, 6=Saturday",
            },
            startTime: {
              type: "string",
              format: "time",
            },
            endTime: {
              type: "string",
              format: "time",
            },
            status: {
              type: "string",
              enum: ["scheduled", "ongoing", "completed", "cancelled"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Post (Blog) Schema
        Post: {
          type: "object",
          required: ["title", "content"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            title: {
              type: "string",
              description: "Post title",
            },
            slug: {
              type: "string",
              description: "URL-friendly post name",
            },
            content: {
              type: "string",
              description: "Post content (markdown or HTML)",
            },
            author: {
              type: "string",
              format: "ObjectId",
              description: "Author user ID",
            },
            category: {
              type: "string",
              description: "Post category",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Post tags",
            },
            thumbnail: {
              type: "string",
              description: "Post thumbnail image",
            },
            likes: {
              type: "array",
              items: { type: "string" },
              description: "User IDs who liked",
            },
            comments: {
              type: "array",
              description: "Post comments",
            },
            isPublished: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Error Response
        Error: {
          type: "object",
          properties: {
            statusCode: {
              type: "integer",
            },
            message: {
              type: "string",
            },
            error: {
              type: "string",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },

      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized - Missing or invalid token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        Forbidden: {
          description: "Forbidden - Insufficient permissions",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        BadRequest: {
          description: "Bad Request - Invalid input",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },

      parameters: {
        pageParam: {
          name: "page",
          in: "query",
          description: "Page number (starts from 1)",
          schema: {
            type: "integer",
            default: 1,
          },
        },
        limitParam: {
          name: "limit",
          in: "query",
          description: "Items per page",
          schema: {
            type: "integer",
            default: 10,
          },
        },
        searchParam: {
          name: "search",
          in: "query",
          description: "Search keyword",
          schema: {
            type: "string",
          },
        },
        idParam: {
          name: "id",
          in: "path",
          required: true,
          description: "Resource ID",
          schema: {
            type: "string",
          },
        },
      },
    },

    paths: {
      "/auth/signup": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          description:
            "Create a new user account with email, password, and profile information",
          operationId: "signUp",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "email", "password", "name", "role"],
                  properties: {
                    username: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" },
                    name: { type: "string" },
                    role: {
                      type: "string",
                      enum: ["admin", "teacher", "parent", "student"],
                    },
                    phone: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        properties: {
                          user: { $ref: "#/components/schemas/User" },
                          token: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { $ref: "#/components/responses/BadRequest" },
          },
        },
      },

      "/auth/signin": {
        post: {
          tags: ["Authentication"],
          summary: "User login",
          description:
            "Authenticate user with email and password to get JWT token",
          operationId: "signIn",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        properties: {
                          user: { $ref: "#/components/schemas/User" },
                          token: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },

      "/users/me": {
        get: {
          tags: ["Users"],
          summary: "Get current user profile",
          operationId: "getCurrentUser",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Current user profile",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
        put: {
          tags: ["Users"],
          summary: "Update user profile",
          operationId: "updateProfile",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    phone: { type: "string" },
                    avatar: { type: "string" },
                    bio: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Profile updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },

      "/users/teachers": {
        get: {
          tags: ["Users"],
          summary: "Get all teachers",
          operationId: "getTeachers",
          parameters: [
            { $ref: "#/components/parameters/pageParam" },
            { $ref: "#/components/parameters/limitParam" },
          ],
          responses: {
            200: {
              description: "List of teachers",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/courses": {
        get: {
          tags: ["Courses"],
          summary: "Get all courses",
          operationId: "getCourses",
          parameters: [
            { $ref: "#/components/parameters/pageParam" },
            { $ref: "#/components/parameters/limitParam" },
            { $ref: "#/components/parameters/searchParam" },
          ],
          responses: {
            200: {
              description: "List of courses",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Course" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Courses"],
          summary: "Create a new course (Admin only)",
          operationId: "createCourse",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          responses: {
            201: {
              description: "Course created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Course" },
                },
              },
            },
            401: { $ref: "#/components/responses/Unauthorized" },
            403: { $ref: "#/components/responses/Forbidden" },
          },
        },
      },

      "/schedules": {
        get: {
          tags: ["Schedules"],
          summary: "Get all schedules",
          operationId: "getSchedules",
          parameters: [
            { $ref: "#/components/parameters/pageParam" },
            { $ref: "#/components/parameters/limitParam" },
          ],
          responses: {
            200: {
              description: "List of schedules",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Schedule" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/posts": {
        get: {
          tags: ["Posts"],
          summary: "Get all blog posts",
          operationId: "getPosts",
          parameters: [
            { $ref: "#/components/parameters/pageParam" },
            { $ref: "#/components/parameters/limitParam" },
          ],
          responses: {
            200: {
              description: "List of posts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Post" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Posts"],
          summary: "Create blog post (Admin only)",
          operationId: "createPost",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Post" },
              },
            },
          },
          responses: {
            201: {
              description: "Post created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" },
                },
              },
            },
            401: { $ref: "#/components/responses/Unauthorized" },
            403: { $ref: "#/components/responses/Forbidden" },
          },
        },
      },
    },

    tags: [
      {
        name: "Authentication",
        description: "User registration and login endpoints",
      },
      {
        name: "Users",
        description: "User profile and management endpoints",
      },
      {
        name: "Courses",
        description: "Course management and enrollment",
      },
      {
        name: "Schedules",
        description: "Class schedule management",
      },
      {
        name: "Posts",
        description: "Blog posts and articles",
      },
    ],
  },

  // Empty array - not using JSDoc comments in route files
  apis: [],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
