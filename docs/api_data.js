define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/achievementAwards",
    "title": "POST create a achievements.",
    "name": "GetAchievementAwards",
    "group": "AchievementAwards",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievementAwards[id]",
            "description": "<p>optional achievement-award id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievementAwards[user_id]",
            "description": "<p>optional user id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievementAwards[achievementId]",
            "description": "<p>optional achievement id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievementAwards[metadata]",
            "description": "<p>optional</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"achievementAwards\": [\n     {\n       \"achievementId\": \"achievements1\",\n       \"userId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"name\": \"longest streak\",\n       \"slug\": null,\n       \"imageUrl\": \"/badges/badge1.png\",\n       \"metadata\": null,\n       \"id\": \"IrSGD70AAA4\"\n     },\n     {\n       \"achievementId\": \"achievements2\",\n       \"userId\": \"user2\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"name\": \"completed courses\",\n       \"slug\": null,\n       \"imageUrl\": \"/badges/badge1.png\",\n       \"metadata\": null,\n       \"id\": \"IrSGD8MAAA8\"\n     }\n   ]\n }",
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
    "filename": "server/routes/achievement_awards.js",
    "groupTitle": "AchievementAwards"
  },
  {
    "type": "get",
    "url": "/api/v1/achievements/:id",
    "title": "GET an achievement.",
    "name": "GetAnAchievementAward",
    "group": "AchievementAwards",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"achievementAwards\": {\n       \"achievementId\": \"achievements1\",\n       \"userId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"name\": \"longest streak\",\n       \"slug\": null,\n       \"imageUrl\": \"/badges/badge1.png\",\n       \"metadata\": null,\n       \"id\": \"IrSGD70AAA4\"\n     }\n }",
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
    "filename": "server/routes/achievement_awards.js",
    "groupTitle": "AchievementAwards",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/achievements/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/achievements/:id",
    "title": "DELETE an achievement.",
    "name": "DeleteAnAchievement",
    "group": "Achievements",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   \"achievement\": {\n     \"id\": \"string\",\n     \"description\": \"string\",\n     \"metadata\": \"jsonb\",\n     \"user_id\": \"string\",\n     \"target\": \"chapter id\",\n     \"target_status\": \"either completed, started or attempted\",\n     \"createdAt\": \"2020-11-25T12:56:52.895Z\",\n    \"updatedAt\": \"2020-11-25T12:56:52.895Z\"\n   }\n}",
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
    "filename": "server/routes/achievements.js",
    "groupTitle": "Achievements"
  },
  {
    "type": "get",
    "url": "/api/v1/achievements",
    "title": "GET all achievements.",
    "name": "GetAchievements",
    "group": "Achievements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[description]",
            "description": "<p>optional achievement description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[user_id]",
            "description": "<p>optional user id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target]",
            "description": "<p>optional chapter id for the achievement given</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target_status]",
            "description": "<p>optional either completed, started or attempted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[metadata]",
            "description": "<p>optional</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"achievement\": [\n      {\n        \"id\": \"achievements1\",\n        \"description\": \"completed chapter 2\",\n        \"metadata\": null,\n        \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n        \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n        \"userId\": \"user1\",\n        \"target\": \"chapter2\",\n        \"targetStatus\": \"completed\"\n      },\n      {\n        \"id\": \"achievements2\",\n        \"description\": \"completed chapter1\",\n        \"metadata\": null,\n        \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n        \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n        \"userId\": \"user1\",\n        \"target\": \"chapter1\",\n        \"targetStatus\": \"completed\"\n      },\n    ]\n  }",
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
    "filename": "server/routes/achievements.js",
    "groupTitle": "Achievements"
  },
  {
    "type": "get",
    "url": "/api/v1/achievements/:id",
    "title": "GET an achievement.",
    "name": "GetAnAchievement",
    "group": "Achievements",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"achievement\": {\n     \"id\": \"achievements1\",\n     \"description\": \"completed chapter 2\",\n     \"metadata\": null,\n     \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n     \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n     \"userId\": \"user1\",\n     \"target\": \"chapter2\",\n     \"targetStatus\": \"completed\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/achievements.js",
    "groupTitle": "Achievements",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/achievements/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/achievements",
    "title": "POST create a achievements.",
    "name": "PostAnAchievement",
    "group": "Achievements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[description]",
            "description": "<p>achievement description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[user_id]",
            "description": "<p>user id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target]",
            "description": "<p>chapter id for the achievement given</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target_status]",
            "description": "<p>either completed, started or attempted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[metadata]",
            "description": "<p>optional</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n   \"achievement\": {\n     \"id\": \"string\",\n     \"description\": \"string\",\n     \"metadata\": \"jsonb\",\n     \"user_id\": \"string\",\n     \"target\": \"chapter id\",\n     \"target_status\": \"either completed, started or attempted\"\n   }\n}",
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
    "filename": "server/routes/achievements.js",
    "groupTitle": "Achievements"
  },
  {
    "type": "put",
    "url": "/api/v1/achievements/:id",
    "title": "PUT an achievement.",
    "name": "PutAnAchievement",
    "group": "Achievements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[description]",
            "description": "<p>optional achievement description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[user_id]",
            "description": "<p>optional user id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target]",
            "description": "<p>optional chapter id for the achievement given</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[target_status]",
            "description": "<p>optional either completed, started or attempted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "achievement[metadata]",
            "description": "<p>optional</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n   \"achievement\": {\n     \"id\": \"string\",\n     \"description\": \"string\",\n     \"metadata\": \"jsonb\",\n     \"user_id\": \"string\",\n     \"target\": \"chapter id\",\n     \"target_status\": \"either completed, started or attempted\",\n     \"createdAt\": \"2020-11-25T12:56:52.895Z\",\n    \"updatedAt\": \"2020-11-25T12:56:52.895Z\"\n   }\n}",
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
    "filename": "server/routes/achievements.js",
    "groupTitle": "Achievements"
  },
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
          "content": "    HTTP/1.1 201 OK\n    {\n      \"user\": {\n      \"id\": \"user2\",\n      \"username\": \"user2\",\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n      \"profileUri\": \"image_url\",\n      \"flag\": false,\n      \"private\": boolean,\n      \"inviteCode\": \"invited_by\",\n      \"achievementAwards\": [\n        {\n          \"id\": \"achievementaward1\",\n          \"name\": \"completed 10 courses\",\n          \"type\": \"achievementAwards\"\n        },\n        {\n          \"id\": \"achievementaward2\",\n          \"name\": \"fully filled profile\",\n          \"type\": \"achievementAwards\"\n        }\n      ],\n      \"userRoles\": [\n        {\n          \"id\": \"4hsuh4\"\n          \"type\": \"userRole\"\n        }\n      ],\n      \"enrolledCourses\": [\n         {\n           \"id\": \"course1\",\n           \"name\": \"A Course 1\",\n           \"type\": \"course\"\n         }\n      ],\n      \"userVerification\": []\n   }\n}",
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
    "filename": "server/routes/users.js",
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
    "filename": "server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/users"
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
    "filename": "server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/users/:id/profile-image"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/users",
    "title": "POST create a new user.",
    "name": "PostAUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user[username]",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user[email]",
            "description": "<p>Unique email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user[password]",
            "description": "<p>validated password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user[invitedBy]",
            "description": "<p>optional auto filled on the form</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n   \"user\": {\n     \"id\": \"string\",\n     \"username\": \"string\",\n     \"inviteCode\": \"inviteCode\",\n     \"createdAt\": \"string\",\n     \"updatedAt\": \"string\",\n     \"metadata\": \"json_array\"\n   }\n}",
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
    "filename": "server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/users"
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
    "filename": "server/routes/auth.js",
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
    "filename": "server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/users/:id"
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
          "content": "HTTP/1.1 201 OK\n {\n   \"comment\": {\n      \"id\": \"IwAfzOoAAIE\",\n      \"chapterId\": \"chapter5\",\n      \"creatorId\": \"user3\",\n      \"comment\": \"Eligendi inventore placeat repellendus reiciendis sint nesciunt fuga.\",\n      \"metadata\": null,\n      \"createdAt\": \"2020-06-15T09:45:18.031Z\",\n      \"updatedAt\": \"2021-03-03T15:46:34.456Z\",\n      \"replies\": [{\n          \"id\": \"IwAfzOwAANc\",\n          \"chapterId\": \"chapter2\",\n          \"creatorId\": \"user1\",\n          \"comment\": \"Quo aut eum qui omnis id.\",\n          \"metadata\": null,\n          \"createdAt\": \"2020-08-29T02:40:56.161Z\",\n          \"updatedAt\": \"2021-03-04T01:56:56.855Z\",\n          \"type\": \"comment\"\n        },\n        {\n          \"id\": \"IwAfzOuAALw\",\n          \"chapterId\": \"chapter2\",\n          \"creatorId\": \"user1\",\n          \"comment\": \"Excepturi modi qui qui.\",\n          \"metadata\": null,\n          \"createdAt\": \"2020-10-24T21:09:29.287Z\",\n           \"updatedAt\": \"2021-03-04T11:58:38.484Z\",\n          \"type\": \"comment\"\n        }],\n        \"type\": \"comment\"\n      }\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/comments.js",
    "groupTitle": "ChapterComments",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/:comment_id"
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
          "content": "HTTP/1.1 201 OK\n{\n \"comment\": [{\n      \"id\": \"IwAfzOoAAIE\",\n      \"chapterId\": \"chapter5\",\n      \"creatorId\": \"user3\",\n      \"comment\": \"Eligendi inventore placeat repellendus reiciendis sint nesciunt fuga.\",\n      \"metadata\": null,\n      \"createdAt\": \"2020-06-15T09:45:18.031Z\",\n      \"updatedAt\": \"2021-03-03T15:46:34.456Z\",\n      \"replies\": [{\n          \"id\": \"IwAfzOwAANc\",\n          \"chapterId\": \"chapter2\",\n          \"creatorId\": \"user1\",\n          \"comment\": \"Quo aut eum qui omnis id.\",\n          \"metadata\": null,\n          \"createdAt\": \"2020-08-29T02:40:56.161Z\",\n          \"updatedAt\": \"2021-03-04T01:56:56.855Z\",\n          \"type\": \"comment\"\n        },\n        {\n          \"id\": \"IwAfzOuAALw\",\n          \"chapterId\": \"chapter2\",\n          \"creatorId\": \"user1\",\n          \"comment\": \"Excepturi modi qui qui.\",\n          \"metadata\": null,\n          \"createdAt\": \"2020-10-24T21:09:29.287Z\",\n           \"updatedAt\": \"2021-03-04T11:58:38.484Z\",\n          \"type\": \"comment\"\n        }],\n        \"type\": \"comment\"\n      }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/comments.js",
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
    "filename": "server/routes/comments.js",
    "groupTitle": "ChapterComments"
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
    "filename": "server/routes/comments.js",
    "groupTitle": "ChapterComments"
  },
  {
    "type": "delete",
    "url": "/api/v1/review/:id",
    "title": "Delete a chapter",
    "name": "DELETE_a_chapter_by_Id",
    "group": "Chapters",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the chapter to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{ }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/review/:id"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the chapter to update</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "chapter[object]",
            "description": "<p>Chapter data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n       \"id\": \"chapter1\",\n       \"lessonId\": \"lesson1\",\n       \"name\": \"A Chapter\",\n       \"slug\": \"a-chapter\",\n       \"description\": \"An H5P Chapter.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"contentType\": \"h5p\",\n       \"contentUri\": \"/uploads/h5p/chapter1\",\n       \"imageUrl\": \"/uploads/images/content/chapters/chapter1.jpeg\",\n       \"contentId\": null,\n       \"tags\": [],\n       \"likes\": \"0\",\n       \"dislikes\": \"0\",\n       \"rating\": null,\n       \"verified\": true,\n       \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n       \"author\": {\n         \"username\": \"user1\",\n         \"profileUri\": null,\n         \"lastSeen\": \"2021-02-22T11:57:10.468Z\"\n       },\n       \"reaction\": [{\n         \"likes\": 3,\n         \"authenticated_user\": \"like\",\n         \"reaction.id\": \"\",\n         \"dislikes\": 1\n       }]\n    }\n }",
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
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/chapters/:id"
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
    "description": "<p>Get all chapters. Filter enabled through query params using available chapter properties</p>",
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "chapter[name]",
            "description": "<p>Query by chapter</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "chapter[status]",
            "description": "<p>Query by chapter status - published | draft</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "chapter[creatorId]",
            "description": "<p>Query by author of a chapter</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "chapter[approved]",
            "description": "<p>Query by approval status</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n  {\n    \"meta\": {\n        \"total_pages\": 20.2\n    },\n    \"chapters\": [{\n        \"id\": \"chapter1\",\n        \"lessonId\": \"lesson1\",\n        \"name\": \"A Chapter\",\n        \"slug\": \"a-chapter\",\n        \"description\": \"An H5P Chapter.\",\n        \"status\": \"published\",\n        \"creatorId\": \"user1\",\n        \"metadata\": null,\n        \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n        \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n        \"contentType\": \"h5p\",\n        \"contentUri\": \"/uploads/h5p/chapter1\",\n        \"imageUrl\": null,\n        \"tags\": [ \"highschool\", \"university\" ],\n        \"contentId\": null,\n        \"approved\": true,\n        \"verified\": true,\n        \"topics\": null,\n        \"views\": \"3\",\n        \"ratings\": \"3.6666666666666667\",\n        \"authenticatedUser\": null,\n        \"authenticatedUserReactionId\": null,\n        \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n        \"reaction\": [{\n            \"totalLikes\": \"4\",\n            \"likes\": \"3\",\n            \"dislikes\": \"1\"\n           }],\n        \"flag\": [],\n        \"author\": {\n            \"username\": \"user1\",\n            \"profileUri\": null,\n            \"lastSeen\": \"2021-02-25T09:19:08.239Z\"\n        }\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/chapters/"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/chapters.js",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "chapter[name]",
            "description": "<p>Name of the chapter.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "chapter[description]",
            "description": "<p>Description of the chapter.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "chapter[status]",
            "description": "<p>Chapter status - published | draft</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "optional": true,
            "field": "chapter[approved]",
            "description": "<p>If chapter has been approved: Default is false</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "chapter[tags]",
            "description": "<p>Tags list.</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "chapter[reviewQuestions]",
            "description": "<p>An array of review question categories.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n   \"id\": \"chapter4\",\n   \"lessonId\": \"lesson2\",\n   \"name\": \"A Chapter4\",\n   \"slug\": \"a-chapter4\",\n   \"description\": \"An H5P Chapter.\",\n   \"status\": \"published\",\n   \"creatorId\": \"user1\",\n   \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n   \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n   \"contentType\": \"h5p\",\n   \"contentUri\": \"/uploads/h5p/chapter4\",\n   \"imageUrl\": null,\n   \"contentId\": null,\n   \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n   \"tags\": [],\n   \"approved\": false\n }",
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
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "deprecated": {
      "content": "use now (#HP5:Save H5P)."
    },
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
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
            "type": "String",
            "optional": false,
            "field": "host",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": ""
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
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/chapters/:id/upload"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
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
            "type": "String",
            "optional": false,
            "field": "host",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": ""
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
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/chapters/:id/chapter-image"
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/chapters/:id"
      }
    ],
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the chapter to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "chapter[name]",
            "description": "<p>Name of the chapter.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "chapter[description]",
            "description": "<p>Description of the chapter.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "chapter[status]",
            "description": "<p>Chapter status - published | draft</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "optional": true,
            "field": "chapter[approved]",
            "description": "<p>If chapter has been approved: Default is false</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "chapter[tags]",
            "description": "<p>Tags list.</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": true,
            "field": "chapter[reviewQuestions]",
            "description": "<p>An array of review question categories.</p>"
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
    "filename": "server/routes/chapters.js",
    "groupTitle": "Chapters"
  },
  {
    "type": "get",
    "url": "/api/v1/h5p/editor/",
    "title": "GET H5P editor model",
    "name": "GET_H5P_editor_model",
    "group": "H5P",
    "permission": [
      {
        "name": "[authenticated user]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "language",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[editor]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[user]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[ajax]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[l10n]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[ajaxPath]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[libraryUrl]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[url]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "integration[fullscreenDisabled]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "integration[saveFreq]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "integration[postUserStatistics]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "scripts",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "styles",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "urlGenerator",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "urlGenerator[config]",
            "description": ""
          }
        ]
      }
    },
    "filename": "server/routes/h5p.js",
    "groupTitle": "H5P",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/h5p/editor/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/h5p/editor/:contentId",
    "title": "GET H5P editor & content model",
    "name": "GET_H5P_editor_model_with_content",
    "group": "H5P",
    "permission": [
      {
        "name": "[authenticated user]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "contentId",
            "description": "<p>Id of the content to preload</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[editor]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[user]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[ajax]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "integration[l10n]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[ajaxPath]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[libraryUrl]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "integration[url]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "integration[fullscreenDisabled]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "integration[saveFreq]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "integration[postUserStatistics]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "scripts",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "styles",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "urlGenerator",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "urlGenerator[config]",
            "description": ""
          }
        ]
      }
    },
    "filename": "server/routes/h5p.js",
    "groupTitle": "H5P",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/h5p/editor/:contentId"
      }
    ]
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
    "filename": "server/routes/lessons.js",
    "groupTitle": "Lessons",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/lessons/:id"
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
    "filename": "server/routes/lessons.js",
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
    "filename": "server/routes/lessons.js",
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
    "filename": "server/routes/lessons.js",
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
    "filename": "server/routes/lessons.js",
    "groupTitle": "Lessons"
  },
  {
    "type": "delete",
    "url": "/api/v1/notification/:id",
    "title": "Delete a notification",
    "name": "DELETE_a_notification_by_Id",
    "group": "Notifications",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the notification to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{ }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/notifications.js",
    "groupTitle": "Notifications",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/notification/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/notifications/:id",
    "title": "GET notification by Id",
    "name": "Get_a_notification_by_Id",
    "group": "Notifications",
    "permission": [
      {
        "name": "[authenticated user]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Bearer &lt;&lt; JWT here&gt;&gt;]</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>notification id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"notification\":{\n            \"id\": \"I3ml3x-AAPE\",\n            \"title\": \"Your chapter has been approved\",\n            \"body\": \"Your recently published chapter has been approved!\",\n            \"itemId\": \"I3lchuEAA80\",\n            \"eventType\": \"chapter-approved\",\n            \"model\": \"chapter\",\n            \"recipientId\": \"user2\",\n            \"creatorId\": \"user1\",\n            \"read\": false,\n            \"metadata\":{\"sendEmail\": true},\n            \"createdAt\": \"2021-04-20T20:12:39.830Z\",\n            \"updatedAt\": \"2021-04-20T20:12:39.830Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/notifications.js",
    "groupTitle": "Notifications",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/notifications/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/notifications",
    "title": "GET all notifications",
    "name": "Get_all_notifications",
    "group": "Notifications",
    "permission": [
      {
        "name": "[authenticated user]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Bearer &lt;&lt; JWT here&gt;&gt;]</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notification[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Query Params",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"notification\":{\n            \"id\": \"I3ml3x-AAPE\",\n            \"title\": \"Your chapter has been approved\",\n            \"body\": \"Your recently published chapter has been approved!\",\n            \"itemId\": \"I3lchuEAA80\",\n            \"eventType\": \"chapter-approved\",\n            \"model\": \"chapter\",\n            \"recipientId\": \"user2\",\n            \"creatorId\": \"user1\",\n            \"read\": false,\n            \"metadata\":{\"sendEmail\": true},\n            \"createdAt\": \"2021-04-20T20:12:39.830Z\",\n            \"updatedAt\": \"2021-04-20T20:12:39.830Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/notifications.js",
    "groupTitle": "Notifications",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/notifications"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/notification",
    "title": "PUT a notification",
    "name": "PUT_a_notification_by_Id",
    "group": "Notifications",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Notification Id to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "optional": true,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[createdAt]",
            "description": "<p>Date record was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[updatedAt]",
            "description": "<p>Date record was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"notification\":{\n            \"id\": \"I3ml3x-AAPE\",\n            \"title\": \"You have a new chapter comment\",\n            \"body\": \"Your recently approved chapter has received a comment!\",\n            \"itemId\": \"I3lchuEAA80\",\n            \"eventType\": \"chapter-comment\",\n            \"model\": \"chapter\",\n            \"recipientId\": \"user2\",\n            \"creatorId\": \"user1\",\n            \"read\": false,\n            \"metadata\":{\"sendEmail\": false},\n            \"createdAt\": \"2021-04-20T20:12:39.830Z\",\n            \"updatedAt\": \"2021-04-20T20:12:39.830Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/notifications.js",
    "groupTitle": "Notifications",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/notification"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/notifications",
    "title": "POST a notification",
    "name": "Post_a_notification",
    "group": "Notifications",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[model]",
            "description": "<p>Optional model name related to notification (refer to Wikonnect/frontend/app/models)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Optional Id of model record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "notification[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n     {\n        \"notifications\":[{\n            \"id\": \"I3ml3x-AAPE\",\n            \"title\": \"Your chapter has been approved\",\n            \"body\": \"Your recently published chapter has been approved!\",\n            \"itemId\": \"I3lchuEAA80\",\n            \"eventType\": \"chapter-approved\",\n            \"model\": \"chapter\",\n            \"recipientId\": \"user2\",\n            \"creatorId\": \"user1\",\n            \"read\": false,\n            \"metadata\":{\"sendEmail\": true},\n            \"createdAt\": \"2021-04-20T20:12:39.830Z\",\n            \"updatedAt\": \"2021-04-20T20:12:39.830Z\"\n           }]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/notifications.js",
    "groupTitle": "Notifications",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/notifications"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/oembed/",
    "title": "GET an oembed structure.",
    "name": "GetOembed",
    "group": "Oembed",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Get and embed format using url query params</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>absolute_url to chapter id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "format",
            "description": "<p>Optional either xml or json (default).</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "maxwidth",
            "description": "<p>Optional iframe width</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "minheight",
            "description": "<p>Optional iframe height</p>"
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
            "field": "List",
            "description": "<p>of chapters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>version string</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>data type referencing the object asked for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_url",
            "description": "<p>absolute url</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "width",
            "description": "<p>content width</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "height",
            "description": "<p>content height</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>object title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "html",
            "description": "<p>formatted iframe code in html</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/oembed/?url=https://app.wikonnect.org/chapter/IPUkk_YAA9w?callbackUrl=https://webhook.com\n\n\nhttp://localhost/api/v1/oembed?url=http://localhost:4200/chapters/chapter1\n{\n   \"version\": \"1.0\",\n   \"type\": \"h5p\",\n   \"provider_name\": \"Wikonnect\",\n   \"provider_url\": \"http://app.wikonnect.org/\",\n   \"width\": 425,\n   \"height\": 344,\n   \"title\": \"Cyber bullying\",\n\n   \"html\":\n      \"<iframe width=\\\"560\\\" height=\\\"315\\\" src=\\\"http://localhost:4200/embed/chapter1\\\" ></iframe>\",\n}"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/oembed.js",
    "groupTitle": "Oembed"
  },
  {
    "type": "delete",
    "url": "/api/v1/review/:id",
    "title": "Delete a chapter review",
    "name": "DELETE_a_chapter_review_by_Id",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the review to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{ }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/reviews.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/review/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/ratings/:id",
    "title": "Delete a chapter rating and review",
    "name": "DELETE_ratings_and_review_by_Id",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>rating id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{ }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/ratings.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/ratings/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/ratings",
    "title": "GET all chapter ratings",
    "name": "Get_all_ratings",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "isDeleted",
            "description": "<p>filter by deleted status</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>relationships to eager load (comma separated)</p>"
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
            "field": "ratings",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[id]",
            "description": "<p>rating id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[averageRating]",
            "description": "<p>average record rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "rating[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"ratings\":[{\n    \"id\": \"IzM6odwAASI\",\n    \"chapterId\": \"IzMs75WAAA0\",\n    \"reaction\": \"like\",\n    \"metadata\": {\"language\": 2, \"audioQuality\": 1, \"contentAccuracy\": 1},\n    \"userId\": \"user1\",\n    \"averageRating\": \"1.33\",\n    \"isDeleted\": false,\n    \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n    \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n   }]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/ratings.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/ratings"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/reviews",
    "title": "GET all chapter reviews",
    "name": "Get_all_reviews",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>filter by deleted status (optional)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "include",
            "description": "<p>relationships to eager load (comma separated &amp; optional)</p>"
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
            "field": "review",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[id]",
            "description": "<p>review id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[ratingId]",
            "description": "<p>associated rating Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "review[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"review\":[{\n      \"id\": \"IzLEIXSAASc\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"ratingId\": \"IzLDvwGAASY\",\n      \"metadata\":{\"language\": \"Great\", \"audioQuality\": \"Good\", \"contentAccuracy\":[\"Citations provided\",\"Good\"]},,\n      \"userId\": \"user1\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/reviews.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reviews"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/ratings/:id",
    "title": "GET chapter rating by Id",
    "name": "Get_rating_by_Id",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>rating id</p>"
          }
        ],
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "isDeleted",
            "description": "<p>filter by deleted status</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>relationships to eager load (comma separated)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[id]",
            "description": "<p>rating id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[averageRating]",
            "description": "<p>average record rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "rating[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"rating\":{\n      \"id\": \"IzM6odwAASI\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"metadata\":{\"language\": 2, \"audioQuality\": 1, \"contentAccuracy\": 1},\n      \"userId\": \"user1\",\n      \"averageRating\": \"1.33\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/ratings.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/ratings/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/reviews/:id",
    "title": "GET chapter review by Id",
    "name": "Get_review_by_Id",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>review id</p>"
          }
        ],
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "isDeleted",
            "description": "<p>filter by deleted status</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>relationships to eager load (comma separated)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[id]",
            "description": "<p>review id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[ratingId]",
            "description": "<p>associated rating Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "review[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"review\":{\n      \"id\": \"IzLEIXSAASc\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"ratingId\": \"IzLDvwGAASY\",\n      \"metadata\":{\"language\": \"Great\", \"audioQuality\": \"Good\", \"contentAccuracy\":[\"Citations provided\",\"Good\"]},,\n      \"userId\": \"user1\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/reviews.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reviews/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/review-questions",
    "title": "GET review questions",
    "name": "Get_review_questions",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "string",
            "optional": true,
            "field": "categories",
            "description": "<p>categories to filter (comma separated)</p>"
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
            "field": "reviewQuestions",
            "description": "<p>Top level array of question objects</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reviewQuestions[category]",
            "description": "<p>category unique identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reviewQuestions[title]",
            "description": "<p>category title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"reviewQuestions\": [\n       {\n           \"category\": \"audioVideoQuality\",\n           \"title\": \"Audio & video quality\"\n       },\n       {\n           \"category\": \"soundQuality\",\n           \"title\": \"Sound quality\"\n       }\n\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/review-questions.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/review-questions"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/ratings/:id",
    "title": "PUT a chapter rating",
    "name": "PUT_a_chapter_rating",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rating to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "rating",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "rating[id]",
            "description": "<p>rating id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "rating[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "rating[review]",
            "description": "<p>related review object (check POST review docs)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[id]",
            "description": "<p>rating id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[averageRating]",
            "description": "<p>average record rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "rating[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"rating\":{\n      \"id\": \"IzM6odwAASI\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"metadata\":{\"language\": 2, \"audioQuality\": 1, \"contentAccuracy\": 1},\n      \"userId\": \"user1\",\n      \"averageRating\": \"1.33\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/ratings.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/ratings/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/review",
    "title": "PUT a chapter review",
    "name": "PUT_a_chapter_review_by_Id",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>review id to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "review[chapterId]",
            "description": "<p>chapter being rated</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "review[reaction]",
            "description": "<p>chapter reaction</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "review[ratingId]",
            "description": "<p>related chapter rating Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[id]",
            "description": "<p>review id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[ratingId]",
            "description": "<p>associated rating Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "review[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"review\":{\n      \"id\": \"IzLEIXSAASc\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"ratingId\": \"IzLDvwGAASY\",\n      \"metadata\":{\"language\": \"Great\", \"audioQuality\": \"Good\", \"contentAccuracy\":[\"Citations provided\",\"Good\"]},,\n      \"userId\": \"user1\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/reviews.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/review"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/ratings",
    "title": "POST a chapter rating",
    "name": "Post_a_chapter_rating",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "rating[chapterId]",
            "description": "<p>chapter being rated</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "rating[reaction]",
            "description": "<p>chapter reaction</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "rating[review]",
            "description": "<p>related review object  (check POST review docs)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[id]",
            "description": "<p>rating id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rating[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[averageRating]",
            "description": "<p>average record rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "rating[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rating[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"rating\":{\n      \"id\": \"IzM6odwAASI\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"metadata\":{\"language\": 2, \"audioQuality\": 1, \"contentAccuracy\": 1},\n      \"userId\": \"user1\",\n      \"averageRating\": \"1.33\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/ratings.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/ratings"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/review",
    "title": "POST a chapter review",
    "name": "Post_a_review",
    "group": "Ratings_and_Review",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "review[chapterId]",
            "description": "<p>chapter being rated</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "review[reaction]",
            "description": "<p>chapter reaction</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "review[ratingId]",
            "description": "<p>related chapter rating Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[id]",
            "description": "<p>review id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[chapterId]",
            "description": "<p>associated chapter Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[ratingId]",
            "description": "<p>associated rating Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "review[metadata]",
            "description": "<p>rating metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[userId]",
            "description": "<p>rating owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "review[isDeleted]",
            "description": "<p>if record was deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "review[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"review\":{\n      \"id\": \"IzLEIXSAASc\",\n      \"chapterId\": \"IzMs75WAAA0\",\n      \"reaction\": \"like\",\n      \"ratingId\": \"IzLDvwGAASY\",\n      \"metadata\":{\"language\": \"Great\", \"audioQuality\": \"Good\", \"contentAccuracy\":[\"Citations provided\",\"Good\"]},,\n      \"userId\": \"user1\",\n      \"isDeleted\": false,\n      \"createdAt\": \"2021-03-24T11:51:33.520Z\",\n      \"updatedAt\": \"2021-03-24T11:51:33.520Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/reviews.js",
    "groupTitle": "Ratings_and_Review",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/review"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/reactions/:id",
    "title": "DELETE using Id.",
    "name": "DeleteARection",
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
    "filename": "server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reactions/:id"
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
    "filename": "server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reactions/:id"
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
    "filename": "server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reactions/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/reactions/",
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
    "filename": "server/routes/reactions.js",
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
    "filename": "server/routes/reactions.js",
    "groupTitle": "Reactions",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/reactions/:id"
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
    "filename": "server/routes/search.js",
    "groupTitle": "Search"
  },
  {
    "type": "get",
    "url": "/api/v1/userRole/:id",
    "title": "GET user role by userId",
    "name": "Get_user_role_by_userId",
    "group": "UserRole",
    "permission": [
      {
        "name": "authenticated user[moderator/admin/superadmin]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>user role id</p>"
          }
        ],
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "userId",
            "description": "<p>filter by userId</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "groupId",
            "description": "<p>filter by groupId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_role",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[userId]",
            "description": "<p>users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[groupId]",
            "description": "<p>associated group name Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[updatedAt]",
            "description": "<p>date updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[group]",
            "description": "<p>group details object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"user_role\": [\n     {\n       \"userId\": \"user1\",\n       \"groupId\": \"groupAdmin\",\n       \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n       \"group\": [{\n           \"id\": \"groupAdmin\",\n           \"name\": \"admin\",\n           \"slug\": \"role-admin\",\n           \"description\": \"\",\n           \"metadata\": null,\n           \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n           \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n           \"type\": \"userRoles\"\n       }]\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/user_role.js",
    "groupTitle": "UserRole",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/userRole/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/userRole",
    "title": "GET all user roles",
    "name": "Get_user_roles",
    "group": "UserRole",
    "permission": [
      {
        "name": "authenticated user[moderator/admin/superadmin]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>user role id</p>"
          }
        ],
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "userId",
            "description": "<p>filter by userId</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "groupId",
            "description": "<p>filter by groupId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_role",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[userId]",
            "description": "<p>users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[groupId]",
            "description": "<p>associated group name Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[updatedAt]",
            "description": "<p>date updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[group]",
            "description": "<p>group details object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"user_role\": [\n     {\n       \"userId\": \"user1\",\n       \"groupId\": \"groupAdmin\",\n       \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n       \"group\": [{\n           \"id\": \"groupAdmin\",\n           \"name\": \"admin\",\n           \"slug\": \"role-admin\",\n           \"description\": \"\",\n           \"metadata\": null,\n           \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n           \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n           \"type\": \"userRoles\"\n       }]\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/user_role.js",
    "groupTitle": "UserRole",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/userRole"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/userRole/:id",
    "title": "PUT user role by userId",
    "name": "Put_user_role_by_userId",
    "group": "UserRole",
    "permission": [
      {
        "name": "authenticated user[moderator/admin/superadmin]"
      }
    ],
    "version": "0.4.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;&lt; JWT here&gt;&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI Param": [
          {
            "group": "URI Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>user role id</p>"
          }
        ],
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": true,
            "field": "groupId",
            "description": "<p>filter by groupId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_role",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[userId]",
            "description": "<p>users id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[groupId]",
            "description": "<p>associated group name Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[updatedAt]",
            "description": "<p>date updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_role[group]",
            "description": "<p>group details object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"user_role\": [\n     {\n       \"userId\": \"user1\",\n       \"groupId\": \"groupAdmin\",\n       \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n       \"group\": [{\n           \"id\": \"groupAdmin\",\n           \"name\": \"admin\",\n           \"slug\": \"role-admin\",\n           \"description\": \"\",\n           \"metadata\": null,\n           \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n           \"updatedAt\": \"2019-12-20T16:17:10.000Z\",\n           \"type\": \"userRoles\"\n       }]\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/user_role.js",
    "groupTitle": "UserRole",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/userRole/:id"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/counters/:id",
    "title": "DELETE a view counter.",
    "name": "DeleteViewCounters",
    "group": "ViewCounters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n {\n   \"counter\": {\n      \"id\": \"2\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/counter.js",
    "groupTitle": "ViewCounters"
  },
  {
    "type": "get",
    "url": "/api/v1/counters/:id",
    "title": "GET a view counter.",
    "name": "GetAViewCounters",
    "group": "ViewCounters",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n   \"counter\": {\n      \"id\": \"1\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/counter.js",
    "groupTitle": "ViewCounters"
  },
  {
    "type": "get",
    "url": "/api/v1/counters",
    "title": "GET all view counters.",
    "name": "GetViewCounters",
    "group": "ViewCounters",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trigger",
            "description": "<p>optional preset triggers</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chapterId",
            "description": "<p>optional chapter id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter",
            "description": "<p>optional integer counter</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"counter\": [\n     {\n      \"id\": \"1\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n     },\n     {\n      \"id\": \"2\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/counter.js",
    "groupTitle": "ViewCounters"
  },
  {
    "type": "post",
    "url": "/api/v1/counters",
    "title": "POST a view counter.",
    "name": "PostViewCounters",
    "group": "ViewCounters",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[trigger]",
            "description": "<p>optional preset triggers</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[chapterId]",
            "description": "<p>optional chapter id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[counter]",
            "description": "<p>optional integer counter</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n   \"counter\": {\n      \"id\": \"1\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/counter.js",
    "groupTitle": "ViewCounters"
  },
  {
    "type": "put",
    "url": "/api/v1/counters/:id",
    "title": "PUT a view counter.",
    "name": "PutViewCounters",
    "group": "ViewCounters",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[trigger]",
            "description": "<p>optional preset triggers</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[chapterId]",
            "description": "<p>optional chapter id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "counter[counter]",
            "description": "<p>optional integer counter</p>"
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
          "content": "  HTTP/1.1 200 OK\n {\n   \"counter\": {\n      \"id\": \"2\",\n      \"trigger\": \"chapterCompletion\",\n      \"chapterId\": \"chapter1\",\n      \"counter\": 3,\n      \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n      \"updatedAt\": \"2017-12-20T16:17:10.000Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/counter.js",
    "groupTitle": "ViewCounters"
  }
] });
