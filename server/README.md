# SWAG-NATION
## Table of Contents

* [The Learning Platform](#the-learning-platform)
* [Contributing](#contributing)
* [License](#license)
* [API Overview](#api-overview)

## The learning platform
## Contributing

[Please follow this steps to contribute](https://github.com/tunapanda/swag/blob/master/CONTRIBUTING.md)

### API Overview
#### AUTH Endpoint

prefix = `/api/v1`

| method | resource      | description                          |
|:-------|:--------------|:-------------------------------------|
|  POST  | `/auth`       | creates a user account               |
|  POST  | `/users`      | returns a token for a logged in user |
|  GET   | `/users`      | returns a list of all users)         |
|  GET   | `/users/:id`  | returns a single user                |
|  PUT   | `/users/:id`  | returns a single user after update   |

**Register body object**
```json
{
    "user":{
        "username":"type:string",
        "password":"type:string",
        "email":"type:string"
    }
}
```

**Login body object**

```json
{
    "user":{
        "username":"type:string",
        "password":"type:string"
    }
}
```

#### Learning Path Endpoint

| method | resource      | description                          |
|:-------|:--------------|:-------------------------------------|
|  POST  | `/paths`      | creates a user account               |
|  GET   | `/paths`      | returns a list of all users)         |
|  GET   | `/paths/:id`  | returns a single user                |
|  PUT   | `/paths/:id`  | returns a single user after update   |
| DELETE | `/paths/:id`  | returns a single user after update   |

#### SEARCH Endpoint

    GET /api/v1/search?q=your-query

__Sample JSON__

```json
{
    "paths":{
        "id": "learning_path1",
        "name": "A Learning Path",
        "slug": "a-learning-path",
        "description": "For the organisation of courses.",
        "status": "published",
        "creatorId": "user1",
        "metadata": null,
        "createdAt": "2017-12-20T16:17:10.000Z",
        "updatedAt": "2017-12-20T16:17:10.000Z",
        
    }
}
```
