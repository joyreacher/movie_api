
# Movie API

Simple API that returns information about movies using Express.


## API Reference

#### Get all movies

```http
  GET /movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `NA` | Returns all movies |

#### Get movie

```http
  GET /moves/:movieid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movieid`      | `number` | Id corresponding to a movie resource  |

#### Get All directors

```http
  GET /directors
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `NA` | Return all directors |


#### Post favorite movie

```http
  POST /users/:id/movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `number` | Post a new movie resource |


#### Remove a movie resource

```http
  DELETE /movies/:movieid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:moviid`      | `number` | Remove a movie resource using its corresponding resource ID |


#### Get genre details

```http
  GET /movies/genre/:genre
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:genre`      | `string` | Return movies based on genre (Action, Thriller, Comedy, Sci-Fi) |



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

  
