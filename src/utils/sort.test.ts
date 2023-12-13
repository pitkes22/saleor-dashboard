import {
  asSortParams,
  createGetSortQueryVariables,
  getArrowDirection,
  getOrderDirection,
  getSortParams,
  getSortUrlVariables,
} from "@dashboard/utils/sort";

describe("getSortUrlVariables", () => {
  it("should toggle the sort direction if the field is the same", () => {
    const params = { sort: "name", asc: true };
    expect(getSortUrlVariables("name", params)).toEqual({
      sort: "name",
      asc: false,
    });
  });

  it("should set sort to the new field and asc to true", () => {
    const params = { sort: "name", asc: false };
    expect(getSortUrlVariables("date", params)).toEqual({
      sort: "date",
      asc: true,
    });
  });
});

describe("getOrderDirection", () => {
  it("should return ASC for true", () => {
    expect(getOrderDirection(true)).toBe("ASC");
  });

  it("should return DESC for false", () => {
    expect(getOrderDirection(false)).toBe("DESC");
  });
});

describe("getArrowDirection", () => {
  it('should return "asc" for true', () => {
    expect(getArrowDirection(true)).toBe("asc");
  });

  it('should return "desc" for false', () => {
    expect(getArrowDirection(false)).toBe("desc");
  });
});

describe("getSortParams", () => {
  it("should return the same sort object", () => {
    const params = { sort: "name", asc: true };
    expect(getSortParams(params)).toEqual(params);
  });
});

describe("asSortParams", () => {
  // Assuming findValueInEnum and parseBoolean work as expected
  it("should append sort params to existing ones", () => {
    const params = { otherParam: "value" };
    const fields = { name: "name", date: "date" };
    expect(asSortParams(params, fields, "name")).toEqual({
      otherParam: "value",
      sort: "name",
      asc: true,
    });
  });
});

describe("createGetSortQueryVariables", () => {
  it("should create a function that returns sorting input", () => {
    const getSortQueryField = jest.fn().mockReturnValue("name");
    const getSortQueryVariables =
      createGetSortQueryVariables(getSortQueryField);

    expect(getSortQueryVariables({ sort: "name", asc: true })).toEqual({
      direction: "ASC",
      field: "name",
    });
  });

  it("should return undefined if getSortQueryField returns undefined", () => {
    const getSortQueryField = jest.fn().mockReturnValue(undefined);
    const getSortQueryVariables =
      createGetSortQueryVariables(getSortQueryField);

    expect(
      getSortQueryVariables({ sort: "unknown", asc: true }),
    ).toBeUndefined();
  });
});
