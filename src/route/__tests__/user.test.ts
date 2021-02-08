import supertest from "supertest";
import app from "../../server";
import UserQuery from "../../query/userquery";

jest.mock("../../query/userquery");

const fakeUser = {user_id: 1, username: "usernameA"};
const fakeTokenObj = {data: fakeUser};
const editUserBody = {username: "usernameB"};

jest.mock("../../query/userquery", () => ({
  createToken: jest.fn(),
  verifyToken: jest.fn(() => fakeTokenObj),
  checkLogin: jest.fn(() => fakeUser),
  createUser: jest.fn(),
  getUserById: jest.fn(),
  changePassword: jest.fn(),
  editUser: jest.fn(),
}));

describe("POST /api/user/login", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(UserQuery, "createToken");
    await supertest(app)
      .post("/api/user/login")
      .send({ username: "usernameA", password: "passwordA" })
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1);
  });
});

describe("POST /api/user/changepassword", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(UserQuery, "changePassword");
    await supertest(app)
      .post("/api/user/changepassword")
      .send({ username: "usernameA", password: "passwordA", newPassword: "passwordB" })
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith("usernameA", "passwordB");
  });
});

describe("PUT /api/user/edit", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(UserQuery, "editUser");
    await supertest(app)
      .put("/api/user/edit")
      .set("token", "test_token")
      .send(editUserBody)
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1, editUserBody);
  });
});

describe("POST /api/user/new", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(UserQuery, "createUser");
    await supertest(app)
      .post("/api/user/new")
      .send({username: "usernameA", password: "passwordA"})
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith("usernameA", "passwordA");
  });
});

describe("GET /api/user/:userId", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(UserQuery, "getUserById");
    await supertest(app)
      .get("/api/user/1")
      .set("token", "test_token")
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1, true);
  });
});
