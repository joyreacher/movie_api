
# Movie API

Simple API that returns information about movies using Express.


## API Reference

#### Get all movies

```http
  GET /content/movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `NA` | Returns all movies |

#### Get movie

```http
  GET /api/movies/${genre}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `genre`      | `string` | Avaliable values: scifi, action, comedy, drama  |

#### Get director

```http
  GET /api/movies/filmography/${title}/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Value can be 'director' or 'actor' |
| `name`      | `string` | Value is case/space sensitive |


#### Post favorite movie

```http
  POST /content/movies/mymovies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Value is case/space sensitive |


#### Remove favorite movie

```http
  DELETE /content/movies/mymovies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Value is case/space sensitive |


#### Get movie details

```http
  GET /content/movie/details
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | Value corredsponds to position in array |


#### Register user

```http
  POST /content/account/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Users 'name' value |
| `email`      | `string` | Users 'email' value |
| `password`      | `string` | Users 'password' value IN PLAIN TEXT|


#### Delete a user based on email

```http
  DELETE /content/account/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | Users 'email' value |


#### Update a users username

```http
  PUT /content/account/myinfo?${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Value is used to search array of users, to update 'username' |


## Tech Stack

**Server:** Node, Express, Body-parser, nodemon

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/joyreacher/movie_api.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the nodemon server

```bash
  npm run start
```

  
## Acknowledgements

 - [Node JS Static File Webserver](https://gist.github.com/ryanflorence/701407)
 - [Built In Node Modules](https://www.w3schools.com/nodejs/ref_modules.asp)
 - [nodemon](https://www.npmjs.com/package/nodemon)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

  
## Authors

- [@brianthomas](https://github.com/joyreacher)

  
