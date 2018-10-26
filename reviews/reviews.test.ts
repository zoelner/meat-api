import "jest";
import * as request from "supertest";
import { environment } from "../common/environment";

let address: string = (<any>global).address;

test("GET /reviews", () => {
  return request(address)
    .get("/reviews")
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.items).toBeInstanceOf(Array);
    })
    .catch(fail);
});
