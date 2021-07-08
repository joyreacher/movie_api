const db = {
  users:
    {
      myinfo: [
        {
          id: '123',
          name: 'Jon',
          username: '',
          email: 'jon@gmail.com',
          password: 'cookies',
          entries: 0,
          mymovies: [
            {
              title: 'Free Willy',
              url: ''
            },
            {
              title: 'Godzilla',
              url: 'url to the movie'
            },
            {
              title: 'Boss Baby',
              url: 'url to the movie'
            },
            {
              title: 'Gone With The Wind',
              url: '/content/movie/:id to gone with the wind'
            }
          ]
        },
        {
          id: '123',
          name: 'brian',
          username: 'bthoma',
          email: '',
          password: 'cookies',
          entries: 0,
          mymovies: [

          ]
        }
      ]
    },
  content: {
    movies: [
      {
        title: 'The Fast and the Furious',
        url: 'localhost:3000/content/movie/details/0'
      },
      {
        title: 'Godzilla',
        url: 'localhost:3000/content/movie/details/1'
      },
      {
        title: 'Cruella',
        url: 'localhost:3000/content/movie/details/2'
      },
      {
        title: 'Cruella',
        url: 'localhost:3000/content/movie/details/3'
      },
      {
        title: 'The Croods: A New Age',
        url: 'localhost:3000/content/movie/details/4'
      },
      {
        title: 'Sonic the Hedgehog',
        url: 'localhost:3000/content/movie/details/5'
      },
      {
        title: 'Rampage',
        url: 'localhost:3000/content/movie/details/6'
      },
      {
        title: 'The Unholy',
        url: 'localhost:3000/content/movie/details/7'
      },
      {
        title: 'Star Trek',
        url: 'localhost:3000/content/movie/details/8'
      },
      {
        title: 'Godzilla Vs. Kong',
        url: 'localhost:3000/content/movie/details/9'
      },
      {
        title: 'Wrath of Man',
        url: 'localhost:3000/content/movie/details/10'
      }
    ],
    genre: {
      'sci-fi': [
        {
          title: 'Godzilla',
          url: ''
        }
      ],
      action: [
        {
          title: 'The Fast & The Furious',
          url: ''
        }
      ],
      drama: [
        {
          title: 'Gone With The Wind',
          url: ''
        }
      ],
      horror: [
        {
          title: 'The Unholy',
          url: 'localhost:3000/content/movie/details/:id'
        }
      ],
      comedy: [
        {
          title: 'The Croods: A New Age',
          url: ''
        }
      ]
    },
    filmography: {
      actor: [
        {
          id: 0,
          name: 'Brad Pitt',
          flims: [
            {
              title: 'Fight Club',
              url: '/content/movie/fight+club'
            }
          ]
        },
        {
          id: 1,
          name: 'Scarlett Johansson',
          flims: [
            {
              title: 'Avengers',
              url: '/content/movie/avengers'
            }
          ]

        }
      ],
      director: [
        {
          name: 'Quintin Tarentino',
          films: [
            {
              title: 'Pulp Fiction',
              url: ''
            }
          ]
        }
      ]
    },
    movie: [
      {
        title: 'The Fast and the Furious',
        description: "On the turbo-charged streets of Los Angeles, every night is a championship race. With intense full-throttle action, awesome high-speed stunts, this fast and furious assault puts you in the driver's seat and dares you to exceed all limits.",
        genre: 'action',
        rating: '🍅 🍅 🍅 🍅 ',
        filmography: {
          cast: [
            {
              name: 'Vin diesel',
              screenname: 'Dominic Toretto'
            },
            {
              name: 'Paul Walker',
              screenname: "Brian O'conner"
            },
            {
              name: 'Michelle Rodriguez',
              screenname: 'Letty'
            }
          ],
          director: [
            {
              name: 'Rob Cohen',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Godzilla',
        description: "During a nuclear test, the French government inadvertently mutates a lizard nest; years later, a giant lizard makes its way to New York City. Dr. Niko Tatopoulos, an expert on the effects of radiation on animals, is sent by the U.S. government to study the beast. When the creature, dubbed 'Godzilla' by news outlets, emerges, a massive battle with the military begins. To make matters worse, Niko discovers that Godzilla has laid a nest of 200 eggs, which are ready to hatch.",
        genre: 'sci-fi',
        rating: '🍅 🍅 🍅 ',
        filmography: {
          cast: [
            {
              name: 'Matthew Broderick',
              screenname: 'Dr. Nino Totopoulos'
            },
            {
              name: 'Jeadn Reno',
              screenname: 'Philppe Roache'
            },
            {
              name: 'Maria Pitillo',
              screenname: 'Audrey Timmonds'
            }
          ],
          director: [
            {
              name: 'Roland Emmerich',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Cruella',
        description: "Disney's CRUELLA follows the early days of one of cinema's most notorious - and notoriously fashionable - villains. During the 1970s London punk rock revolution, a young grifter (Emma Stone), transforms herself into the raucous, revenge-bent Cruella de Vil. Warning: Some flashing-lights scenes in this film may affect photosensitive viewers.",
        genre: 'comedy',
        rating: '🍅 🍅 🍅  ',
        filmography: {
          cast: [
            {
              name: 'Emma Stone',
              screenname: 'Estella'
            },
            {
              name: 'Emma Thompson',
              screenname: 'The Baroness'
            },
            {
              name: 'Joel Fry',
              screenname: 'Jasper'
            }
          ],
          director: [
            {
              name: 'Craig Gillespie',
              films: ''
            }
          ]
        }
      },
      {
        title: 'The Croods: A New Age',
        description: 'In search of a new home, the Croods encounter the more sophisticated Betterman family. A new threat forces the two families to set aside their differences to avoid extinction.',
        genre: 'comedy',
        rating: '🍅 🍅 🍅 🍅 🍅  ',
        filmography: {
          cast: [
            {
              name: 'Nicolas Cage',
              screenname: 'Grug'
            },
            {
              name: 'Emma Stone',
              screenname: 'Eep'
            },
            {
              name: 'Ryan Reynolds',
              screenname: 'Guy'
            }
          ],
          director: [
            {
              name: 'Joel Crawford',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Sonic the Hedgehog',
        description: 'The world needed a hero, we got a hedgehog. Superpowered with speed, Sonic races to save the world and stop evil genius Dr. Robotnik from world domination. Jim Carrey, Ben Schwartz and James Marsden star in the adventure the whole family will enjoy.',
        genre: 'comedy',
        rating: '🍅 🍅 🍅 🍅   ',
        filmography: {
          cast: [
            {
              name: 'James Marsden',
              screenname: 'Tom'
            },
            {
              name: 'Jim Carrey',
              screenname: 'Dr.Robotnik'
            },
            {
              name: 'Ben Schwartz',
              screenname: 'Sonic'
            }
          ],
          director: [
            {
              name: 'Jeff Fowler',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Rampage',
        description: 'Buy any quality, get every quality: All qualities up to 4K UHD included with purchase. When a genetic experiment goes awry, it unleashes super creatures that rampage the city. Scientist Davis races to secure an antidote to try to save the ape that was once his friend.',
        genre: 'comedy',
        rating: '🍅 🍅 🍅    ',
        filmography: {
          cast: [
            {
              name: 'Dwayne Johnson',
              screenname: 'Davis Okaye'
            },
            {
              name: 'Naomie Harris',
              screenname: 'Dr.Kate Caldwell'
            },
            {
              name: 'Malin Akerman',
              screenname: 'Claire Wyden'
            }
          ],
          director: [
            {
              name: 'Brad Peyton',
              films: ''
            }
          ]
        }
      },
      {
        title: 'The Unholy',
        description: 'The Unholy follows a hearing-impaired girl who is visited by the Virgin Mary and can suddenly hear, speak, and heal the sick. As people flock to witness her miracles, horrific events unfold.',
        genre: 'horror',
        rating: '🍅 🍅',
        filmography: {
          cast: [
            {
              name: 'Jeffery Dean Morgan',
              screenname: 'Gerry Fenn'
            },
            {
              name: 'Cary Elwes',
              screenname: 'Bishop Gyles'
            },
            {
              name: 'Katie Aselton',
              screenname: 'Dr.Natalie Gates'
            }
          ],
          director: [
            {
              name: 'Evan Spiliotopoulos',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Star Trek',
        description: "The greatest adventure of all time begins with STAR TREK, the incredible story of a young crew's maiden voyage onboard the most advanced starship ever created: the U.S.S. Enterprise. On a journey filled with action, comedy, and cosmic peril, the new recruits must find a way to stop an evil being whose mission of vengeance threatens all of mankind. The fate of the galaxy rests in the hands of bitter rivals. One, James Kirk (Chris Pine), is a delinquent, thrill-seeking Iowa farm boy. The other, Spock (Zachary Quinto), was raised in a logic- based society that rejects all emotion. As fiery instinct clashes with calm reason, their unlikely but powerful partnership is the only thing capable of leading their crew through unimaginable danger, boldly going where no one has gone before.",
        genre: 'sci-fi',
        rating: '🍅 🍅 🍅 🍅',
        filmography: {
          cast: [
            {
              name: 'Chris Pine',
              screenname: 'James T. Kirk'
            },
            {
              name: 'Zachary Quinto',
              screenname: 'Spock'
            },
            {
              name: 'Leonard Nimoy',
              screenname: 'Spock Prime'
            }
          ],
          director: [
            {
              name: 'J.J. Abrams',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Godzilla Vs. Kong',
        description: 'Godzilla and Kong clash in a battle for the ages. As Monarch embarks on a mission into uncharted terrain, a human conspiracy threatens to wipe the creatures from the face of the earth.',
        genre: 'sci-fi',
        rating: '🍅 🍅 🍅 🍅',
        filmography: {
          cast: [
            {
              name: 'Alexander Skarsgård',
              screenname: 'Nathan Lind'
            },
            {
              name: 'Millie Bobby Brown',
              screenname: 'Madison Russell'
            },
            {
              name: 'Rebecca Hall',
              screenname: 'Ilene Andrews'
            }
          ],
          director: [
            {
              name: 'Adam Wingard',
              films: ''
            }
          ]
        }
      },
      {
        title: 'Wrath of Man',
        description: "A mysterious and wild-eyed new cash truck security guard (Jason Statham) surprises his coworkers during a heist in which he unexpectedly unleashes precision skills. The crew is left wondering who he is and where he came from. Soon, the marksman's ultimate motive becomes clear as he takes dramatic and irrevocable steps to settle a score.",
        genre: 'action',
        rating: '🍅 🍅 🍅 ',
        filmography: {
          cast: [
            {
              name: 'Jason Statham',
              screenname: 'H'
            },
            {
              name: 'Holt McCallany',
              screenname: 'Bullet'
            },
            {
              name: 'Jeffery Donovan',
              screenname: 'Jackson'
            }
          ],
          director: [
            {
              name: 'Guy Ritchie',
              films: ''
            }
          ]
        }
      }

    ]
  }
}
module.exports = db
