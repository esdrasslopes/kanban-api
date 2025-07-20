import { it, describe, beforeAll, afterAll, beforeEach, expect } from "vitest";

import request from "supertest";

import { app } from "../src/app";

import { execSync } from "node:child_process";

describe("Tasks router", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex  -- migrate:rollback --all");
    execSync("npm run knex -- migrate:latest");
  });

  it("should be able to create a new task", async () => {
    await request(app.server)
      .post("/tasks/")
      .send({
        task: "Refatora código",
        status: "todo",
        type: "refactoration",
        description: "Refatorar código da api do kanban",
        priority: "high",
      })
      .expect(201);
  });

  it("should be able do get all tasks", async () => {
    const task = await request(app.server).post("/tasks/").send({
      task: "Refatora código",
      status: "todo",
      type: "refactoration",
      description: "Refatorar código da api do kanban",
      priority: "high",
    });

    const cookies = task.get("Set-Cookie");

    const allTasks = await request(app.server)
      .get("/tasks")
      .set("Cookie", cookies!);

    expect(allTasks.body.tasks).toEqual([
      expect.objectContaining({
        status: "todo",
        task: "Refatora código",
        type: "refactoration",
        description: "Refatorar código da api do kanban",
        priority: "high",
      }),
    ]);
  });

  it("should be able to get one task", async () => {
    const task = await request(app.server).post("/tasks/").send({
      task: "Refatora código",
      status: "todo",
      type: "refactoration",
      description: "Refatorar código da api do kanban",
      priority: "high",
    });

    const cookies = task.get("Set-Cookie");

    const allTasks = await request(app.server)
      .get("/tasks")
      .set("Cookie", cookies!);

    const taskId = allTasks.body.tasks[0].id;

    const getTaskResponse = await request(app.server)
      .get(`/tasks/${taskId}`)
      .set("Cookie", cookies!);

    expect(getTaskResponse.body.task).toEqual(
      expect.objectContaining({
        status: "todo",
        task: "Refatora código",
        type: "refactoration",
        description: "Refatorar código da api do kanban",
        priority: "high",
      })
    );
  });

  it("should be able to uptade one task", async () => {
    const task = await request(app.server).post("/tasks/").send({
      task: "Refatora código",
      status: "todo",
      type: "refactoration",
      description: "Refatorar código da api do kanban",
      priority: "medium",
    });

    const cookies = task.get("Set-Cookie");

    const allTasks = await request(app.server)
      .get("/tasks")
      .set("Cookie", cookies!);

    const taskId = allTasks.body.tasks[0].id;

    const taskToUpdate = await request(app.server)
      .patch(`/tasks/${taskId}`)
      .set("Cookie", cookies!)
      .send({
        task: "Refatora código",
        status: "completed",
        type: "refactoration",
        description: "Refatorar código da api do kanban",
        priority: "high",
      });

    expect(taskToUpdate.body.updateTask).toEqual([
      expect.objectContaining({
        task: "Refatora código",
        status: "completed",
        type: "refactoration",
        description: "Refatorar código da api do kanban",
        priority: "high",
      }),
    ]);
  });

  it.only("should be able to delete one task", async () => {
    const task = await request(app.server).post("/tasks/").send({
      task: "Refatora código",
      status: "todo",
      type: "refactoration",
      description: "Refatorar código da api do kanban",
      priority: "high",
    });

    const cookies = task.get("Set-Cookie");

    const allTasks = await request(app.server)
      .get("/tasks")
      .set("Cookie", cookies!);

    const taskId = allTasks.body.tasks[0].id;

    await request(app.server)
      .delete(`/tasks/${taskId}`)
      .set("Cookie", cookies!)
      .expect(200);
  });
});
