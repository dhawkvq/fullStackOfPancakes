import { generateSetSql } from "../generateSetSql";
import { createFakeUsers } from "../createFakeUsers";
import { createFakeProducts } from "../createFakeProducts";
import { assertString, assertNumber } from "../assert";
import { hashPassword, compareHashedPassword } from "../password";

describe("utils generateSetSql", () => {
  it("generates proper return type of GenerateSqlReturn", () => {
    const args = [
      ["first_name", "Derrick"],
      ["last_name", "Hawkins"],
    ];
    const argVals = args.map(([, val]) => val);
    const { setSqlStatement, values } = generateSetSql(args);
    expect(setSqlStatement).toBeInstanceOf(String);
    expect(values.every((key) => typeof key === "string")).toBeTruthy();
    expect(setSqlStatement).toBe("SET first_name = $1,last_name = $2");
    expect(argVals.every((val) => values.includes(val))).toBeTruthy();
    expect(values.indexOf("Derrick")).toBe(0);
    expect(values.indexOf("Hawkins")).toBe(1);
  });
});

describe("utils createFakeUsers", () => {
  it("creates the number of fake users that the dev asks for", async () => {
    const fakeUsers = await createFakeUsers(10);
    expect(fakeUsers).toBeInstanceOf(Array);
    expect(fakeUsers.length).toBe(10);
  });
});

describe("utils createFakeProducts", () => {
  it("created an an array of products the of the length the dev provides", async () => {
    const fakeProducts = await createFakeProducts(10);
    expect(fakeProducts).toBeInstanceOf(Array);
    expect(fakeProducts.length).toBe(10);
  });
});

describe("utils/assert assertString", () => {
  it("returns arg if the arg passed is of type string", () => {
    expect(assertString("nice")).toBe("nice");
  });

  it("returns false if the arg passed would convert to a number", () => {
    expect(() => assertString("1234")).toThrowError(
      "expected arg was not of type string."
    );
  });
});

describe("utils/assert assertNumber", () => {
  it("returns the arg passed is of type string but converts to number without error", () => {
    expect(assertNumber("1234")).toBe(1234);
  });

  it("returns false if the arg passed would not convert to a number", () => {
    expect(() => assertNumber("1234notSoMuch")).toThrowError(
      "expected arg was not of type number."
    );
  });
});

describe("utils/password compareHashedPasswords", () => {
  it("returns what i want", async () => {
    const password = "secret";
    const hashedPassword = hashPassword(password);
    const match = compareHashedPassword(password, hashedPassword);
    expect(match).toBeTruthy();
  });
});
