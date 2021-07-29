define({ "api": [
  {
    "type": "get",
    "url": "/api/user/:slug",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Users unique Slug.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n  \"is_deleted\": false,\n  \"is_active\": false,\n  \"is_staff\": false,\n  \"_id\": \"610149e06a36941b5867da73\",\n  \"email\": \"ebubekiryusuf44@hotmail.com\",\n  \"hashed_password\": \"$2b$10$ebVUfkYx.z2fqE.iUEWAMehkuGMQJPfW8WpKzJ4MoaK5xzU2/MCpq\",\n  \"first_name\": \"Ebubekir\",\n  \"last_name\": \"Doğan\",\n  \"slug\": \"ebubekirdoğan\",\n  \"createdAt\": \"2021-07-28T12:13:20.929Z\",\n  \"updatedAt\": \"2021-07-28T12:13:20.929Z\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/AuthController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login User",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true,\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVidWJla2lyeXVzdWY0NEBob3RtYWlsLmNvbSIsImlhdCI6MTYyNzQ3NTc4MywiZXhwIjoxNjI3NDc2NTAzfQ.issqAycd6XGX2yctNpxQvMI9XDKm_N8Kunp_NB82APs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongPassword",
            "description": "<p>Wrong password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Can't find user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"status\": false,\n   \"message\": \"Wrong password\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n {\n   \"status\": false,\n   \"message\": \"Can't find user\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/AuthController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n {\n  \"is_deleted\": false,\n  \"is_active\": false,\n  \"is_staff\": false,\n  \"_id\": \"610149e06a36941b5867da73\",\n  \"email\": \"ebubekiryusuf44@hotmail.com\",\n  \"hashed_password\": \"$2b$10$ebVUfkYx.z2fqE.iUEWAMehkuGMQJPfW8WpKzJ4MoaK5xzU2/MCpq\",\n  \"first_name\": \"Ebubekir\",\n  \"last_name\": \"Doğan\",\n  \"slug\": \"ebubekirdoğan\",\n  \"createdAt\": \"2021-07-28T12:13:20.929Z\",\n  \"updatedAt\": \"2021-07-28T12:13:20.929Z\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User",
            "description": "<p>already registered.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": false,\n  \"message\": \"User already registered\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/AuthController.js",
    "groupTitle": "User"
  }
] });
