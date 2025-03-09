import { processForm } from "../src/client/js/app";

describe("Testing the processForm function", () => {
  test("processForm function should be defined", () => {
    expect(processForm).toBeDefined();
  });

  test("processForm should be a function", () => {
    expect(typeof processForm).toBe("function");
  });
});
