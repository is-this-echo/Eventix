import request from "supertest";
import { app } from "../../app";

it("Returns a 201 status-code on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("Returns a 400 status-code with an invalid email signup ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@tecom",
      password: "password",
    })
    .expect(400);
});

it("Returns a 400 status-code with an invalid password signup ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@te.com",
      password: "0idp",
    })
    .expect(400);
});

it("Returns a 400 status-code with missing email & password signup ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "opop@anime.com",
      password: "",
    })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "9d0asfwsfj23--1",
    })
    .expect(400);
});

it("Disallows duplicate email signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("Sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
