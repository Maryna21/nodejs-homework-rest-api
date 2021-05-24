const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const {User, contacts, newContact} = require('../model/__mocks__/data')

require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({id: User.id}, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Testing the route api/contacts', () => {
    let idNewContact = null
    describe('should handle GET request', () => {
        test('should return 200 status for GET: /contacts', async(done) => {
            const res = await request(app)
            .get('/api/contacts')
            .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts).toBeInstanceOf(Array)
            done()
        })
        test('should return 200 status for GET: /contacts/:id', async (done) => {
            const contact = contacts[0]
            const res = await request(app)
            .get(`/api/contacts/${contact._id}`)
            .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
        test('should return 404 status for GET: /contacts/:id', async (done) => {
            const contact = contacts[0]
            const res = await request(app)
            .get(`/api/contacts/6097f228f81e0cc8f40a9515n`)
            .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
        test('should return 400 status for GET: /contacts/:id', async (done) => {
            const contact = contacts[0]
            const res = await request(app)
            .get(`/api/contacts/6097f228f81e0cc8f40a9515`)
            .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
    })

    describe('should handle POST request', () => {
        test('should return 201 status for POST: /contacts', async(done) => {
            const res = await request(app)
            .post('/api/contacts')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(newContact)
            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()
            idNewContact = res.body.data.contact._id
            done()
        })
            test('should return 400 status for POST: /contacts wrong field', async(done) => {
                const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({...newContact, test: 1})
                expect(res.status).toEqual(400)
                expect(res.body).toBeDefined()
                done()
            })
                test('should return 400 status for POST: /contacts without field', async(done) => {
                    const res = await request(app)
                    .post('/api/contacts')
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .send({name: 'Fill'})
                    expect(res.status).toEqual(400)
                    expect(res.body).toBeDefined()
                    done()
                })
    })

    describe('should handle PUT request', () => {
        test('should return 200 status for PUT: /contacts/:id', async(done) => {
            const res = await request(app)
            .put(`/api/contacts/${idNewContact}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send({name: 'Barsik'})
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
           
            expect(res.body.data.contact.name).toBe('Barsik')
            done()
        })
            test('should return 400 status for PUT: /contacts/:id wrong field', async(done) => {
                const res = await request(app)
                .put('/api/contacts/1234')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({test: 1})
                expect(res.status).toEqual(400)
                expect(res.body).toBeDefined()
                done()
            })
                test('should return 404 status for PUT: /contacts/:id without field', async(done) => {
                    const res = await request(app)
                    .put('/api/contacts/6097f228f81e0cc8f40a9515n')
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .send({name: 'Fill'})
                    expect(res.status).toEqual(404)
                    expect(res.body).toBeDefined()
                    done()
                })
    })

    describe('should handle PUT request', () => {
        test('should return 200 status for PATCH: /contacts/:id/favorite', async(done) => {
            const res = await request(app)
            .patch(`/api/contacts/${idNewContact}/favorite`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send({favorite: true})
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact.favorite).toBe(true)
            done()
        })
            test('should return 400 status for PATCH: /contacts/:id/favorite wrong field', async(done) => {
                const res = await request(app)
                .patch('/api/contacts/${idNewContact}/favorite')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({test: 1})
                expect(res.status).toEqual(400)
                expect(res.body).toBeDefined()
                done()
            })
                test('should return 404 status for PATCH: /contacts/:id/favorite without field', async(done) => {
                    const res = await request(app)
                    .patch('/api/contacts/6097f228f81e0cc8f40a9515n/favorite')
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .send({favorite: true})
                    expect(res.status).toEqual(404)
                    expect(res.body).toBeDefined()
                    done()
                })
    })
})
