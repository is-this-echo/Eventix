import axios from "axios";

export default ({ req }) => {
  if (typeof window == "undefined") {
    // if it is on server side

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // if called from the browser

    return axios.create({
      baseURL: "/",
    });
  }
};
