import supertest from "supertest";
import app from "../../server";
import QuestionQuery from "../../query/questionquery";
import UserQuery from "../../query/userquery";

const fakeUser = {user_id: 1, username: "usernameA"};
const fakeUserTwo = {user_id: 2, username: "usernameTwo"};
const fakeTokenObj = {data: fakeUser};
const fakeToeknObjTwo = {data: fakeUserTwo};
jest.mock("../../query/userquery", () => ({
  verifyToken: jest.fn(() => fakeTokenObj),
}));

const fakeQuestion = {quesiton_id: 1, user_id: 1, title: "question_title"};
jest.mock("../../query/questionquery", () => ({
  createQuestion: jest.fn(),
  getMaxId: jest.fn(() => 0),
  editQuestion: jest.fn(),
  getQuestionById: jest.fn(() => fakeQuestion),
  getQuestionList: jest.fn(() => [fakeQuestion]),
  filterQuestionObj: jest.fn(),
  filterQuestionObjList: jest.fn(),
  deleteQuestion: jest.fn(),
  submitQuestion: jest.fn(),
}));

describe("GET /api/quesiton/list/timeName", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(QuestionQuery, "getQuestionList");
    await supertest(app)
      .get("/api/question/list/all")
      .set("token", "test_token")
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith("all");
  });
});

describe("POST /api/question/new", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(QuestionQuery, "createQuestion");
    await supertest(app)
      .post("/api/question/new")
      .set("token", "test_token")
      .send({title: "question_title"})
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1, 1, {title: "question_title"});
  });
});

describe("POST /api/question/submit/:questionId", () => {
  it("responds 200 success", async () => {
    const queryHandler = jest.spyOn(QuestionQuery, "submitQuestion");
    await supertest(app)
      .post("/api/question/submit/1")
      .set("token", "test_token")
      .send({value: 100, answer: 1})
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1, 1, {value: 100, answer: 1});
  });
});

describe("PUT /api/question/:questionId", () => {
  describe("is question owner", () => {
    it("responds 200 success", async () => {
      const queryHandler = jest.spyOn(QuestionQuery, "editQuestion");
      await supertest(app)
        .put("/api/question/1")
        .set("token", "test_token")
        .send({title: "question_title"})
        .expect(200);
      expect(queryHandler).toHaveBeenCalledWith(1, 1, {title: "question_title"});
    });
  });
  describe("is not question onwer", () => {
    it ("responds 401 unauthorized", async () => {
      jest.spyOn(UserQuery, 'verifyToken').mockReturnValue(fakeToeknObjTwo);
      await supertest(app)
        .put("/api/question/1")
        .set("token", "test_token")
        .send({title: "question_title"})
        .expect(401);
    });
  });
});

describe("GET /api/quesiton/:questionId", () => {
  it("responds 200 success", async () => {
    jest.spyOn(UserQuery, 'verifyToken').mockReturnValue(fakeTokenObj);
    const queryHandler = jest.spyOn(QuestionQuery, "getQuestionById");
    await supertest(app)
      .get("/api/question/1")
      .set("token", "test_token")
      .expect(200);
    expect(queryHandler).toHaveBeenCalledWith(1);
  });
});

describe("DELETE /api/question/:questionId", () => {
  describe("is question owner", () => {
    it("responds 200 success", async () => {
      jest.spyOn(UserQuery, 'verifyToken').mockReturnValue(fakeTokenObj);
      const queryHandler = jest.spyOn(QuestionQuery, "deleteQuestion");
      await supertest(app)
        .delete("/api/question/1")
        .set("token", "test_token")
        .expect(200);
      expect(queryHandler).toHaveBeenCalledWith(1);
    });
  });
  describe("is not question onwer", () => {
    it ("responds 401 unauthorized", async () => {
      jest.spyOn(UserQuery, 'verifyToken').mockReturnValue(fakeToeknObjTwo);
      await supertest(app)
        .delete("/api/question/1")
        .set("token", "test_token")
        .expect(401);
    });
  });
});
