
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

    POST /api/v1/auth/login

**Requred Parameters**

    user:
        username - type:string
        password - type:string

This returns a signed `token` reponse object used to access protected routes
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6Im9rZW13YUB0dW5hcGFuZGEub3JnIiwidXNlcm5hbWUiOiJva2Vtd2EiLCJsYXN0U2VlbiI6bnVsbCwibGFzdElwIjpudWxsLCJjcmVhdGVkQXQiOm51bGwsInVwZGF0ZWRBdCI6bnVsbH0sImV4cCI6MTU3MTk1MTQ0MCwiaWF0IjoxNTcxOTU1MDQwfQ.Ew-WKBZGnbDcfUSAyamp3DsUbjcIm48_4PqYHKsiseM"
}
```
