define({ "api": [
  {
    "type": "get",
    "url": "/courses/:id",
    "title": "GET single course.",
    "name": "GetCourse",
    "group": "Course",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"course\": {\n     \"id\": \"course1\",\n     \"name\": \"A Course\",\n     \"slug\": \"a-course\",\n     \"description\": \"Contains Modules.\",\n     \"status\": \"published\",\n     \"creatorId\": \"user1\",\n     \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n     \"updatedAt\": \"2017-12-20T19:17:10.000Z\",\n     \"modules\": [\n       {\n         \"id\": \"module1\",\n         \"name\": \"A Module\",\n         \"type\": \"modules\"\n       }\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "errors",
            "description": "<p>Bad Request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/courses.js",
    "groupTitle": "Course"
  },
  {
    "type": "get",
    "url": "/courses/",
    "title": "GET all courses.",
    "name": "GetCourses",
    "group": "Course",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"course\": [\n      {\n        \"id\": \"course1\",\n        \"name\": \"A Course\",\n        \"slug\": \"a-course\",\n        \"description\": \"Contains Modules.\",\n        \"status\": \"published\",\n        \"creatorId\": \"user1\",\n        \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n        \"updatedAt\": \"2017-12-20T19:17:10.000Z\",\n        \"modules\": [\n          {\n            \"id\": \"module1\",\n            \"name\": \"A Module\",\n            \"type\": \"modules\"\n          }\n        ]\n      }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "errors",
            "description": "<p>Bad Request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/courses.js",
    "groupTitle": "Course"
  }
] });
