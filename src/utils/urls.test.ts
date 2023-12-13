import { getAppDefaultUri, getAppMountUri } from "@dashboard/config";
import {
  getAppMountUriForRedirect,
  getArrayQueryParam,
  isExternalURL,
  stringifyQs,
} from "@dashboard/utils/urls";

describe("stringifyQs", () => {
  it("should handle simple key-value pairs", () => {
    expect(stringifyQs({ key: "value" })).toEqual("key=value");
  });

  it("should serialize arrays with the default indices format", () => {
    expect(stringifyQs({ array: ["value1", "value2"] })).toEqual(
      "array%5B0%5D=value1&array%5B1%5D=value2",
    );
  });

  it("should serialize arrays with comma format", () => {
    expect(stringifyQs({ array: ["value1", "value2"] }, "comma")).toEqual(
      "array=value1%2Cvalue2",
    );
  });

  // Additional tests for other array formats and complex objects...
});

describe("getArrayQueryParam", () => {
  it("should return an array for string input", () => {
    expect(getArrayQueryParam("test")).toEqual(["test"]);
  });

  it("should return the same array for array input", () => {
    expect(getArrayQueryParam(["test1", "test2"])).toEqual(["test1", "test2"]);
  });
});

describe("isExternalURL", () => {
  it("should return true for external URLs", () => {
    expect(isExternalURL("http://example.com")).toBeTruthy();
    expect(isExternalURL("https://example.com")).toBeTruthy();
  });

  it("should return false for non-external URLs", () => {
    expect(isExternalURL("ftp://example.com")).toBeFalsy();
    expect(isExternalURL("/internal/path")).toBeFalsy();
  });
});

jest.mock("@dashboard/config", () => ({
  getAppMountUri: jest.fn(),
  getAppDefaultUri: jest.fn(),
}));

describe("getAppMountUriForRedirect", () => {
  it("should return empty string if URIs match", () => {
    (getAppMountUri as jest.Mock).mockReturnValue("/app");
    (getAppDefaultUri as jest.Mock).mockReturnValue("/app");
    expect(getAppMountUriForRedirect()).toEqual("");
  });

  it("should return the mount URI if URIs do not match", () => {
    (getAppMountUri as jest.Mock).mockReturnValue("/app/mount");
    (getAppDefaultUri as jest.Mock).mockReturnValue("/app");
    expect(getAppMountUriForRedirect()).toEqual("/app/mount");
  });
});
