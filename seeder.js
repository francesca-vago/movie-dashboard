// Create fake data
const faker = require('faker');
const fs = require('fs');

const data = {};

data.users = [];
data.books = [];

for(i=0; i<5; i++) {
    data.users.name = faker.name.findName();
    data.users.email = faker.internet.email();

}

for(i=0; i<10; i++) {
    data.books.title =
}