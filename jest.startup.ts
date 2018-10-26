import * as jestcli from "jest-cli";
import { Server } from "./server/server";
import { environment } from "./common/environment";
import { usersRouter } from "./users/users.router";
import { User } from "./users/users.model";
import { reviewsRouter } from "./reviews/reviews.router";
import { Review } from "./reviews/reviews.model";

let server: Server;

const beforAllTests = () => {
  environment.db.url =
    process.env.DB_URL || "mongodb://192.168.99.100:32768/meat-api-test-db";
  environment.server.port = process.env.SERVER_PORT || 3001;
  server = new Server();
  return server
    .bootstrap([usersRouter, reviewsRouter])
    .then(() => {
      User.deleteMany({}).exec();
      Review.deleteMany({}).exec();
    })
    .catch(console.error);
};

const afterAllTests = () => {
  return server.shutdown();
};

beforAllTests()
  .then(() => jestcli.run())
  .then(() => afterAllTests())
  .catch(console.error);
