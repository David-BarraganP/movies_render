require('../models')
const request = require("supertest")
const app = require("../app")
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

let movieId

const BASE_URL = '/movies'

const movie = {
    name: "Buscando a Nemo",
    image: "Lorem20",
    synopsis: "Buscando a su hijo perdido",
    releaseYear: "2010"  
}

test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.name = actor.name", async () => {
    const res = await request(app)

      .post(BASE_URL)
      .send(movie)

      movieId= res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  })

  test("Get -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
      .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })

  test("Get -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name = movie.name", async () => {
    const res = await request(app)

      .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  })

  test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined  and res.body.name = 'Dark'", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send({
            name: "Soy Leyenda"
        })


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Soy Leyenda")
})

test("Post  -> 'BASE_URL/:id/actors', should return status code 200, res.body to be defined", async () => {

    const actor = await Actor.create({
        firstName: "Daniela",
        lastName: "Barragan",
        nationality: "Colombia",
        image: "Lorem30",
        birthday: "1998"

    })


    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/actors`)
      .send([actor.id])
    

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(actor.id)
    

   
    await actor.destroy()
   
  })

  test("Post  -> 'BASE_URL/:id/directors', should return status code 200, res.body to be defined", async () => {

    const director = await Director.create({
        firstName: "Patricia",
        lastName: "Barragan",
        nationality: "Colombia",
        image: "Lorem20",
        birthday: "1990"

    })


    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/directors`)
      .send([director.id])
    

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(director.id)
    

   
    await director.destroy()
   
  })

  test("Post  -> 'BASE_URL/:id/genre', should return status code 200, res.body to be defined", async () => {

    const genre = await Genre.create({
        name: "Terror"
    })


    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])
    

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(genre.id)
    
    

   
    await genre.destroy()
   
  })

  



test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${movieId}`)
    
    expect(res.statusCode).toBe(204)
   
  })




