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
          "id":"",
          "name":"Brad Pitt",
          "flims": [
            {
              "title":"",
              "url":""
            }
          ]
        },
        {
          "id":"",
          "name":"Scarlett Johansson",
          "flims": [
            {
              "title":"",
              "url":""
            }
          ]
          
        }
      ],
      "director":[
        {
          "name":"Quintin Tarentino"
        }
      ]
    },
    "movie":[
      {
        
        "title":"Godzilla",
        "description":"This is the description for godzilla",
        "filmography":
          {
            "cast":{
              "name":"Jim Carry",
              "screenname":"Godzilla"
            },
            "crew":{
              "name":"Stephen Speilberg",
              "films": ""
            }
          }
      },
      {
        "title":"Fast and the Furious",
        "description":"This is the description for godzilla",
        "filmography":
          {
            "cast":{
              "name":"Jim Carry",
              "screenname":"Godzilla"
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