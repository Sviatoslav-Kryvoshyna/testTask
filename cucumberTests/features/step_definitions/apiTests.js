const pactum = require('pactum');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => { spec = pactum.spec(); });

Given('user make GET request to {string}', function (url) {
    spec.get(url);
});

When('user receive response', async function () {
    await spec.toss();
});  

Then('user get correct response', function () {
    spec.response().should.have.json(
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    )
    spec.response().should.have.status(200);
});

Given('user make POST requsts to {string} with body title: {string}, body: {string}, userId: {float}', function (url, title, body, userId) {
    let json = `
        title: ${title},
        body: ${body},
        userId: ${userId},
    `

    spec.post(url).withBody(
        {
            json
        }
    ).withHeaders({
        'Content-type': 'application/json; charset=UTF-8',
    });
});

Then('response status is {int} and id: {int}', function (code, id) {
    spec.response().should.have.status(code);
    spec.response().should.have.jsonMatch(
        {
            id: id,
        }
    )
});

Given('user make PUT requsts to {string} with body id: {int} , title: {string}, body: {string}, userId: {int}', function (url, id, title, body, userId) {
    let json = `
        id: ${id}
        title: ${title},
        body: ${body},
        userId: ${userId},
    `

    spec.put(url).withBody(
        {
            json
        }
    ).withHeaders({
        'Content-type': 'application/json; charset=UTF-8',
    });
});

Then('response status is {int} and response: id: {int} , title: {string}, body: {string}, userId: {int}', function (code, id, title, body, userId) {
    let json = `
        id: ${id}
        title: ${title},
        body: ${body},
        userId: ${userId},
    `
    spec.response().should.have.status(code);
    spec.response().should.have.jsonMatch({
        json
    });
});
