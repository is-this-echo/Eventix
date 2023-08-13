import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("eventix", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS..");

  /* we can only send string values, not js-object, so the payload will be
    stringified using JSON library
 */
  const data = JSON.stringify({
    id: "1213",
    title: "concert",
    price: 23,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
