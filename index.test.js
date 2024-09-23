// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here

  test("testing musicians endpoint statusCode", async () => {
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });

  test("testing musicians endpoint response", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);

    expect(responseData[0]).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Mick Jagger",
        instrument: "Voice",
        bandId: null,
      })
    );
  });
});
