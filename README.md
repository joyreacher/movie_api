
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
  GET /moves/:title
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Corresponding title to a movie resource  |

#### Get A director

```http
  GET /directors/:name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Return a director resource by name |


#### Add a favorite movie to a user

```http
  POST /users/mymovies/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `NA` | Body transfers Username and Title values |


#### Remove a movie resource

```http
  DELETE /users/mymovies/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `NA` | Body transfers Username and Title values |


#### Get genre details

```http
  GET /genre/:genre
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

  
