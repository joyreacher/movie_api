const db = {
  "users":
    {
      "myinfo":[
        {
          "id": "123",
          "name":"Jon",
          "username":"",
          "email":"jon@gmail.com",
          "password": "cookies",
          "entries": 0,
          "mymovies":[
            {
              "title":"Free Willy",
              "url":""
            },
            {
              "title":"Godzilla",
              "url":"url to the movie"
            },
            {
              "title":"Boss Baby",
              "url":"url to the movie"
            },
            {
              "title":"Gone With The Wind",
              "url": "/content/movie/:id to gone with the wind"
            }
          ]
        },
        {
          "id": "123",
          "name":"brian",
          "username":"bthoma",
          "email":"",
          "password": "cookies",
          "entries": 0,
          "mymovies":[
            
          ]
        }
      ],
    }
  ,
  "content":{
    "movies":[
      {
        "title":"Godzilla",
        "url":"url to the movie"
      },
      {
        "title":"Boss Baby",
        "url":"url to the movie"
      },
      {
        "title":"Gone With The Wind",
        "url": "/content/movie/:id to gone with the wind"
      }
    ],
    "genre":{
        "adventure":[
          {
            "title":"Godzilla",
            "url":"",
          },
          {
            "title":"King Kong",
            "url":"",
          }
          
        ],
        "action":[
          {
            "title":"The Fast & The Furious",
            "url":"",
          },
          {
            "title":"Training Day",
            "url":"",
          }
          
        ],
        "drama":[
          {
            "title":"Godzilla",
            "url":"",
          },
          {
            "title":"King Kong",
            "url":"",
          }
          
        ],
        "horror":[
          {
            "title":"Godzilla",
            "url":"",
          },
          {
            "title":"King Kong",
            "url":"",
          }
        ],
        "comedy":[
          {
            "title":"Godzilla",
            "url":"",
          },
          {
            "title":"King Kong",
            "url":"",
          }
          
        ],
        
      }
    ,
    "filmography":{
      "actor":[
        {
          "id":0,
          "name":"Brad Pitt",
          "flims": [
            {
              "title":"Fight Club",
              "url":"/content/movie/fight+club"
            }
          ]
        },
        {
          "id":1,
          "name":"Scarlett Johansson",
          "flims": [
            {
              "title":"Avengers",
              "url":"/content/movie/avengers"
            }
          ]
          
        }
      ],
      "director":[
        {
          "name":"Quintin Tarentino",
          "films": [
            {
              "title":"Pulp Fiction",
              "url":""
            }
          ]
        }
      ]
    },
    "movie":[
      {
        "title":"Godzilla",
        "description":"This is the description for godzilla",
        "genre":"action",
        "rating":'🍅 🍅 🍅 ',
        "filmography":{
            "cast":[
              {
                "name":"Matthew Broderick",
                "screenname":"Dr. Nino Totopoulos"
              },
              {
                "name":"Jeadn Reno",
                "screenname":"Philppe Roache"
              },
              {
                "name":"Maria Pitillo",
                "screenname":"Audrey Timmonds"
              }
            ],
            "director":[
              {
                "name":"Roland Emmerich",
                "films": ""
              }
            ]
          }
      },
      {
        "title":"Fast and the Furious",
        "description":"A Movie about cars.",
        "filmography":
          {
            "cast":{
              "name":"Vin Diesal",
              "screenname":"Dom"
            },
            "crew":{
              "name":"Stephen Speilberg",
              "films": ""
            }
          }
      },
      
    ]
  }
}
module.exports = db;