const request = require('supertest');
const app = require('./app')

//////////////////////////////////
describe('GET /records', () => {
    test('Powinno zwrócić pierszy rekord z bazy danych.', (done) => {
        request(app).get('/records/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
//////////////////////////////////
describe('GET /records/param/:id', () => {
    test('Powinno zwrócić rekord o danym id.', (done) => {
        request(app).get('/records/param/5a50a049d78b6611a820a9f7').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Powinno zwrócić kod 404 gdy id niepoprawne.', (done) => {
        request(app).get('/records/param/5a50a049d78b6611a820a9f').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    test('Powinno zwrócić kod 404 gdy id nie ma w bazie danych.', (done) => {
        request(app).get('/records/param/5a50a049d78b6611a820a9f6').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
//////////////////////////////////
describe('POST /records', () => {
    test('Powinno zapisać do bazy danych rekord.', (done) => {
        request(app)
      .post('/records')
      .type('form')
      .send({nazwaGlowna:'kotmaale2'})
      .set('Accept', 'application/json')
      //~ .expect(200)
      .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Powinno nie zapisać rekordu do bazy danych.', (done) => {
       request(app)
      .post('/records')
      .type('form')
      .send({identyfikatorPRNG:123456789})  //powinien zrócić błąd bo za duża liczba dla pola
      .set('Accept', 'application/json')
      //~ .expect(404)
      .then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
//////////////////////////////////
describe('DELETE /records/param/:id', () => {
    test('Powinno usunąć rekord o danym id.', (done) => {
        request(app).delete('/records/param/5a52887ecec185143e66eea0').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Powinno zwrócić kod 404 gdy id do usuniecia niepoprawne.', (done) => {
        request(app).delete('/records/param/5a52887ecec185143e66eea').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    test('Powinno zwrócić kod 404 gdy id do usunięcia nie ma w bazie danych.', (done) => {
        request(app).delete('/recofdfsdggfgfsdsdfhfhfgd185143e66eea3').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
//////////////////////////////////
describe('PATCH records/param/:id', () => {
    test('Powinno uaktualnić datę w rekordzie o szukanym id.', (done) => {
        request(app).patch('/records/param/5a50d6484df0ad227e9a369a').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Powinno zrówić kod 404 gdy podanego id nie ma w bazie danych',(done)=>{
        request(app).patch('/records/param/123456789123456789123456')
        .type('form')
        .send({nazwaGlowna:'kotmaale2'})
        .then((response) => {
          expect(response.statusCode).toBe(404);
          done();
        });
    });
    test('Powinno zrówić kod 404 gdy id niepoprawne', (done) => {
        request(app).patch('/records/param/5a52887ecec185143e66eea').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
