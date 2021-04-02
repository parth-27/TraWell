const app = require('../index');
const User = require ( '../models/user')
const request = require('supertest')


// it('Testing to see if Jest works', () => {
//   expect(1).toBe(1)
// })
// jest.useFakeTimers();
// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await request(app)
//       .post('/user/create')
//       .send({
//     name: "sam",
//         email: "sam@ed.info",
//         password: "12jhjhjhj",
//         phone_no: "1234567890",
//         address : "jfkjkg kjgkrjgkcd"
//       })
//     expect(res.statusCode).toEqual(200)
//     // expect(res.body).toHaveProperty('post')
//   })
// })

afterAll(done => {
  app.close();
  done();
});

test('Should signup for a new user', async()=> {
  await request(app).post('/user/create')
  .send({
    name: "sam",
        email: "sam122@ed.info",
        password: "12jhjhjhj",
        phone_no: "129834567890",
        address : "jfkjkg kjgkrjgkcd"
  })
  .expect(200)
})

/*
const User = require ( './user.js' )
describe('POST /api/user/signup', () => {
  test('It should return correct',  async done => {
    
    // Create a new user
    await agent
      //.post('/api/user/signup')
      .send({ name: "sam",
      email: "sam@ed.info",
      password: "12jhjhjhj",
      phone_no: "1234567890",
      address : "jfkjkg kjgkrjgk" })
      .expect(201)
      .then(res => {
        expect(res.body.user).toBeTruthy();
      });

/*
const User = require ( './user.js' )
//const { Signup } = require('./user.js')

const mongoose = require( 'mongoose' )
mongoose.Promise = global.Promise
mongoose.connect ( 'https://reqres.in/', {
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})

afterAll( async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
  })
*/