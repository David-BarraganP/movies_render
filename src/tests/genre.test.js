const request = require("supertest")
const app = require("../app")



let genreId

const BASE_URL = '/genres'

const genre = {
    name: "Accion"
}



test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)

      .post(BASE_URL)
      .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  })

  test("Get -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)

      .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })

  test("Get -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)

      .get(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  })

  test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)

      .put(`${BASE_URL}/${genreId}`)
      .send({name: "Comedia"})


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Comedia")
  })
  

  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${genreId}`)
    

    expect(res.statusCode).toBe(204)
   
  })






 