import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../index'


describe('Currency API', () => {
    test('POST /api/convert/amount returns converted amount', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'EUR', to: 'USD', amount: 100 })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('amount')
        expect(typeof response.body.amount).toBe('number')
    })

    test('POST /api/convert/amount returns 400 for invalid currency code', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'INVALID', to: 'USD', amount: 100 })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })

     test('POST /api/convert/amount returns 400 for null amount', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'EUR', to: 'USD', amount: null })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })

    test('POST /api/convert/amount returns 400 for negative amount', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'EUR', to: 'USD', amount: -1})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })

    test('POST /api/convert/amount returns 400 if amount is letter', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'EUR', to: 'USD', amount: 'a'})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })

    test('POST /api/convert/amount returns 500 for same currency conversion', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'USD', to: 'USD', amount: 100})
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('error')
    })

    test('POST /api/convert/amount returns 400 for invalid target currency code', async () => {
        const response = await request(app)
            .post('/api/convert/amount')
            .send({ from: 'EUR', to: 'INVALID', amount: 100})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })
})
