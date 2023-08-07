import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("Returns a 404 status-code if the provided ticket-id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "NoOne",
      price: 5,
    })
    .expect(404);
});

it("Returns a 401 status-code if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "NoOne",
      price: 5,
    })
    .expect(401);
});

it("Returns a 401 status-code if the user does not own the ticket", async () => {
  const title = "Interstellar";
  const price = 40;

  // creating a ticket with a user-id
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });

  /*
  trying to update the previously created ticket with a different user-id
  global.signin() randomly generates a cookie, so not the same user is making the request.
  */
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "OldBoy", price: 25 })
    .expect(401);

  // the unauthorized update request which failed should not modify the ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

it("Returns a 400 status-code if the user provides an invalid title or price while updating", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "StrangerThings", price: 120 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 140 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "StrangerThings", price: -100 })
    .expect(400);
});

it("Updates the ticket if user is authorized, owns the ticket and provides the correct details ", async () => {
  const cookie = global.signin();
  const title = "Dunkirk";
  const price = 40;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Inception", price: 60 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
