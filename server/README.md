
# Table of Contents

* [The Learning Platform](#the-learning-platform)
* [Contributing](#contributing)
* [License](#license)
* [API Overview](#api-overview)

## The learning platform

[learning platform description goes here]

## Contributing

[Please follow this teps to contribute](https://github.com/tunapanda/swag/blob/master/CONTRIBUTING.md)


## API Overview
### User APIs

#### POST `/users`

You can do a POST to `/api/v1/auth/resister` to create a new user.

The body must have:

* `username`: The username
* `hash`: The password

It returns the following:

```json
{
  "token": {jwt}
}
```

#### POST `/api/v1/auth/login`

You can do a POST to `/api/v1/auth/login` to log a user in.

The body must have:

* `username`: The username
* `hash`: The password

It returns the following:

```json
{
  "token": {jwt}
}
```
