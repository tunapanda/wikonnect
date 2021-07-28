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
    "type": "post",
    "url": "/api/v1/auth/forgot_password",
    "title": "POST forgot user route.",
    "name": "ForgotPasswordRoute",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "auth[email]",
            "description": "<p>emailAddress</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "basic"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://localhost:3000/api/v1/auth/forgot_password"
      }
    ],
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
    "type": "post",
    "url": "/api/v1/auth/reset_password",
    "title": "POST new password.",
    "name": "ForgotPasswordRoute",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "auth[new_password]",
            "description": "<p>newPassword</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "auth[verify_password]",
            "description": "<p>verifyPassword</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "auth[token]",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "auth[email]",
            "description": "<p>email</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "basic"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://localhost:3000/api/v1/auth/reset_password"
      }
    ],
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
        "name": "admin, moderator, or basic"
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
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Get a user with a specified id</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Get a user with a specified username</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Get a user with a specified email</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "lastIp",
            "description": "<p><strike>filter users based on their last recorded IP address</strike></p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "inviteCode",
            "description": "<p>Get a user with a specified inviteCode</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "private",
            "description": ""
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "location",
            "description": "<p>filter users based on location</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>filter users based on their gender</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "contactNumber",
            "description": "<p><strike>filter users based on contact number</strike></p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "aggregate",
            "description": "<p>Aggregates to include separated with comma (userFollowers,enrolledCourses,followedTags,approvedchapters,publishedcourses)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>Relations to include seperated with comma (userfollowees)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "followerId",
            "description": "<p>User Id which to filter user-followees for. The include query param must request <code>userfollowees</code> e.g. /?include=userfollowees&amp;followerId=user1</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \"users\":[\n           {\n               \"id\": \"user1\",\n               \"name\": \"user1\"\n               \"email\": \"user1@wikonnect.org\",\n               \"username\": \"user1\",\n               \"lastSeen\": \"2021-07-02T04:31:52.718Z\",\n               \"metadata\":{\"profileComplete\": \"true\", \"oneInviteComplete\": \"false\", \"oneChapterCompletion\": \"false\"},\n               \"createdAt\": \"2017-12-20T19:17:10.000Z\",\n               \"updatedAt\": \"2021-07-01T16:09:58.303Z\",\n               \"profileUri\": \"/uploads/images/profile-placeholder.gif\",\n               \"inviteCode\": \"user1\",\n               \"private\": \"true\",\n               \"tags\": \"{\\\"highschool\\\",\\\"primary\\\",\\\"university\\\"}\",\n               \"emailVerified\": false,\n               \"phoneVerified\": false,\n               \"flag\": false,\n               \"location\": \"Huntington, Malawi\",\n               \"contactNumber\": \"+549900080861\",\n               \"gender\": \"N/A\",\n               totalUserFollowers\": \"2\",\n               \"totalCoursesEnrolled\": \"5\",\n               \"totalTagsFollowed\": \"1\",\n               \"totalChaptersPublished\": \"1\",\n               \"totalChaptersApproved\": \"5\",\n               \"achievementAwards\":[{\"id\": \"JDKOZASAADo\", \"name\": \"longest streak\", \"achievementId\": \"achievements1\",…],\n               \"userRoles\":[{\"id\": \"groupAdmin\", \"name\": \"admin\", \"slug\": \"role-admin\",…],\n               \"enrolledCourses\":[{\"id\": \"JDKOY80AA7A\", \"name\": \"culpa nihil cumque\", \"type\": \"course\"…],\n               \"userFollowees\":[{\"id\": \"JDKOY-uAACc\", \"userId\": \"user1\", \"followeeId\": \"JDKOYwqAAZw\",…] *\n           }\n   ]\n }",
          "type": "json"
        }
      ]
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
    "type": "post",
    "url": "/api/v1/users/verify",
    "title": "POST user's email to validate.",
    "name": "PostLoginAUserEmail",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user[email]",
            "description": "<p>emailAddress</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "basic"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://localhost:3000/api/v1/users/verify"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"user\":{\n     \"email\": \"emailAddress\",\n     \"emailVerified\": \"true\",\n   }\n}",
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
    "url": "/api/v1/users/verify",
    "title": "Validate a users email.",
    "name": "ValidateAUsersEmail",
    "group": "Authentication",
    "version": "0.4.0",
    "description": "<p>Validate a users email using token sent via email</p>",
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
            "field": "user[token]",
            "description": "<p>username</p>"
          },
          {
            "group": "Required Params",
            "type": "string",
            "optional": false,
            "field": "user[email]",
            "description": "<p>Unique email</p>"
          }
        ]
      }
    },
    "filename": "server/routes/users.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/users/verify"
      }
    ]
  },
  {
    "type": "post",
    "url": "/badges/:id/badge-image",
    "title": "POST badge image.",
    "name": "Badges",
    "description": "<p>upload a badge image</p>",
    "group": "Badge",
    "version": "0.4.0",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[id]",
            "description": "<p>badge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[slug]",
            "description": "<p>path to view the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[createdAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[updatedAt]",
            "description": ""
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
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/badges/:id/badge-image"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/badges/:id",
    "title": "Delete a badge.",
    "name": "DELETE_a_Badge",
    "description": "<p>DELETE a badge using id</p>",
    "group": "Badge",
    "permission": [
      {
        "name": "[admin, superadmin]"
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
            "description": "<p>badge id</p>"
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
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/badges/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/badges/:id",
    "title": "GET a badge details.",
    "name": "GET_a_badge_details",
    "group": "Badge",
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
            "description": "<p>Id of the badge to update</p>"
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
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[id]",
            "description": "<p>badge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[slug]",
            "description": "<p>path to view the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[createdAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[updatedAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badge_triggers]",
            "description": "<p>[id] trigger id same as trigger string</p>"
          }
        ]
      }
    },
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/badges/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/badges",
    "title": "GET all badge details.",
    "name": "GET_all_badge_details",
    "group": "Badge",
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
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[id]",
            "description": "<p>badge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[slug]",
            "description": "<p>path to view the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[createdAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[updatedAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badge_triggers]",
            "description": "<p>[id] trigger id same as trigger string</p>"
          }
        ]
      }
    },
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/badges"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/badges/",
    "title": "POST a new badge.",
    "name": "POST_a_badge_details",
    "group": "Badge",
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
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "optional": true,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Request Body",
            "optional": true,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
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
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[id]",
            "description": "<p>badge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[slug]",
            "description": "<p>path to view the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[createdAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[updatedAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badge_triggers]",
            "description": "<p>[id] trigger id same as trigger string</p>"
          }
        ]
      }
    },
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/badges/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/badges/:id",
    "title": "PUT a badge details.",
    "name": "PUT_a_badge_details",
    "group": "Badge",
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
            "description": "<p>Id of the badge to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "badge[name]",
            "description": "<p>badge name</p>"
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
            "field": "badge",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[id]",
            "description": "<p>badge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[name]",
            "description": "<p>name given to badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[slug]",
            "description": "<p>path to view the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badgeUri]",
            "description": "<p>image link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[triggerId]",
            "description": "<p>foreign key for badge trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[creatorId]",
            "description": "<p>creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[points]",
            "description": "<p>points awarded to badge owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[description]",
            "description": "<p>badge explanation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[expiry]",
            "description": "<p>date time of expiry of the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "badge[isDeleted]",
            "description": "<p>boolean indicating if soft deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "badge[metadata]",
            "description": "<p>JSON metadata</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[frequency]",
            "description": "<p>No. of times one should trigger to earn the badge</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badge[reminder]",
            "description": "<p>No. of times before a reminder sent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[reminderMessage]",
            "description": "<p>Reminder message to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[createdAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[updatedAt]",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "badge[badge_triggers]",
            "description": "<p>[id] trigger id same as trigger string</p>"
          }
        ]
      }
    },
    "filename": "server/routes/badges.js",
    "groupTitle": "Badge",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/badges/:id"
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
          "content": "HTTP/1.1 200 OK\n{ }",
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
            "field": "name",
            "description": "<p>Query by chapter name</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "slug",
            "description": "<p>Query by chapter slug</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Query by chapter status - published | draft</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>Query by author of a chapter</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "approved",
            "description": "<p>Query by approval status</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "tags",
            "description": "<p>Query by tag identifier-(separated by comma)</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Seek chapters by page number</p>"
          },
          {
            "group": "Query Params",
            "type": "Number",
            "optional": true,
            "field": "per_page",
            "description": "<p>Number of items to return per page</p>"
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
          "content": " HTTP/1.1 200 OK\n  {\n    \"meta\": {\n        \"total_pages\": 20.2\n    },\n    \"chapters\": [{\n        \"id\": \"chapter1\",\n        \"lessonId\": \"lesson1\",\n        \"name\": \"A Chapter\",\n        \"slug\": \"a-chapter\",\n        \"description\": \"An H5P Chapter.\",\n        \"status\": \"published\",\n        \"creatorId\": \"user1\",\n        \"metadata\": null,\n        \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n        \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n        \"contentType\": \"h5p\",\n        \"contentUri\": \"\",\n        \"imageUrl\": null,\n        \"contentId\": \"3532080528\",\n        \"approved\": true,\n        \"verified\": true,\n        \"topics\": null,\n        \"views\": \"3\",\n        \"ratings\": \"3.6666666666666667\",\n        \"authenticatedUser\": null,\n        \"authenticatedUserReactionId\": null,\n        \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n        \"reaction\": [{\n            \"totalLikes\": \"4\",\n            \"likes\": \"3\",\n            \"dislikes\": \"1\"\n           }],\n        \"flag\": [],\n        \"author\": {\n            \"username\": \"user1\",\n            \"profileUri\": null,\n            \"lastSeen\": \"2021-02-25T09:19:08.239Z\"\n        },\n     \"tags\": [{ \"id\": \"JCjap-qAAu0\",  \"name\": \"Test On\", \"slug\": \"test-one\",  \"type\": \"tag\" }]\n    }]\n}",
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
    "type": "get",
    "url": "/api/v1/chapters/:id",
    "title": "GET single chapter.",
    "name": "Get_a_chapter_by_id",
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
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n       \"id\": \"chapter1\",\n       \"lessonId\": \"lesson1\",\n       \"name\": \"A Chapter\",\n       \"slug\": \"a-chapter\",\n       \"description\": \"An H5P Chapter.\",\n       \"status\": \"published\",\n       \"creatorId\": \"user1\",\n       \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n       \"contentType\": \"h5p\",\n       \"contentUri\": \"\",\n       \"imageUrl\": \"/uploads/images/content/chapters/chapter1.jpeg\",\n       \"contentId\": \"3532080528\",\n       \"likes\": \"0\",\n       \"dislikes\": \"0\",\n       \"rating\": null,\n       \"verified\": true,\n       \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n       \"author\": {\n         \"username\": \"user1\",\n         \"profileUri\": null,\n         \"lastSeen\": \"2021-02-22T11:57:10.468Z\"\n       },\n       \"reaction\": [{\n         \"likes\": 3,\n         \"authenticated_user\": \"like\",\n         \"reaction.id\": \"\",\n         \"dislikes\": 1\n       }],\n    \"tags\": [{ \"id\": \"JCjap-qAAu0\",  \"name\": \"Test On\", \"slug\": \"test-one\",  \"type\": \"tag\" }]\n    }\n }",
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
            "description": "<p>Array of chapter tags Ids in JSON format</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"chapter\": {\n   \"id\": \"chapter4\",\n   \"lessonId\": \"lesson2\",\n   \"name\": \"A Chapter4\",\n   \"slug\": \"a-chapter4\",\n   \"description\": \"An H5P Chapter.\",\n   \"status\": \"published\",\n   \"creatorId\": \"user1\",\n   \"createdAt\": \"2017-12-20T16:17:10.000Z\",\n   \"updatedAt\": \"2017-12-20T16:17:10.000Z\",\n   \"contentType\": \"h5p\",\n   \"contentUri\": \"\",\n   \"imageUrl\": null,\n   \"contentId\": \"3532080528\",\n   \"reviewQuestions\":[\"audioVideoQuality\", \"soundQuality\", \"videoQuality\", \"creativity\"],\n   \"approved\": false,\n    \"tags\": [{ \"id\": \"JCjap-qAAu0\",  \"name\": \"Test On\", \"slug\": \"test-one\",  \"type\": \"tag\" }]\n }",
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
            "description": "<p>Array of chapter tags Ids in JSON format</p>"
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
            "type": "Object",
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
    "type": "delete",
    "url": "/api/v1/courses/:id",
    "title": "Delete a course",
    "name": "DELETE_a_course_by_Id",
    "group": "Courses",
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
            "description": "<p>Id of the course to delete</p>"
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
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/courses/:id",
    "title": "GET course by Id",
    "name": "Get_a_course_by_Id",
    "group": "Courses",
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
            "description": "<p>tag id</p>"
          }
        ],
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "defaultValue": "tags,creator,playlist",
            "description": "<p>relations (separated with a comma) to include in response  (e.g. enrollment)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "enrolledUserId",
            "description": "<p>filter enrollments for this userId. The include query param must request <code>enrollment</code> e.g. /?include=enrollment&amp;enrolledUserId=user1</p>"
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
            "field": "course",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[totalEnrolled]",
            "description": "<p>total users enrolled to the course</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "defaultValue": "null",
            "description": "<p>Tags tied to the course. Refer to the tag object properties</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[playlist]",
            "defaultValue": "null",
            "description": "<p>Chapters in the course playlist + rank.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"course\":{\n         \"id\": \"JBp56KQAA7c\",\n         \"name\": \"A sample course\",\n         \"slug\": \"a-sample-course\",\n         \"description\": \"This is a demo description d\",\n         \"status\": \"publish\",\n         \"creatorId\": \"user1\",\n         \"metadata\": null,\n         \"createdAt\": \"2021-06-22T07:14:21.079Z\",\n         \"updatedAt\": \"2021-06-22T07:55:24.615Z\",\n         \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n         \"totalEnrolled\": \"0\",\n         \"type\": \"course\"\n         \"tags\":[{\"id\": \"JBpWJMOAAnE\", \"name\": \"Internet Basics\", \"slug\": \"internet-basics\".....}],\n         \"playlist\":[{\"id\": \"JBpWJJeAAbg\", \"status\": \"published\",\"name\": \"dolorem eaque sint\",…]\n         }\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/courses",
    "title": "GET all courses",
    "name": "Get_all_courses",
    "group": "Courses",
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
            "optional": true,
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
            "field": "id",
            "description": "<p>specified course id to filter with</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>specified course name to filter with</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "slug",
            "description": "<p>filter with user friendly course url pathname</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>filter with course status i.e. published or draft</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>filter tags by course author Id</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "defaultValue": "tags,creator",
            "description": "<p>relations to include in response separated with a comma (e.g. enrollment)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "enrolledUserId",
            "description": "<p>filter enrollments by this userId. The include query param must request <code>enrollment</code> e.g. /?include=enrollment&amp;enrolledUserId=user1</p>"
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
            "field": "courses",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[totalEnrolled]",
            "description": "<p>total users enrolled to the course</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "defaultValue": "null",
            "description": "<p>Tags tied to the course. Refer to the tag object for properties</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"courses\":[{\n         \"id\": \"JBp56KQAA7c\",\n         \"name\": \"A sample course\",\n         \"slug\": \"a-sample-course\",\n         \"description\": \"This is a demo description d\",\n         \"status\": \"publish\",\n         \"creatorId\": \"user1\",\n         \"metadata\": null,\n         \"createdAt\": \"2021-06-22T07:14:21.079Z\",\n         \"updatedAt\": \"2021-06-22T07:55:24.615Z\",\n         \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n         \"totalEnrolled\": \"0\",\n         \"type\": \"course\"\n         \"tags\":[{\"id\": \"JBpWJMOAAnE\", \"name\": \"Internet Basics\", \"slug\": \"internet-basics\".....}]\n         }]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/courses/popular",
    "title": "GET popular courses",
    "name": "Get_popular_courses",
    "group": "Courses",
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
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>maximum populars courses to return</p>"
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
            "field": "courses",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[totalEnrolled]",
            "description": "<p>total users enrolled to the course</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "defaultValue": "null",
            "description": "<p>Tags tied to the course. Refer to the tag object properties</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"courses\":[{\n         \"id\": \"JBp56KQAA7c\",\n         \"name\": \"A sample course\",\n         \"slug\": \"a-sample-course\",\n         \"description\": \"This is a demo description d\",\n         \"status\": \"publish\",\n         \"creatorId\": \"user1\",\n         \"metadata\": null,\n         \"createdAt\": \"2021-06-22T07:14:21.079Z\",\n         \"updatedAt\": \"2021-06-22T07:55:24.615Z\",\n         \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n         \"totalEnrolled\": \"0\",\n         \"type\": \"course\"\n         \"tags\":[{\"id\": \"JBpWJMOAAnE\", \"name\": \"Internet Basics\", \"slug\": \"internet-basics\".....}],\n         }]\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses/popular"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/courses/:id",
    "title": "PUT a course",
    "name": "PUT_a_course_by_Id",
    "group": "Courses",
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
            "description": "<p>Id of the course to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "courses",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "description": "<p>Array/object with course tags Ids</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "course[playlist]",
            "description": "<p>Array/object with course chapter Ids</p>"
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
            "field": "course",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "defaultValue": "null",
            "description": "<p>Tags tied to the course. Refer to the tag object for properties</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[playlist]",
            "defaultValue": "null",
            "description": "<p>Chapters in the course playlist and their rank on the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n       \"course\":{\n          \"id\": \"JBrs6hiAA7s\",\n          \"name\": \"Test course\",\n          \"slug\": \"test-course\",\n          \"description\": \"This is a sample description\",\n          \"status\": \"draft\",\n          \"creatorId\": \"user1\",\n          \"metadata\": null,\n          \"createdAt\": \"2021-06-22T11:25:35.109Z\",\n          \"updatedAt\": \"2021-06-22T11:25:35.109Z\",\n          \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n          \"type\": \"course\"\n          \"tags\":[{\"id\": \"JBpWJMOAAnE\", \"name\": \"Internet Basics\", \"slug\": \"internet-basics\",…],\n          \"playlist\":[{\"id\": \"JBpWJJeAAbg\", \"status\": \"published\",\"name\": \"dolorem eaque sint\",…],\n        }\n     }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Sample Request Body:",
        "content": "{\n  \"course\":{\n    \"name\": \"Test course\",\n    \"description\": \"This is a sample description\",\n    \"status\": \"draft\",\n    \"tags\":[{  \"id\": \"JBpWJMOAAnE\"},{  \"id\":\"JBpWJMOAAnI\" }],\n    \"playlist\":[{\"id\":\"JBpWJJeAAbg\",\"rank\":\"02\"}, {\"id\":\"JBpWJJgAAbo\",\"rank\":\"01\"}]\n }",
        "type": "json"
      }
    ],
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/courses",
    "title": "POST a course",
    "name": "Post_a_course",
    "group": "Courses",
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
            "field": "courses",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "description": "<p>Array/object with course tags Ids</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "course[playlist]",
            "description": "<p>Array/object with course chapter Ids + respective rank</p>"
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
            "field": "course",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[tags]",
            "defaultValue": "null",
            "description": "<p>Tags tied to the course. Refer to the tag object for properties</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course[playlist]",
            "defaultValue": "null",
            "description": "<p>Chapters in the course playlist and their rank on the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n       \"course\":{\n          \"id\": \"JBrs6hiAA7s\",\n          \"name\": \"Test course\",\n          \"slug\": \"test-course\",\n          \"description\": \"This is a sample description\",\n          \"status\": \"draft\",\n          \"creatorId\": \"user1\",\n          \"metadata\": null,\n          \"createdAt\": \"2021-06-22T11:25:35.109Z\",\n          \"updatedAt\": \"2021-06-22T11:25:35.109Z\",\n          \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n          \"type\": \"course\"\n          \"tags\":[{\"id\": \"JBpWJMOAAnE\", \"name\": \"Internet Basics\", \"slug\": \"internet-basics\",…],\n          \"playlist\":[{\"id\": \"JBpWJJeAAbg\", \"status\": \"published\",\"name\": \"dolorem eaque sint\",…],\n        }\n     }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Sample Request Body:",
        "content": "{\n  \"course\":{\n    \"name\": \"Test course\",\n    \"description\": \"This is a sample description\",\n    \"status\": \"draft\",\n    \"tags\":[{  \"id\": \"JBpWJMOAAnE\"},{  \"id\":\"JBpWJMOAAnI\" }],\n    \"playlist\":[{\"id\":\"JBpWJJeAAbg\",\"rank\":\"02\"}, {\"id\":\"JBpWJJgAAbo\",\"rank\":\"01\"}]\n }",
        "type": "json"
      }
    ],
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/courses/:id/thumbnail",
    "title": "POST a course thumbnail",
    "name": "Upload_a_course_thumbnail",
    "group": "Courses",
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
            "description": "<p>Id of the course to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>File image to update as course thumbnail</p>"
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
            "field": "course",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[id]",
            "description": "<p>the id of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[name]",
            "description": "<p>the name of the course</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[slug]",
            "description": "<p>user friendly course url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[description]",
            "description": "<p>A short course description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[status]",
            "description": "<p><strong>published</strong> or <strong> draft</strong></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[thumbnailUrl]",
            "description": "<p>course image url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[type]",
            "defaultValue": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[metadata]",
            "defaultValue": "null",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[createdAt]",
            "description": "<p>date course was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course[updatedAt]",
            "description": "<p>date course was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n       \"course\":{\n          \"id\": \"JBrs6hiAA7s\",\n          \"name\": \"Test course\",\n          \"slug\": \"test-course\",\n          \"description\": \"This is a sample description\",\n          \"status\": \"draft\",\n          \"creatorId\": \"user1\",\n          \"metadata\": null,\n          \"thumbnailUrl\": \"/uploads/images/courses/HaKKzfAN03D.jpg\",\n          \"createdAt\": \"2021-06-22T11:25:35.109Z\",\n          \"updatedAt\": \"2021-06-22T11:25:35.109Z\",\n          \"type\": \"course\"\n        }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/courses.js",
    "groupTitle": "Courses",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/courses/:id/thumbnail"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/course-enrollments/:id",
    "title": "Delete course enrollment",
    "name": "DELETE_course_enrollment_by_Id",
    "group": "Courses_Enrolled",
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
            "description": "<p>Course enrollment Id</p>"
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
    "filename": "server/routes/course-enrollments.js",
    "groupTitle": "Courses_Enrolled",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/course-enrollments/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/course-enrollments",
    "title": "POST course enrollment",
    "name": "POST_user_course_enrollment",
    "group": "Courses_Enrolled",
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
            "field": "courseEnrollment",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[courseId]",
            "description": "<p>Id of the course to enroll to</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "courseEnrollment[userId]",
            "defaultValue": "JWTToken.user.id",
            "description": "<p>Id of the user enrolling.</p>"
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
            "field": "courseEnrollment",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[id]",
            "description": "<p>the id of the course enrollment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[courseId]",
            "description": "<p>the id of the course user has enrolled to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[userId]",
            "description": "<p>the id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[createdAt]",
            "description": "<p>date course enrollment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[updatedAt]",
            "description": "<p>date course enrollment was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"courseEnrollment\":{\n         \"id\": \"JBp56KQAA7c\",\n         \"userId\": \"user1\",\n         \"courseId\": \"JB0yRrGAAd0\",\n         \"createdAt\": \"2021-06-23T14:16:56.796Z\",\n         \"updatedAt\": \"2021-06-23T14:16:56.796Z\"\n         }\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/course-enrollments.js",
    "groupTitle": "Courses_Enrolled",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/course-enrollments"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/course-enrollments",
    "title": "GET all course enrollments",
    "name": "Get_all_user_course_enrollments",
    "group": "Courses_Enrollment",
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
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>relationships to eager load (comma separated e.g. course,user)</p>"
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
            "field": "courseEnrollment",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[id]",
            "description": "<p>the id of the course enrollment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[courseId]",
            "description": "<p>the id of the course user has enrolled to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[userId]",
            "description": "<p>the id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[createdAt]",
            "description": "<p>date course enrollment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "courseEnrollment[updatedAt]",
            "description": "<p>date course enrollment was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"courseEnrollments\":[{\n         \"id\": \"JBp56KQAA7c\",\n         \"userId\": \"user1\",\n         \"courseId\": \"JB0yRrGAAd0\",\n         \"createdAt\": \"2021-06-23T14:16:56.796Z\",\n         \"updatedAt\": \"2021-06-23T14:16:56.796Z\"\n         }]\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/course-enrollments.js",
    "groupTitle": "Courses_Enrollment",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/course-enrollments"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/groups/:id",
    "title": "GET group by id",
    "name": "Get_group_by_id",
    "group": "Group",
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
            "description": "<p>group id</p>"
          }
        ]
      }
    },
    "filename": "server/routes/groups.js",
    "groupTitle": "Group",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/groups/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/groups",
    "title": "GET all user groups",
    "name": "Get_user_groups",
    "group": "Group",
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
    "filename": "server/routes/groups.js",
    "groupTitle": "Group",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/groups"
      }
    ]
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
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of model record</p>"
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
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "body",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "model",
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Query Params",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of referenced model record</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "eventType",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "recipientId",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>Id of the user who created the notification</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "read",
            "description": "<p>if user has read the notification</p>"
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
            "field": "notifications",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[id]",
            "description": "<p>notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[title]",
            "description": "<p>Title of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[body]",
            "description": "<p>Body of the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notifications[model]",
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notifications[itemId]",
            "description": "<p>Id of model record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[eventType]",
            "description": "<p>Type of event. Can be used to resolve related notification model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[recipientId]",
            "description": "<p>Id of the user being notified</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "notifications[read]",
            "description": "<p>if user has read the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notifications[metadata]",
            "description": "<p>Any metadata related to the notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"notifications\":[{\n            \"id\": \"I3ml3x-AAPE\",\n            \"title\": \"Your chapter has been approved\",\n            \"body\": \"Your recently published chapter has been approved!\",\n            \"itemId\": \"I3lchuEAA80\",\n            \"eventType\": \"chapter-approved\",\n            \"model\": \"chapter\",\n            \"recipientId\": \"user2\",\n            \"creatorId\": \"user1\",\n            \"read\": false,\n            \"metadata\":{\"sendEmail\": true},\n            \"createdAt\": \"2021-04-20T20:12:39.830Z\",\n            \"updatedAt\": \"2021-04-20T20:12:39.830Z\"\n           }]\n     }",
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
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of model record</p>"
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
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of model record</p>"
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
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of model record</p>"
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
            "description": "<p>Model name related to notification (refer <a target=\"_blank\" href=\"https://github.com/tunapanda/wikonnect/tree/master/frontend/app/models\"> here </a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "notification[itemId]",
            "description": "<p>Id of model record</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "reviewQuestions[default]",
            "description": "<p>if the category is always selected</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "reviewQuestions[priority]",
            "description": "<p>Order of priority when showing the category</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": true,
            "field": "reviewQuestions[options]",
            "description": "<p>Preset categories for review feedback</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"reviewQuestions\": [\n       {\n           \"category\": \"grammar\",\n           \"title\": \"Grammar & Spelling\",\n            \"default\":false,\n            \"priority\":2,\n       },\n       {\n           \"category\": \"soundQuality\",\n           \"title\": \"Sound quality\",\n           \"default\":true,\n           \"priority\":1,\n           \"options\":{\n               \"negative\":[\"Bad quality\"],\n               \"positive\":[\"Good quality\"]\n           }\n       }\n\n     ]\n }",
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
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "reaction",
            "description": "<p>Reaction type (like|dislike).</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "chapterId",
            "description": "<p>Chapter id.</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "userId",
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
    "type": "delete",
    "url": "/api/v1/surveys/:id",
    "title": "Delete a survey",
    "name": "DELETE_a_survey_by_Id",
    "group": "Surveys",
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
            "description": "<p>Id of the survey to delete</p>"
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
    "filename": "server/routes/surveys.js",
    "groupTitle": "Surveys",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/surveys/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/surveys/:id",
    "title": "GET survey by Id",
    "name": "Get_a_survey_by_Id",
    "group": "Surveys",
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
            "description": "<p>survey id</p>"
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
            "field": "survey",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[id]",
            "description": "<p>Survey id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyType]",
            "description": "<p>Kind of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[status]",
            "description": "<p>General survey status(published,draft,archive)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "survey[frequency]",
            "description": "<p>No. of times the trigger should happen</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[creatorId]",
            "description": "<p>Lookup for the user who created the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"survey\":{\n            \"id\": \"I_QFVJaAAno\",\n            \"surveyType\": \"mne\",\n            \"name\": \"Wikonnect usability\",\n            \"status\": \"archived\",\n            \"description\": \"Give us feedback on how difficult on getting started on Wikonnect platform\",\n            \"expiry\": \"2022-04-12T18:51:51.867Z\",\n            \"surveyEmbed\": \"<iframe src='https://docs.google.com/forms/d/xyz?embedded=xyz'>loading…</iframe>\",\n            \"frequency\": 8,\n            \"triggerId\": \"I_QFVJGAAnc\",\n            \"creatorId\": \"user3\",\n            \"createdAt\": \"2021-03-22T19:25:00.075Z\",\n            \"updatedAt\": \"2021-06-07T05:16:54.118Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/surveys.js",
    "groupTitle": "Surveys",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/surveys/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/surveys",
    "title": "GET all surveys",
    "name": "Get_all_surveys",
    "group": "Surveys",
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
            "type": "String",
            "optional": true,
            "field": "surveyType",
            "description": "<p>Query surveys by category</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter surveys by survey[name]</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Filter surveys by survey[status]</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "expired",
            "description": "<p>Filter survey by expiry status</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "triggerId",
            "description": "<p>Filter survey by survey[triggerId]</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>Filter survey by it's author</p>"
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
            "field": "surveys",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[id]",
            "description": "<p>Survey id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[surveyType]",
            "description": "<p>Kind of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[status]",
            "description": "<p>General survey status(published,draft,archive)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "surveys[frequency]",
            "description": "<p>No. of times the trigger should happen</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[creatorId]",
            "description": "<p>Lookup for the user who created the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surveys[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"surveys\":[{\n            \"id\": \"I_QFVJaAAno\",\n            \"surveyType\": \"mne\",\n            \"name\": \"Wikonnect usability\",\n            \"status\": \"archived\",\n            \"description\": \"Give us feedback on how difficult on getting started on Wikonnect platform\",\n            \"expiry\": \"2022-04-12T18:51:51.867Z\",\n            \"surveyEmbed\": \"<iframe src='https://docs.google.com/forms/d/xyz?embedded=xyz'>loading…</iframe>\",\n            \"frequency\": 8,\n            \"triggerId\": \"I_QFVJGAAnc\",\n            \"creatorId\": \"user3\",\n            \"createdAt\": \"2021-03-22T19:25:00.075Z\",\n            \"updatedAt\": \"2021-06-07T05:16:54.118Z\"\n           }]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/surveys.js",
    "groupTitle": "Surveys",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/surveys"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/survey/:id",
    "title": "PUT a survey",
    "name": "PUT_a_survey_by_Id",
    "group": "Surveys",
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
            "description": "<p>survey Id to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "survey[surveyType]",
            "defaultValue": "mne",
            "description": "<p>Kind of the survey.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "survey[status]",
            "defaultValue": "published",
            "description": "<p>Survey status(published,draft,archive).</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "survey[frequency]",
            "defaultValue": "1",
            "description": "<p>No. of times the trigger should happen.</p>"
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
            "field": "survey",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[id]",
            "description": "<p>Survey id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyType]",
            "description": "<p>Kind of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[status]",
            "description": "<p>General survey status(published,draft,archive)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "survey[frequency]",
            "description": "<p>No. of times the trigger should happen</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[creatorId]",
            "description": "<p>Lookup for the user who created the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"survey\":{\n            \"id\": \"I_QFVJaAAno\",\n            \"surveyType\": \"mne\",\n            \"name\": \"Wikonnect usability\",\n            \"status\": \"archived\",\n            \"description\": \"Give us feedback on how difficult on getting started on Wikonnect platform\",\n            \"expiry\": \"2022-04-12T18:51:51.867Z\",\n            \"surveyEmbed\": \"<iframe src='https://docs.google.com/forms/d/xyz?embedded=xyz'>loading…</iframe>\",\n            \"frequency\": 8,\n            \"triggerId\": \"I_QFVJGAAnc\",\n            \"creatorId\": \"user3\",\n            \"createdAt\": \"2021-03-22T19:25:00.075Z\",\n            \"updatedAt\": \"2021-06-07T05:16:54.118Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/surveys.js",
    "groupTitle": "Surveys",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/survey/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/surveys",
    "title": "POST a survey",
    "name": "Post_a_survey",
    "group": "Surveys",
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
            "type": "String",
            "optional": true,
            "field": "surveyType[surveyType]",
            "defaultValue": "mne",
            "description": "<p>Kind of the survey.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "survey[status]",
            "defaultValue": "published",
            "description": "<p>Survey status(published,draft,archive).</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "survey[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": true,
            "field": "survey[frequency]",
            "defaultValue": "1",
            "description": "<p>No. of times the trigger should happen.</p>"
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
            "field": "survey",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[id]",
            "description": "<p>Survey id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyType]",
            "description": "<p>Kind of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[name]",
            "description": "<p>Name/title of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[description]",
            "description": "<p>Short survey description/purpose</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[status]",
            "description": "<p>General survey status(published,draft,archive)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[expiry]",
            "description": "<p>When the survey will expire</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[surveyEmbed]",
            "description": "<p>An embed of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[triggerId]",
            "description": "<p>Lookup for the action that should trigger issuing of the survey</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "survey[frequency]",
            "description": "<p>No. of times the trigger should happen</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[creatorId]",
            "description": "<p>Lookup for the user who created the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[createdAt]",
            "description": "<p>date created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "survey[updatedAt]",
            "description": "<p>date updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"survey\":{\n            \"id\": \"I_QFVJaAAno\",\n            \"surveyType\": \"mne\",\n            \"name\": \"Wikonnect usability\",\n            \"status\": \"archived\",\n            \"description\": \"Give us feedback on how difficult on getting started on Wikonnect platform\",\n            \"expiry\": \"2022-04-12T18:51:51.867Z\",\n            \"surveyEmbed\": \"<iframe src='https://docs.google.com/forms/d/xyz?embedded=xyz'>loading…</iframe>\",\n            \"frequency\": 8,\n            \"triggerId\": \"I_QFVJGAAnc\",\n            \"creatorId\": \"user3\",\n            \"createdAt\": \"2021-03-22T19:25:00.075Z\",\n            \"updatedAt\": \"2021-06-07T05:16:54.118Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/surveys.js",
    "groupTitle": "Surveys",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/surveys"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/tags/:id",
    "title": "Delete a tag",
    "name": "DELETE_a_tag_by_Id",
    "group": "Tags",
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
            "description": "<p>Id of the tag to delete</p>"
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
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/tags/:id",
    "title": "GET tag by Id",
    "name": "Get_a_tag_by_Id",
    "group": "Tags",
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
            "description": "<p>tag id</p>"
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
            "field": "tag",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[slug]",
            "description": "<p>user friendly tag url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tag[canDelete]",
            "description": "<p>If any user has permissions to delete the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[createdAt]",
            "description": "<p>date tag was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[updatedAt]",
            "description": "<p>date tag was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tag\":{\n           \"id\": \"JBaHWpeAAGQ\",\n           \"name\": \"Internet Basics\",\n           \"slug\": \"internet-basics\",\n           \"creatorId\": \"user2\",\n           \"canDelete\": false,\n           \"createdAt\": \"2020-08-29T10:29:31.047Z\",\n           \"updatedAt\": \"2021-06-19T20:49:06.797Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/tags",
    "title": "GET all tags",
    "name": "Get_all_tags",
    "group": "Tags",
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
            "optional": true,
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
            "field": "id",
            "description": "<p>specified tag id to filter with</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>specified tag name to filter with</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "slug",
            "description": "<p>filter with user friendly tag url pathname</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "canDelete",
            "description": "<p>filter with tags that can/not be deleted</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "creatorId",
            "description": "<p>filter tags by tag author Id</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "includeAggregates",
            "defaultValue": "false",
            "description": "<p>if to add courses, chapters, &amp; followers counts on response</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "chapterTagsOnly",
            "defaultValue": "false",
            "description": "<p>Only include tags tied to a chapter</p>"
          },
          {
            "group": "Query Params",
            "type": "Boolean",
            "optional": true,
            "field": "courseTagsOnly",
            "defaultValue": "false",
            "description": "<p>Only include tags tied to a course</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>Relations to include seperated with comma (tagsfollowers,)</p>"
          },
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "followerId",
            "description": "<p>Filter tag followers by this user id. The include query param must request <code>tagsfollowers</code> i.e. /?include=tagsfollowers&amp;followerId=user1 *</p>"
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
            "field": "tags",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[id]",
            "description": "<p>tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[slug]",
            "description": "<p>user friendly tag url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tag[canDelete]",
            "description": "<p>If any user has permissions to delete the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[createdAt]",
            "description": "<p>date tag was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[updatedAt]",
            "description": "<p>date tag was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[coursesCount]",
            "description": "<p>total courses tied to the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[chaptersCount]",
            "description": "<p>total chapters tied to the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[followersCount]",
            "description": "<p>total users following the tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tags\":[\n           {\n              \"id\": \"JBaHWpeAAGQ\",\n              \"name\": \"Internet Basics\",\n              \"slug\": \"internet-basics\",\n              \"creatorId\": \"user2\",\n              \"canDelete\": false,\n              \"createdAt\": \"2020-08-29T10:29:31.047Z\",\n              \"updatedAt\": \"2021-06-19T20:49:06.797Z\",\n              \"coursesCount\": \"4\",\n              \"chaptersCount\": \"1\",\n              \"followersCount\": \"2\"\n           }]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/tags/popular",
    "title": "GET popular tags",
    "name": "Get_popular_tags",
    "group": "Tags",
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
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>maximum populars tags to return</p>"
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
            "field": "tags",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[slug]",
            "description": "<p>user friendly tag url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tag[canDelete]",
            "description": "<p>If any user has permissions to delete the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[createdAt]",
            "description": "<p>date tag was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[updatedAt]",
            "description": "<p>date tag was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[coursesCount]",
            "description": "<p>total courses tied to the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[chaptersCount]",
            "description": "<p>total chapters tied to the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "tag[followersCount]",
            "description": "<p>total users following the tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tags\":[{\n           \"id\": \"JBaHWpeAAGQ\",\n           \"name\": \"Internet Basics\",\n           \"slug\": \"internet-basics\",\n           \"creatorId\": \"user2\",\n           \"canDelete\": false,\n           \"createdAt\": \"2020-08-29T10:29:31.047Z\",\n           \"updatedAt\": \"2021-06-19T20:49:06.797Z\",\n           \"coursesCount\": \"4\",\n           \"chaptersCount\": \"1\",\n           \"followersCount\": \"2\"\n           }]\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags/popular"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/tags",
    "title": "PUT a tag",
    "name": "PUT_a_tag_by_Id",
    "group": "Tags",
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
            "description": "<p>Id of the tag to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "tag",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
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
            "field": "tag",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[id]",
            "description": "<p>tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[slug]",
            "description": "<p>user friendly tag url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tag[canDelete]",
            "description": "<p>If any user has permissions to delete the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[createdAt]",
            "description": "<p>date tag was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[updatedAt]",
            "description": "<p>date tag was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tag\":{\n           \"id\": \"JBaHWpeAAGQ\",\n           \"name\": \"Internet Basics\",\n           \"slug\": \"internet-basics\",\n           \"creatorId\": \"user2\",\n           \"canDelete\": false,\n           \"createdAt\": \"2020-08-29T10:29:31.047Z\",\n           \"updatedAt\": \"2021-06-19T20:49:06.797Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/tags",
    "title": "POST a tag",
    "name": "Post_a_tag",
    "group": "Tags",
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
            "field": "tag",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
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
            "field": "tag",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[id]",
            "description": "<p>tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[name]",
            "description": "<p>the name of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[slug]",
            "description": "<p>user friendly tag url pathname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[creatorId]",
            "description": "<p>Id of the user who created the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tag[canDelete]",
            "description": "<p>If any user has permissions to delete the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[createdAt]",
            "description": "<p>date tag was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag[updatedAt]",
            "description": "<p>date tag was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tag\":{\n           \"id\": \"JBaHWpeAAGQ\",\n           \"name\": \"Internet Basics\",\n           \"slug\": \"internet-basics\",\n           \"creatorId\": \"user2\",\n           \"canDelete\": false,\n           \"createdAt\": \"2020-08-29T10:29:31.047Z\",\n           \"updatedAt\": \"2021-06-19T20:49:06.797Z\"\n           }\n     }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tags.js",
    "groupTitle": "Tags",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/tags-followers/:id",
    "title": "Delete tag following",
    "name": "DELETE_user_tag_following",
    "group": "Tags_Followers",
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
            "description": "<p>Tag following Id</p>"
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
    "filename": "server/routes/tag-followers.js",
    "groupTitle": "Tags_Followers",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags-followers/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/tags-followers",
    "title": "POST a tag user follows",
    "name": "POST_a_tag_user_follows",
    "group": "Tags_Followers",
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
            "field": "tagFollower",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "tagFollower[tagId]",
            "description": "<p>Id of the tag user wishes to follow</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "tagFollower[userId]",
            "defaultValue": "JWTToken.user.id",
            "description": "<p>Id of the user enrolling.</p>"
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
            "field": "tagFollower",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tagFollower[id]",
            "description": "<p>the id of the tag following enrollment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tagFollower[tagId]",
            "description": "<p>the id of the tag user is following</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tagFollower[userId]",
            "description": "<p>the id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tagFollower[createdAt]",
            "description": "<p>date tag following was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tagFollower[updatedAt]",
            "description": "<p>date tag following was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"tagFollower\":{\n         \"id\": \"JBp56KQAA7c\",\n         \"userId\": \"user1\",\n         \"tagId\": \"JB0yRrGAAd0\",\n         \"createdAt\": \"2021-06-23T14:16:56.796Z\",\n         \"updatedAt\": \"2021-06-23T14:16:56.796Z\"\n         }\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/tag-followers.js",
    "groupTitle": "Tags_Followers",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/tags-followers"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/triggers/:id",
    "title": "Delete a trigger.",
    "name": "DELETE_a_trigger",
    "description": "<p>DELETE a trigger using id</p>",
    "group": "Trigger",
    "permission": [
      {
        "name": "[admin, superadmin]"
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
            "description": "<p>trigger id</p>"
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
    "filename": "server/routes/triggers.js",
    "groupTitle": "Trigger",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/triggers/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/triggers/:id",
    "title": "GET a trigger details.",
    "name": "GET_a_trigger_details",
    "group": "Trigger",
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
            "description": "<p>Id of the trigger to update</p>"
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
            "field": "trigger",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
          }
        ]
      }
    },
    "filename": "server/routes/triggers.js",
    "groupTitle": "Trigger",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/triggers/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/triggers",
    "title": "GET all trigger details.",
    "name": "GET_all_trigger_details",
    "group": "Trigger",
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
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "trigger",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
          }
        ]
      }
    },
    "filename": "server/routes/triggers.js",
    "groupTitle": "Trigger",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/triggers"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/triggers/",
    "title": "POST a new trigger.",
    "name": "POST_a_trigger_details",
    "group": "Trigger",
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
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
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
            "field": "trigger",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
          }
        ]
      }
    },
    "filename": "server/routes/triggers.js",
    "groupTitle": "Trigger",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/triggers/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/triggers/:id",
    "title": "PUT a trigger details.",
    "name": "PUT_a_trigger_details",
    "group": "Trigger",
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
            "description": "<p>Id of the trigger to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
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
            "field": "trigger",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[id]",
            "description": "<p>trigger id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[name]",
            "description": "<p>name given to trigger</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trigger[description]",
            "description": "<p>trigger explanation</p>"
          }
        ]
      }
    },
    "filename": "server/routes/triggers.js",
    "groupTitle": "Trigger",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/triggers/:id"
      }
    ]
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
            "description": "<p>user id</p>"
          }
        ],
        "PUT Params": [
          {
            "group": "PUT Params",
            "type": "string",
            "optional": false,
            "field": "userRole[groupId]",
            "description": "<p>New group id to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"user_role\": [{\n       \"userId\": \"user1\",\n       \"groupId\": \"groupBasic\",\n       \"createdAt\": \"2019-12-20T16:17:10.000Z\",\n       \"updatedAt\": \"2021-04-26T20:11:24.764Z\"\n   }]\n }",
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
    "type": "post",
    "url": "/api/v1/User-followees",
    "title": "POST user account following",
    "name": "POST_a_user_account_following",
    "group": "User_Followees",
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
            "field": "UserFollowee",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "UserFollowees[followeeId]",
            "description": "<p>the id account user is following</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "UserFollowees[userId]",
            "defaultValue": "JWTToken.user.id",
            "description": "<p>Id of the user followee.</p>"
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
            "field": "UserFollowee",
            "description": "<p>Top level object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserFollowee[id]",
            "description": "<p>the id of the following</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserFollowee[followeeId]",
            "description": "<p>the id account user is following</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserFollowee[userId]",
            "description": "<p>the id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserFollowee[createdAt]",
            "description": "<p>date account following was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserFollowee[updatedAt]",
            "description": "<p>date account following was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n     {\n        \"UserFollowee\":{\n         \"id\": \"JBp56KQAA7c\",\n         \"userId\": \"user1\",\n         \"followeeId\": \"JB0yRrGAAd0\",\n         \"createdAt\": \"2021-06-23T14:16:56.796Z\",\n         \"updatedAt\": \"2021-06-23T14:16:56.796Z\"\n         }\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/user-followees.js",
    "groupTitle": "User_Followees",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/User-followees"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/user-followees/:id",
    "title": "Unfollow account",
    "name": "Unfollow_user_account",
    "group": "User_Followees",
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
            "description": "<p>Account following Id</p>"
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
    "filename": "server/routes/user-followees.js",
    "groupTitle": "User_Followees",
    "sampleRequest": [
      {
        "url": "https://app.wikonnect.org/api/v1/user-followees/:id"
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
