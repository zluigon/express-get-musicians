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

  test("GET", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData[0]).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Mick Jagger",
        instrument: "Voice",
        bandId: null,
      })
    );
  });

  test("GET /:id", async () => {
    const response = await request(app).get("/musicians/2");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        id: 2,
        name: "Drake",
        instrument: "Voice",
        bandId: null,
      })
    );
  });

  test("POST", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ name: "Ronnie Radke", instrument: "Voice" });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "Ronnie Radke",
        instrument: "Voice",
      })
    );
  });

  test("PUT", async () => {
    const response = await request(app)
      .put("/musicians/4")
      .send({ name: "Corey Taylor" });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        id: 4,
        name: "Corey Taylor",
        instrument: "Voice",
        bandId: null,
      })
    );
  });

  test("DELETE", async () => {
    const response = await request(app).delete("/musicians/4");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        id: 4,
        name: "Corey Taylor",
        instrument: "Voice",
        bandId: null,
      })
    );
  });

  test("POST w/ missing fields", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ name: "Serj Tankian", instrument: "" });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toHaveProperty("errors");
  });

  test("POST w/ invalid length", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ name: "Super Long Ridiculous Name", instrument: "Voice" });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toHaveProperty("errors");
  });
});

describe("./bands endpoint", () => {
  test("GET", async () => {
    const response = await request(app).get("/bands");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(responseData)).toBeTruthy();
  });

  test("GET /:id", async () => {
    const response = await request(app).get("/bands/1");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toHaveProperty("id");
  });
});
