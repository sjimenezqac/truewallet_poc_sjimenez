const supertest = require('supertest')
const request = supertest('https://gorest.co.in/public/v2/')

const expect = require('chai').expect

const env = process.env



describe('Posts endpoint test', ()=>{

    it('GET /posts',async ()=>{
        const response = await request.get(`posts?access-token=${env.API_TOKEN}`)
        if (response.error){
            console.log('Throwing response error')
            throw response.error
        }
        expect(response.statusCode).to.equal(200)
        expect(response.body).not.to.be.empty
        expect(response.body[0]).to.have.all.keys('id', 'user_id', 'title', 'body')

    })
})