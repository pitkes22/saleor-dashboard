import { RefreshLimitsQuery } from "@dashboard/graphql";

import { hasLimits, isLimitReached } from "./limits";

const mockLimits: RefreshLimitsQuery["shop"]["limits"] = {
  __typename: "LimitInfo",
  allowedUsage: {
    __typename: "Limits",
    channels: 5, // Example values
    orders: 10,
    productVariants: null,
    staffUsers: 3,
    warehouses: 2,
  },
  currentUsage: {
    __typename: "Limits",
    channels: 5, // Example values
    orders: 20,
    productVariants: null,
    warehouses: 2,
  },
};

describe("hasLimits", () => {
  it("should return false if limits is undefined", () => {
    expect(hasLimits(undefined, "productVariants")).toBe(false);
  });

  it("should return true if the limit key exists and is not null", () => {
    expect(hasLimits(mockLimits, "staffUsers")).toBe(true);
  });

  it("should return false if the limit key is null", () => {
    expect(hasLimits(mockLimits, "productVariants")).toBe(false);
  });
});

describe("isLimitReached", () => {
  it("should return false if limits are undefined", () => {
    expect(isLimitReached(undefined, "orders")).toBe(false);
  });

  it("should return false if the limit has not been reached", () => {
    expect(isLimitReached(mockLimits, "productVariants")).toBe(false);
  });

  it("should return false if there is no limit set (null)", () => {
    expect(isLimitReached(mockLimits, "productVariants")).toBe(false);
  });

  it("should return true if the limit has been reached or exceeded", () => {
    expect(isLimitReached(mockLimits, "orders")).toBe(true);
  });

  it("should return false if the key is not in neither currentUsage allowedUsage", () => {
    expect(isLimitReached(mockLimits, "productVariants")).toBe(false);
  });
});
