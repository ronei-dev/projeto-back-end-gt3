const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models/User');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('User API', () => {
    let token;
    let userId;
    const testUser = {
        firstname: 'Test',
        surname: 'User',
        email: 'test.user@example.com',
        password: 'password123',
        confirmPassword: 'password123',
    };

    it('should create a new user and return 201', async () => {
        const res = await request(app)
            .post('/v1/usuario')
            .send(testUser);

        expect(res.statusCode).toEqual(201);
    });

    it('should return 400 when creating a user with a duplicate email', async () => {
        const res = await request(app)
            .post('/v1/usuario')
            .send(testUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Este email já está em uso.');
    });

    it('should login the user and return a JWT token', async () => {
        const res = await request(app)
            .post('/v1/usuario/token')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should get user information by ID and return 200', async () => {
        const loginRes = await request(app).post('/v1/usuario/token').send({ email: testUser.email, password: testUser.password });
        const userListRes = await request(app).get('/v1/usuario').set('Authorization', `Bearer ${loginRes.body.token}`); // Supondo que exista uma rota para listar usuários
        const user = await request(app).post('/v1/usuario/token').send({ email: testUser.email, password: testUser.password });

        const User = require('../src/models/User');
        const createdUser = await User.findOne({ where: { email: testUser.email } });
        userId = createdUser.id;

        const res = await request(app)
            .get(`/v1/usuario/${userId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('firstname', testUser.firstname);
    });

    it('should update the user and return 204', async () => {
        const updatedData = {
            firstname: 'Updated',
            surname: 'Name',
            email: 'updated.user@example.com',
        };

        const res = await request(app)
            .put(`/v1/usuario/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(204);

        const checkRes = await request(app).get(`/v1/usuario/${userId}`);
        expect(checkRes.body.firstname).toEqual('Updated');
        expect(checkRes.body.email).toEqual('updated.user@example.com');
    });

    it('should delete the user and return 204', async () => {
        const res = await request(app)
            .delete(`/v1/usuario/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 when trying to get a deleted user', async () => {
        const res = await request(app)
            .get(`/v1/usuario/${userId}`);

        expect(res.statusCode).toEqual(404);
    });
});