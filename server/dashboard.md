Create a user in the system

[/api/v1/users](https://app.wikonnect.org/api/v1/users)
```json
{
  "username": "string",
  "password": "string",
}
```

Use the login credentials for the created user to get a token response for use in subsequent queries

[/api/v1/auth/](https://app.wikonnect.org/api/v1/auth/)

`POST` user credentials in the body to get a token response
```json
{
    "token": "json_web_token"
}
```


Get total learners(`total`) and learner who have completed 2 chapters(`quarterly`)

[/api/v1/dashboard/learners](https://app.wikonnect.org/api/v1/dashboard/learners/)
```json
{
  "total": "4752",
  "quarterly": [
    {
      "count": "7",
      "quarter": "2017.Q4"
    },
    {
      "count": "98",
      "quarter": "2020.Q3"
    },
    {
      "count": "68",
      "quarter": "2020.Q4"
    }
  ]
}
```

Get chapters completed by 2 or more learners

[/api/v1/dashboard/completed/](https://app.wikonnect.org/api/v1/dashboard/completed/)

```json
{
  "total": "339",
  "completed": [
    {
      "quarter": "2020.Q2",
      "count": "1"
    },
    {
      "quarter": "2020.Q4",
      "count": "6"
    },
    {
      "quarter": "2020.Q3",
      "count": "266"
    },
    {
      "quarter": "2017.Q4",
      "count": "66"
    }
  ]
}
```


Total number of content creators(`total`) and content creators with 10 or more chapters created (`with_10_chapters`) [/api/v1/dashboard/creators/](https://app.wikonnect.org/api/v1/dashboard/creators/)
```json
{
  "total": 30,
  "with_10_chapters": 45,
  "created_by_users": 5
}
```