const request = require("supertest")
const app = require("../app")


let actorId

const BASE_URL = '/actors'

const actor = {
    firstName: "David",
    lastName: "Barragan",
    nationality: "Colombia",
    image: "Lorem30",
    birthday: "1998"
}


test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.name = actor.name", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
  })


  test("Get -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
      .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })

  test("Get -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name = actor.name", async () => {
    const res = await request(app)

      .get(`${BASE_URL}/${actorId}`)
      
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
  })


  test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)

      .put(`${BASE_URL}/${actorId}`)
      .send({
        firstName: "Alejandro"
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Alejandro")
  })

  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${actorId}`)
    

    expect(res.statusCode).toBe(204)
   
  })