import request from "supertest";
import { app } from "../../app";

it("Fails for an email which does not exist in the user database", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("Fails when an incorrect password is given", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "light@anime.com", password: "misaamane" })
    .expect(201);

  return await request(app)
    .post("/api/users/signin")
    .send({
      email: "light@anime.com",
      passsword: "dfsfsfwsgiiber",
    })
    .expect(400);
});

it("Responds with a cookie if valid credentials are provided", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "lightyagami@anime.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "lightyagami@anime.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
