# Ze Delivery - Garug's Challenge Backend

This is a resolution purpouse for the 'zé delivery' challenge backend.
The original challenge can be found [here](https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md).

# Summary

-   The Challenge
    -- Create a Partner
    -- Load partner by id
    -- Search partner
-   The Project
    -- Technologies
    -- Endpoints
    -- Running locally
    -- Production build
-   Tests
    -- Jest
    -- Cypress

# The Challenge

We expect you to develop a service that provides an API using _REST_ or _GraphQL_ that implements the three following features and respects the following technical requirements:

## Create a Partner

-   Save in a database a partner defined by all the fields represented by the JSON and rules below:

```json
{
    "id": 1,
    "tradingName": "Adega da Cerveja - Pinheiros",
    "ownerName": "Zé da Silva",
    "document": "1432132123891/0001",
    "coverageArea": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [30, 20],
                    [45, 40],
                    [10, 40],
                    [30, 20]
                ]
            ],
            [
                [
                    [15, 5],
                    [40, 10],
                    [10, 20],
                    [5, 10],
                    [15, 5]
                ]
            ]
        ]
    },
    "address": {
        "type": "Point",
        "coordinates": [-46.57421, -21.785741]
    }
}
```

1. The `address` field follows the `GeoJSON Point` format (https://en.wikipedia.org/wiki/GeoJSON);
2. The `coverageArea` field follows the `GeoJSON MultiPolygon` format (https://en.wikipedia.org/wiki/GeoJSON);
3. The `document` must be a unique field;
4. The `id` must be a unique field, but not necessarily an integer;

## Load partner by id

Return a specific partner by its `id` with all the fields presented above.

## Search partner

Given a specific location (coordinates `long` and `lat`), search the **nearest** partner **which the coverage area includes** the location.

# The Project

## Technologies

-   Express - fast node.js network app framework
-   MongoDB - is the choice of database, based on his native [Geospacial Queries](https://docs.mongodb.com/manual/geospatial-queries/)
-   Typescript - Extends JavaScript by adding types

## Endpoints

| Path            | Method | Query Params / Body                  | Description                         |
| --------------- | ------ | ------------------------------------ | ----------------------------------- |
| `/partners`     | `POST` | See Create a Partner                 | Create a new partner                |
| `/partners`     | `GET`  | - lat: Latitude<br>- long: Longitude | Return partner based on parameters  |
| `/partners/:id` | `GET`  | none                                 | Return specific partner based on id |

## Running locally

To run this project on your machine, you need:

-   npm
-   A instance of MongoDB

1.  Install dependencies

Run a shell command to install dependencies
```sh
$ npm install
```

2. Configure database

To configure your MongoDB instance, its very simple, define environment variable `DB_MONGO_URL` otherwise a default value `mongodb://localhost:27017/ze` is used to connect.

Feel free to use a cloud native option like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or your own [Docker Image](https://hub.docker.com/_/mongo).

I recommend install [Mongo Compass](https://www.mongodb.com/products/compass), like they said:

> The easiest way to explore and manipulate your MongoDB data

The important is **configure your own string connection** or your **local machine to default value works**.

3. Run the project

Run a shell command to start application locally
```sh
$ npm run serve
```

4. Use
If everything is fine, you see something like

```sh
$ Connecting to database...
$ Server started! Port: 3000
$ Database Connected!
```

## Production build
1. Run build
```sh
$ npm build
```

2. Start application

Default node applications start with command `npm start`, this works after run the build step.
If you want override this command, see `package.json` to look file and some other configurations needed to deploy application.

```sh
$ npm start
```

# Tests

Exists two suits case for test this project.
* Unit tests - Test core of application (Using jest)
* Tests e2e - Test application, from the beginning to end (Using cypress)
**

==================

===== **Atention!** =====

==================

The official challenge offers a json file to test case, but this json have some inconstence Multipolygon, like this above:
![](https://i.imgur.com/Pn8VkU7.jpg)

I fix some of them for my test case.

## Jest

Run default command test for test jest
```sh
$ npm test
```
This generate some coverage info inside `coverage` folder.
lcov-report provide some interface to see coverage report on your broswer. To access open `coverage/lcov-report/index.html` on your browser.

## Cypress

Before run cypress test suite, you need a clean instance of database.

Cypress offer some interesting ways to run all test suite, you can read about in their official guides.

I preffer open a interface to see what are being executed and can perform a re-test if I need.

```sh
$ npx cypress open
```

You gonna see something like
![](https://i.imgur.com/KsIGsv4.png)

Click on 'Run all specs' and wait for the completation.
