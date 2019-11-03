
## Table of Contents

* [The Learning Platform](#the-learning-platform)
* [Contributing](#contributing)
* [License](#license)
* [API Overview](#api-overview)

### The learning platform
### Contributing

[Please follow this teps to contribute](https://github.com/tunapanda/swag/blob/master/CONTRIBUTING.md)


### API Overview
#### AUTH Endpoints

**Register User Endpoint**

    POST /api/v1/auth/resister

**Requred Parameters**

    user:
        email - type:string
        username - type:string
        password - type:string

**Login User Endpoint**

    POST /api/v1/users/

**Requred Parameters**

    user:
        username - type:string
        password - type:string


#### LEARNING PATH Endpoints
**GET ALL Learning Paths**

    GET /api/v1/paths/

**GET SINGLE Learning Paths**
    
    GET /api/v1/paths/{id}

**PUT[update] SINGLE Learning Paths**

    GET /api/v1/paths/{id}

**DELETE Learning Paths**

    GET /api/v1/paths/{id}


__Sample JSON__

```json
{
    "id": "learning_path1",
    "name": "A Learning Path",
    "slug": "a-learning-path",
    "description": "For the organisation of courses.",
    "status": "published",
    "creatorId": "user1",
    "metadata": null,
    "createdAt": "2017-12-20T16:17:10.000Z",
    "updatedAt": "2017-12-20T16:17:10.000Z"
}
```