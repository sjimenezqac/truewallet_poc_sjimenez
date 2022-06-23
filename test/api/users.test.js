const supertest = require('supertest')
const request = supertest('https://gorest.co.in/public/v2/')

const expect = require('chai').expect

require('dotenv').config()
const env = process.env

describe('/users', ()=>{

    describe('GET /users', ()=>{

        it('returns correct data', async ()=>{
            const response = await request.get(`users?access-token=${env.API_TOKEN}`)
            expect(response.statusCode).to.equal(200)
            expect(response.body).not.to.be.empty
            expect(response.body[0]).to.have.all.keys('id', 'name', 'email', 'gender', 'status')
        })

        it('responds in less than .2 sec', async ()=>{
            const response = await request.get(`users?access-token=${env.API_TOKEN}`)
            expect(Number(response.header['x-runtime'])).to.be.lessThan(.2)
        })


    })

    describe('POST /users', ()=>{

        it('requires authentication ', async ()=>{
            const response = await request.post('users')
            expect(response.statusCode).to.equal(401)
            expect(response.body.message).to.equal('Authentication failed')
        })

        it('has required fields', async ()=>{
            const requiredFieldsMessages = [{field:"email",message:"can't be blank"},
                                            {field:"name",message:"can't be blank"},
                                            {field:"gender",message:"can't be blank, can be male or female"},
                                             {field:"status",message:"can't be blank"}]

            const response = await request.post(`users?access-token=${env.API_TOKEN}`)
            expect(response.statusCode).to.equal(422)
            expect(response.body).to.deep.include.members(requiredFieldsMessages)

        })


        // it('adds new user ', async ()=>{
        //     const response = await request.post(`users?access-token=${env.API_TOKEN}`)


        // })

    })

})