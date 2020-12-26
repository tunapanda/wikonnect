define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/users/:id",
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
            "description": "<p>Users unique JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The users id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://localhost:3000/api/v1/users"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n    {\n      \"user\": {\n      \"id\": \"user2\",\n      \"username\": \"user2\",\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n      \"profileUri\": \"image_url\",\n      \"private\": boolean,\n      \"inviteCode\": \"invited_by\",\n      \"achievementAwards\": [\n        {\n          \"id\": \"achievementaward1\",\n          \"name\": \"completed 10 courses\",\n          \"type\": \"achievementAwards\"\n        },\n        {\n          \"id\": \"achievementaward2\",\n          \"name\": \"fully filled profile\",\n          \"type\": \"achievementAwards\"\n        }\n      ],\n      \"userRoles\": [\n        {\n          \"name\": \"basic\"\n        }\n      ],\n      \"enrolledCourses\": [\n         {\n           \"id\": \"course1\",\n           \"name\": \"A Course 1\",\n           \"type\": \"course\"\n         }\n      ],\n      \"userVerification\": []\n   }\n}",
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
          },
          {
            "group": "Optional Params",
            "type": "string",
            "optional": false,
            "field": "user[tags]",
            "description": "<p>a list of String with tags a user has subscribed to</p>"
          },
          {
            "group": "Optional Params",
            "type": "string",
            "optional": false,
            "field": "user[metadata]",
            "description": "<p>json data</p>"
          }
        ]
      }
    },
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/users"
      }
    ]
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
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/users/:id/profile-image"
      }
    ]
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
          "content": "HTTP/1.1 201 OK\n{\n   \"user\": {\n     \"id\": \"string\",\n     \"username\": \"string\",\n     \"inviteCode\": \"invited_by\",\n     \"createdAt\": \"string\",\n     \"updatedAt\": \"string\",\n     \"metadata\": json_array\n   }\n}",
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
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/users"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/auth",
    "title": "POST login a user.",
    "name": "PostLoginAUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
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
    "sampleRequest": [
      {
        "url": "https://localhost:3000/api/v1/auth"
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
    "parameter": {
      "fields": {
        "PUT Params": [
          {
            "group": "PUT Params",
            "type": "string",
            "optional": false,
            "field": "user[email]",
            "description": "<p>Unique email</p>"
          },
          {
            "group": "PUT Params",
            "type": "string",
            "optional": false,
            "field": "user[password]",
            "description": "<p>validated password</p>"
          },
          {
            "group": "PUT Params",
            "type": "string",
            "optional": false,
            "field": "user[tags]",
            "description": "<p>a list of String with tags a user has subscribed to</p>"
          },
          {
            "group": "PUT Params",
            "type": "string",
            "optional": false,
            "field": "user[metadata]",
            "description": "<p>json data</p>"
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
            "field": "user[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
    },
    "filename": "./server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/:comment_id",
    "title": "GET a comment",
    "name": "GetAChapterComment",
    "group": "ChapterComments",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\"comment\": [{\n     \"id\": String,\n     \"chapterId\": String,\n     \"creatorId\": String,\n     \"comment\": String,\n     \"createdAt\": DateTime,\n     \"updatedAt\": DateTime\n   }]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/comments.js",
    "groupTitle": "ChapterComments",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/:comment_id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/",
    "title": "GET a comment",
    "name": "GetChapterComment",
    "group": "ChapterComments",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"comment\": [{\n    \"id\": String,\n    \"comment\": String,\n    \"chapterId\": String,\n    \"creatorId\": String,\n    \"createdAt\": DateTime,\n    \"updatedAt\": DateTime\n   }]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/comments.js",
    "groupTitle": "ChapterComments",
    "sampleRequest": [
      {
        "url": "/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/",
    "title": "POST comment",
    "name": "PostAChapterComment",
    "group": "ChapterComments",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n {\n  \"comment\": {\n    \"creatorId\": { type: String },\n    \"comment\": { type: String },\n    \"metadata\": { type: JSON },\n    \"chapterId\": { type: String }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/comments.js",
    "groupTitle": "ChapterComments",
    "sampleRequest": [
      {
        "url": "/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/:comment_id",
    "title": "PUT comment",
    "name": "PutAChapterComment",
    "group": "ChapterComments",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.0.0",
    "filename": "./server/routes/comments.js",
    "groupTitle": "ChapterComments",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/:comment_id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/:rating_id",
    "title": "DELETE a rating",
    "name": "DeleteAChapterRating",
    "group": "ChapterRatings",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.0.0",
    "filename": "./server/routes/ratings.js",
    "groupTitle": "ChapterRatings",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/:rating_id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/:rating_id",
    "title": "GET a rating",
    "name": "GetAChapterRating",
    "group": "ChapterRatings",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"rating\": [{\n    \"id\": String,\n    \"rating\": String,\n    \"comment\": String,\n    \"chapter_id\": String,\n    \"user_id\": String,\n    \"labels\": Array,\n    \"category\": String,\n    \"createdAt\": DateTime,\n    \"updatedAt\": DateTime\n   }]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/ratings.js",
    "groupTitle": "ChapterRatings",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/:rating_id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/",
    "title": "GET ratings",
    "name": "GetChapterRatings",
    "group": "ChapterRatings",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"ratings\": [{\n    \"id\": String,\n    \"rating\": String,\n    \"comment\": String,\n    \"chapter_id\": String,\n    \"user_id\": String,\n    \"labels\": Array,\n    \"category\": String,\n    \"createdAt\": DateTime,\n    \"updatedAt\": DateTime\n   }]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/ratings.js",
    "groupTitle": "ChapterRatings",
    "sampleRequest": [
      {
        "url": "/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/",
    "title": "POST rating",
    "name": "PostAChapterRating",
    "group": "ChapterRatings",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"ratings\": {\n    \"id\": String,\n    \"rating\": String,\n    \"comment\": String,\n    \"chapter_id\": String,\n    \"user_id\": String,\n    \"labels\": Array,\n    \"category\": String,\n    \"createdAt\": DateTime,\n    \"updatedAt\": DateTime\n   }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/ratings.js",
    "groupTitle": "ChapterRatings",
    "sampleRequest": [
      {
        "url": "/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/:rating_id",
    "title": "PUT comment",
    "name": "PutAChapterRating",
    "group": "ChapterRatings",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.0.0",
    "filename": "./server/routes/ratings.js",
    "groupTitle": "ChapterRatings",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/:rating_id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/chapters/:id",
    "title": "GET single chapter.",
    "name": "GetAChapter",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Chapter unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "chapter",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chapter.id",
            "description": "<p>Chapter id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Chapter[object]",
            "description": "<p>Object data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n       \"id\": \"chapter1\",\n       \"lessonId\": \"lesson1\",\n       \"name\": \"A Chapter\",\n       \"slug\": \"a-chapter\",\n       \"description\": \"An H5P Chapter.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"contentType\": \"h5p\",\n       \"contentUri\": \"/uploads/h5p/chapter1\",\n       \"imageUrl\": \"/uploads/images/content/chapters/chapter1.jpeg\",\n       \"contentId\": null,\n       \"tags\": [],\n       \"comment\": [{\n       }]\n       \"reaction\": {\n          \"total_likes\": \"4\",\n          \"likes\": \"3\",\n          \"dislikes\": \"1\",\n          \"authenticated_user\": null\n         }\n    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/chapters/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/chapters/",
    "title": "GET all chapters.",
    "name": "GetChapters",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Get all chapter and filter using multiple query params</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Optional id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Optional name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Optional chapter status - published | draft</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>Optional author of a chapter</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "approved",
            "description": "<p>Optional boolean with default being false</p>"
          }
        ],
        "Authentication": [
          {
            "group": "Authentication",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>Optional tags list</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "chapter",
            "description": "<p>List of chapters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chapter.id",
            "description": "<p>Id of the chapter</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chapter.name",
            "description": "<p>Name of the chapter</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chapter.description",
            "description": "<p>Description of the chapter</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chapter.status",
            "description": "<p>Status of the chapter (published | draft)</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "chapter.approved",
            "description": "<p>boolean with default being false</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "chapter.tags",
            "description": "<p>tags list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n    \"chapter\": [{\n       \"id\": \"chapter1\",\n       \"lessonId\": \"lesson1\",\n       \"name\": \"A Chapter\",\n       \"slug\": \"a-chapter\",\n       \"description\": \"An H5P Chapter.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"contentType\": \"h5p\",\n       \"contentUri\": \"/uploads/h5p/chapter1\",\n       \"imageUrl\": \"/uploads/images/content/chapters/chapter1.jpeg\",\n       \"contentId\": null,\n       \"likes\": \"0\",\n       \"dislikes\": \"0\",\n       \"rating\": null,\n       \"tags\": [],\n       \"comment\": [{\n       }]\n    }]\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/chapters/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "post",
    "url": "/api/v1/chapters",
    "title": "POST single chapter.",
    "name": "PostAChapter",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[status]",
            "description": "<p>modules status - options[published | draft]</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "chapter[approved]",
            "description": "<p>defaults is false</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "chapter[tags]",
            "description": "<p>Tags list.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n   \"id\": \"chapter4\",\n   \"lessonId\": \"lesson2\",\n   \"name\": \"A Chapter4\",\n   \"slug\": \"a-chapter4\",\n   \"description\": \"An H5P Chapter.\",\n   \"status\": \"published\",\n   \"creatorId\": \"user1\",\n   \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n   \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n   \"contentType\": \"h5p\",\n   \"contentUri\": \"/uploads/h5p/chapter4\",\n   \"imageUrl\": null,\n   \"contentId\": null,\n   \"tags\": [],\n   \"approved\": false\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "post",
    "url": "/api/v1/chapters/:id/upload",
    "title": "upload H5P chapter",
    "name": "PostAH5PChapter",
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
          "content": "HTTP/1.1 200 OK\n{\n   host: ctx.host,\n   path: uploadPath\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "chapter[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/chapters/:id/upload"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/chapters/:id/chapter-image",
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
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "chapter[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/chapters/:id/chapter-image"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/chapters/:id",
    "title": "PUT single chapter.",
    "name": "PutAChapter",
    "group": "Chapters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/chapters/:id"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id - Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[name]",
            "description": "<p>Name - Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[description]",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chapter[status]",
            "description": "<p>modules status - published | draft</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "allowedValues": [
              "\"false\""
            ],
            "optional": false,
            "field": "chapter[approved]",
            "description": "<p>defaults is false</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "chapter[tags]",
            "description": "<p>Tags list.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "chapter[object]",
            "description": "<p>Object data</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
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
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/courses/:id"
      }
    ]
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
    "groupTitle": "Learning_Path",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/paths/:id"
      }
    ]
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
    "groupTitle": "Lessons",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/lessons/:id"
      }
    ]
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
    "groupTitle": "Modules",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/modules/:id"
      }
    ]
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
    "url": "api/v1/modules/:id",
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
            "field": "module",
            "description": "<p>List of modules</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "module.name",
            "description": "<p>Optional Name Unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "module[slug]",
            "description": "<p>Optional Slug is Unique and autogenerated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "module[description]",
            "description": "<p>Optional Description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "module[status]",
            "description": "<p>modules status[published or draft]</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server/routes/modules.js",
    "groupTitle": "Modules"
  },
  {
    "type": "delete",
    "url": "/api/v1/reactions/:id",
    "title": "DELETE using Id.",
    "name": "DeleteAReAction",
    "group": "Reactions",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Reaction Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "reaction",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.id",
            "description": "<p>Reaction id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.chapterId",
            "description": "<p>Chapter id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.userId",
            "description": "<p>Authenticated user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n reaction: {\n     userId: 'user44',\n     chapterId: 'chapter2',\n     reaction: 'like',\n     createdAt: '2020-11-25T12:56:52.895Z',\n     updatedAt: '2020-11-25T12:56:52.895Z',\n     id: 'IgDuJuUAAvo'\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/reactions/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/reactions/:id",
    "title": "GET a reaction by ID.",
    "name": "GetAReAction",
    "group": "Reactions",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Reaction Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "reaction",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.id",
            "description": "<p>Reaction id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "reaction[object]",
            "description": "<p>Object data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n reaction: {\n     userId: 'user44',\n     chapterId: 'chapter2',\n     reaction: 'like',\n     createdAt: '2020-11-25T12:56:52.895Z',\n     updatedAt: '2020-11-25T12:56:52.895Z',\n     id: 'IgDuJuUAAvo'\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/reactions/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/reactions/",
    "title": "GET all reactions.",
    "name": "GetReactions",
    "group": "Reactions",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Optional Params": [
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction.id",
            "description": "<p>Chapter Id</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[reaction]",
            "description": "<p>Reaction type (like|dislike|whatever).</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[chapter_id]",
            "description": "<p>Chapter id.</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[user_id]",
            "description": "<p>Authenticated user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "reaction",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.id",
            "description": "<p>Reaction id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Reaction[object]",
            "description": "<p>Reaction object data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n    \"reaction\": [{\n        \"reaction\": \"like|dislike|whatever\",\n        \"chapter\": \"chapter_id\",\n        \"user\": \"authenticated_user_id\"\n    }]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/reactions/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/reaction/",
    "title": "POST a reaction.",
    "name": "PostAReaction",
    "group": "Reactions",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Optional Params": [
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[id]",
            "description": "<p>Chapter Id</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[reaction]",
            "description": "<p>Reaction type (like|dislike|whatever).</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[chapter_id]",
            "description": "<p>Chapter id.</p>"
          },
          {
            "group": "Optional Params",
            "type": "String",
            "optional": false,
            "field": "reaction[user_id]",
            "description": "<p>Authenticated user id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   reaction: {\n     userId: 'user44',\n     chapterId: 'chapter2',\n     reaction: 'like',\n     createdAt: '2020-11-25T12:56:52.895Z',\n     updatedAt: '2020-11-25T12:56:52.895Z',\n     id: 'IgDuJuUAAvo'\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/reactions.js",
    "groupTitle": "Reactions"
  },
  {
    "type": "put",
    "url": "/api/v1/reactions/:id",
    "title": "PUT using Id.",
    "name": "PutAReAction",
    "group": "Reactions",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Reaction Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "reaction",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.id",
            "description": "<p>Reaction id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.chapterId",
            "description": "<p>Chapter id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reaction.userId",
            "description": "<p>Authenticated user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n reaction: {\n     userId: 'user44',\n     chapterId: 'chapter2',\n     reaction: 'like',\n     createdAt: '2020-11-25T12:56:52.895Z',\n     updatedAt: '2020-11-25T12:56:52.895Z',\n     id: 'IgDuJuUAAvo'\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://kkl.wikonnect.org/api/v1/reactions/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/search/chapter?",
    "title": "",
    "description": "<p>GET result search query using chapter name, description or tags /search?q={query-string-goes-here} Using QUERY string. /search?tags=highschool  Using TAGS.</p>",
    "name": "GetSearch",
    "group": "Search",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.4.0",
    "sampleRequest": [
      {
        "url": "on"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n   \"search\": [{}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n[{\n   \"error\": \"Search Unavailable\"\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "./server/routes/search.js",
    "groupTitle": "Search"
  }
] });
