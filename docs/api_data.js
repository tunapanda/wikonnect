define({ "api": [
  {
    "type": "get",
    "url": "/users/:id",
    "title": "GET a single user using id.",
    "name": "GetAUser",
    "group": "Authentication",
    "version": "0.4.0",
    "description": "<p>list a single user on the platform</p>",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer &lt;&lt;YOUR_API_KEY_HERE&gt;&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n    {\n      \"user\": {\n      \"id\": \"user2\",\n      \"username\": \"user2\",\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n      \"achievementAwards\": [\n        {\n          \"id\": \"achievementaward1\",\n          \"name\": \"completed 10 courses\",\n          \"type\": \"achievementAwards\"\n        },\n        {\n          \"id\": \"achievementaward2\",\n          \"name\": \"fully filled profile\",\n          \"type\": \"achievementAwards\"\n        }\n      ],\n      \"userRoles\": [\n        {\n          \"name\": \"basic\"\n        }\n      ],\n      \"enrolledCourses\": [],\n      \"userVerification\": []\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": 401,\n  \"message\": \"You do not have permissions to view that user\"\n}",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": 404,\n  \"message\": \"No User With that Id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "GET all users.",
    "name": "GetUsers",
    "group": "Authentication",
    "version": "0.4.0",
    "description": "<p>list all user on the platform</p>",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer &lt;&lt;YOUR_API_KEY_HERE&gt;&gt;</p>"
          }
        ]
      }
    },
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/users/:id/profile-image",
    "title": "POST users profile picture.",
    "name": "PostAUser",
    "group": "Authentication",
    "version": "0.4.0",
    "description": "<p>upload user profile pic</p>",
    "permission": [
      {
        "name": "[basic, admin, superadmin]"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer &lt;&lt;YOUR_API_KEY_HERE&gt;&gt;</p>"
          }
        ]
      }
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
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "POST create a new user.",
    "name": "PostAUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Required Params": [
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "user[username]",
            "description": "<p>username</p>"
          },
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "user[email]",
            "description": "<p>Unique email</p>"
          },
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "user[password]",
            "description": "<p>validated password</p>"
          }
        ],
        "Optional Params": [
          {
            "group": "Optional Params",
            "type": "string",
            "optional": false,
            "field": "user[invitedBy]",
            "description": "<p>auto filled on the form</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   \"user\": {\n     \"id\": \"string\",\n     \"username\": \"string\",\n     \"inviteCode\": \"DTrbi6aLj\",\n     \"createdAt\": \"string\",\n     \"updatedAt\": \"string\"\n   }\n}",
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
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "POST login a user.",
    "name": "PostLoginAUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Required Params": [
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>validated password</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"username\": \"string\",\n  \"password\": \"string\",\n}",
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
    "filename": "./server/routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "PUT users data.",
    "name": "PutAUser",
    "group": "Authentication",
    "version": "0.4.0",
    "description": "<p>edit users data on the platform</p>",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer &lt;&lt;YOUR_API_KEY_HERE&gt;&gt;</p>"
          }
        ]
      }
    },
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/chapters/:id",
    "title": "GET single chapter.",
    "name": "GetAChapter",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n   \"id\": \"chapter4\",\n   \"lessonId\": \"lesson2\",\n   \"name\": \"A Chapter4\",\n   \"slug\": \"a-chapter4\",\n   \"description\": \"An H5P Chapter.\",\n   \"status\": \"published\",\n   \"creatorId\": \"user1\",\n   \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n   \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n   \"contentType\": \"h5p\",\n   \"contentUri\": \"/uploads/h5p/chapter4\",\n   \"imageUrl\": null\n }",
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
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "get",
    "url": "/chapters/",
    "title": "GET all chapters.",
    "name": "GetChapters",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n    \"chapter\": [{\n       \"id\": \"chapter1\",\n       \"lessonId\": \"lesson1\",\n       \"name\": \"A Chapter\",\n       \"slug\": \"a-chapter\",\n       \"description\": \"An H5P Chapter.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"contentType\": \"h5p\",\n      \"contentUri\": \"/uploads/h5p/chapter1\",\n      \"imageUrl\": \"/uploads/images/content/chapters/chapter1.jpeg\"\n    }]\n }",
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
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "post",
    "url": "/chapters/:id/chapter-image",
    "title": "POST chapter banner image.",
    "name": "PostBannerImage",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"host\": hostname of where the image has been uploaded\n  \"path\": image path\n}",
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
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "delete",
    "url": "/courses/:id",
    "title": "DELETE course.",
    "name": "DeleteACourse",
    "group": "Courses",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "get",
    "url": "/courses/:id",
    "title": "GET single course.",
    "name": "GetACourse",
    "group": "Courses",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"course\": {\n    \"id\": \"course1\",\n    \"name\": \"A Course\",\n    \"slug\": \"a-course\",\n    \"description\": \"Contains Modules.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n    \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n    \"updatedAt\": \"2017-12-20T19:17:10.000Z\",\n    \"modules\": [\n      {\n        \"id\": \"module1\",\n        \"name\": \"A Module\",\n        \"type\": \"modules\"\n      }\n    ]\n  }\n}",
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
    "filename": "./server/routes/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "get",
    "url": "/courses/",
    "title": "GET all courses.",
    "name": "GetCourses",
    "group": "Courses",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"course\": [\n    {\n      \"id\": \"course1\",\n      \"name\": \"A Course\",\n      \"slug\": \"a-course\",\n      \"description\": \"Contains Modules.\",\n      \"status\": \"published\",\n      \"creatorId\": \"user1\",\n      \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T19:17:10.000Z\",\n      \"modules\": [\n        {\n          \"id\": \"module1\",\n          \"name\": \"A Module\",\n          \"type\": \"modules\"\n        }\n      ],\n      \"enrollments\": [\n         {\n           \"id\": \"enrollment1\",\n           \"courseId\": \"course1\",\n           \"status\": \"true\",\n           \"type\": \"enrollments\"\n         }\n       ],\n       \"progress\": 75,\n       \"permission\": {\n         \"read\": \"boolean\",\n         \"update\": \"boolean\",\n         \"create\": \"boolean\",\n         \"delete\": \"boolean\"\n       }\n    }\n  ]",
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
    "filename": "./server/routes/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "post",
    "url": "/courses",
    "title": "POST course.",
    "name": "PostACourse",
    "group": "Courses",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Post Params": [
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>Slug - Unique and autogenerated.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p>Courses status - published | draft .</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n {\n  \"course\": {\n    \"name\": \"A Course\",\n    \"slug\": \"a-course\",\n    \"description\": \"Contains Modules.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n  }\n}",
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
    "filename": "./server/routes/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "post",
    "url": "/paths",
    "title": "POST learning path.",
    "name": "PostAPath",
    "group": "Courses",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Post Params": [
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[slug]",
            "description": "<p>Slug - Unique and autogenerated.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[status]",
            "description": "<p>LEarning Path status - published | draft .</p>"
          },
          {
            "group": "Post Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[creatorId]",
            "description": "<p>Id of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n {\n  \"learningPath\": {\n    \"name\": \"A Learning Path\",\n    \"slug\": \"a-learning-path\",\n    \"description\": \"Contains related courses.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n  }\n}",
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
    "filename": "./server/routes/paths.js",
    "groupTitle": "Courses"
  },
  {
    "type": "put",
    "url": "/courses/:id",
    "title": "PUT course.",
    "name": "PutACourse",
    "group": "Courses",
    "permission": [
      {
        "name": "[admin, teacher, superadmin]"
      }
    ],
    "parameter": {
      "fields": {
        "Put Params": [
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>Optional Name Unique.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>Optional Slug is Unique and autogenerated.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>Optional Description.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p>Course status[published or draft]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "delete",
    "url": "/paths/:id",
    "title": "DELETE learning path",
    "name": "DeleteLearningPath",
    "group": "Learning_Path",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "learningpath[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "errors",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server/routes/paths.js",
    "groupTitle": "Learning_Path"
  },
  {
    "type": "get",
    "url": "/paths/:id",
    "title": "GET single learning path.",
    "name": "GetAPath",
    "group": "Learning_Path",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"learningpath\": {\n       \"id\": \"learning_path1\",\n       \"name\": \"A Learning Path\",\n       \"slug\": \"a-learning-path\",\n       \"description\": \"For the organization of courses.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"courses\": [\n           {\n               \"id\": \"course1\",\n               \"name\": \"A Course 1\",\n               \"type\": \"courses\"\n           },\n           {\n               \"id\": \"diglit\",\n               \"name\": \"Digital Literacy\",\n               \"type\": \"courses\"\n           }\n       ]\n   }\n }",
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
    "filename": "./server/routes/paths.js",
    "groupTitle": "Learning_Path"
  },
  {
    "type": "get",
    "url": "/courses/",
    "title": "GET all learning paths.",
    "name": "GetPaths",
    "group": "Learning_Path",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"learningpath\": [\n       {\n           \"id\": \"learning_path1\",\n           \"name\": \"A Learning Path\",\n           \"slug\": \"a-learning-path\",\n           \"description\": \"contains related courses.\",\n           \"status\": \"published\",\n           \"creatorId\": \"user1\",\n           \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n           \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n           \"courses\": [\n               {\n                   \"id\": \"course1\",\n                   \"name\": \"A Course 1\",\n                   \"type\": \"courses\"\n               }\n           ]\n       },\n       {\n           \"id\": \"learning_path2\",\n           \"name\": \"A Learning Path 2\",\n           \"slug\": \"a-learning-path-2\",\n           \"description\": \"Contains related courses.\",\n           \"status\": \"published\",\n           \"creatorId\": \"user2\",\n           \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n           \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n           \"courses\": []\n       }\n     ]\n }",
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
    "filename": "./server/routes/paths.js",
    "groupTitle": "Learning_Path"
  },
  {
    "type": "put",
    "url": "/paths/:id",
    "title": "PUT a learning path.",
    "name": "PutAPath",
    "group": "Learning_Path",
    "permission": [
      {
        "name": "[admin, teacher, superadmin]"
      }
    ],
    "parameter": {
      "fields": {
        "Put Params": [
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[name]",
            "description": "<p>Optional Name Unique.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[slug]",
            "description": "<p>Optional Slug is Unique and autogenerated.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[description]",
            "description": "<p>Optional Description.</p>"
          },
          {
            "group": "Put Params",
            "type": "String",
            "optional": false,
            "field": "learningPath[status]",
            "description": "<p>Learning Path status[published or draft]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/paths.js",
    "groupTitle": "Learning_Path"
  },
  {
    "type": "delete",
    "url": "/lessons/:id",
    "title": "DELETE a lesson.",
    "name": "DeleteALesson",
    "group": "Lessons",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lesson[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "get",
    "url": "/lessons/:id",
    "title": "GET single lesson.",
    "name": "GetALesson",
    "group": "Lessons",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"lessons\": {\n    \"id\": \"lessons1\",\n    \"name\": \"A Lesson\",\n    \"slug\": \"a-lesson\",\n    \"description\": \"THis is a lesson.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n    \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n    \"updatedAt\": \"2017-12-20T19:17:10.000Z\",\n    \"chapters\": [\n      {\n        \"id\": \"chapter1\",\n        \"name\": \"A Chapter\",\n        \"type\": \"chapters\"\n      }\n    ]\n  }\n}",
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
    "filename": "./server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "get",
    "url": "/lessons/",
    "title": "GET all lessons.",
    "name": "GetLessons",
    "group": "Lessons",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \"lessons\": [{\n    \"id\": \"lesson1\",\n    \"name\": \"A Lesson\",\n    \"slug\": \"a-lesson\",\n    \"description\": \"Contains Chapters.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n    \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n    \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n    \"chapters\": [\n        {\n            \"id\": \"chapter1\",\n            \"name\": \"A Chapter\",\n            \"type\": \"chapters\"\n        },\n        {\n            \"id\": \"chapter2\",\n            \"name\": \"A Chapter 2\",\n            \"type\": \"chapters\"\n        },\n        {\n            \"id\": \"chapter3\",\n            \"name\": \"A Chapter3\",\n            \"type\": \"chapters\"\n        },\n        {\n            \"id\": \"chapter4\",\n            \"name\": \"A Chapter4\",\n            \"type\": \"chapters\"\n        }\n    ],\n    \"percentage\": {\n        \"type\": \"percentage\",\n        \"percent\": 75\n    }\n}]",
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
    "filename": "./server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "post",
    "url": "/lessons",
    "title": "POST a lesson.",
    "name": "PostALesson",
    "group": "Lessons",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[slug]",
            "description": "<p>Slug - Unique and autogenerated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[status]",
            "description": "<p>modules status - published | draft .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[creatorId]",
            "description": "<p>Id of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n {\n  \"lesson\": {\n    \"name\": \"lesson\",\n    \"slug\": \"a-lesson\",\n    \"description\": \"this is a lesson.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n  }\n}",
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
    "filename": "./server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "put",
    "url": "/lessons/:id",
    "title": "PUT lesson.",
    "name": "PutALesson",
    "group": "Lessons",
    "permission": [
      {
        "name": "[admin, teacher, superadmin]"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[name]",
            "description": "<p>Optional Name Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[slug]",
            "description": "<p>Optional Slug is Unique and autogenerated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[description]",
            "description": "<p>Optional Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lesson[status]",
            "description": "<p>lesson status[published or draft]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lesson[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "delete",
    "url": "/modules/:id",
    "title": "DELETE a module.",
    "name": "DeleteAModule",
    "group": "Modules",
    "permission": [
      {
        "name": "[admin, superadmin]"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "module[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  },
  {
    "type": "get",
    "url": "/modules/:id",
    "title": "GET single module.",
    "name": "GetAModule",
    "group": "Modules",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \"modules\": {\n    \"id\": \"module1\",\n    \"name\": \"A Module\",\n    \"slug\": \"a-module-1\",\n    \"description\": \"Contains Lessons.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n    \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n    \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n    \"lessons\": [\n        {\n            \"id\": \"lesson1\",\n            \"name\": \"A Lesson\",\n            \"type\": \"lessons\"\n        }\n    ],\n    \"progress\": 0,\n    \"permissions\": {\n        \"read\": \"true\",\n        \"update\": \"true\",\n        \"create\": \"true\",\n        \"delete\": \"true\"\n    }\n  }\n}",
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
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  },
  {
    "type": "get",
    "url": "/modules/",
    "title": "GET all modules.",
    "name": "GetModules",
    "group": "Modules",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \"modules\": [{\n    \"id\": \"module1\",\n    \"name\": \"A Module\",\n    \"slug\": \"a-module-1\",\n    \"description\": \"Contains Lessons.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n    \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n    \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n    \"lessons\": [\n        {\n            \"id\": \"lesson1\",\n            \"name\": \"A Lesson\",\n            \"type\": \"lessons\"\n        }\n    ],\n    \"progress\": 0,\n    \"permission\": {\n        \"read\": \"true\",\n        \"update\": \"false\",\n        \"create\": \"false\",\n        \"delete\": \"false\"\n    }\n}]",
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
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  },
  {
    "type": "post",
    "url": "/modules",
    "title": "POST a module.",
    "name": "PostAModule",
    "group": "Modules",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[slug]",
            "description": "<p>Slug - Unique and autogenerated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[status]",
            "description": "<p>modules status - published | draft .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[creatorId]",
            "description": "<p>Id of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n {\n  \"module\": {\n    \"name\": \"module\",\n    \"slug\": \"a-module\",\n    \"description\": \"this is a module.\",\n    \"status\": \"published\",\n    \"creatorId\": \"user1\",\n  }\n}",
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
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  },
  {
    "type": "put",
    "url": "/modules/:id",
    "title": "PUT a module.",
    "name": "PutAModule",
    "group": "Modules",
    "permission": [
      {
        "name": "[admin, teacher, superadmin]"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[name]",
            "description": "<p>Optional Name Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[slug]",
            "description": "<p>Optional Slug is Unique and autogenerated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[description]",
            "description": "<p>Optional Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module[status]",
            "description": "<p>modules status[published or draft]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "module[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
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
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  }
] });
