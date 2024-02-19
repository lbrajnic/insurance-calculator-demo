import request from "supertest";
import app from "../../src/app";
import Insurance from "../../src/models/Insurance";
import type { InsuranceType } from "../../src/models/Insurance";
import "../initialize-test-database";

const insuranceMock = {
  customerName: "Luka",
  birthdate: "2024-02-10",
  city: "Zagreb",
  vehiclePower: 110,
  voucher: 0,
  activeCoverages: [],
  activeDiscounts: ["strongCarSurcharge"],
  insuranceConfig: {
    bonusProtection: 0.12,
    autoLiabilityUnder30: 55,
    autoLiabilityOverAnd30: 105,
    glassProtection: 0.8,
    commercialDiscount: 0.1,
    agentsDiscount: 0.2,
    agentsDiscountCoveragesNeeded: 2,
    vipDiscount: 0.05,
    vipDiscountVehiclePower: 80,
    strongCarSurcharge: 0.1,
    strongCarSurchargeVehiclePower: 100,
  },
  totalPrice: 143,
  insuranceCalculations: {
    basePrice: 130,
    totalPrice: 143,
    bonusProtection: 0,
    autoLiability: 0,
    glassProtection: 0,
    commercialDiscount: 0,
    agentsDiscount: 0,
    vipDiscount: 0,
    strongCarSurcharge: 13,
    voucher: 0,
  },
};

describe("Insurance Controller", () => {
  describe("create insurance", () => {
    it("should create insurance and return status code 200", async () => {
      const response = await request(app)
        .post("/insurances")
        .set("content-type", "application/json")
        .send(insuranceMock);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("totalPrice");
    });
  });

  describe("get all insurances", () => {
    beforeEach(async () => {
      await Insurance.create({
        customerName: "Luka",
      });
      await Insurance.create({
        customerName: "Pero",
      });
    });

    it("should return all insurances and status code 200", async () => {
      const response = await request(app)
        .get("/insurances")
        .set("content-type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty("customerName");
    });
  });

  describe("get an insurance", () => {
    let insurance: InsuranceType;
    beforeEach(async () => {
      insurance = await Insurance.create({
        customerName: "Luka",
      });
    });

    it("should return 404 if the insurance doesn't exist", async () => {
      const fakeInsuranceId = "65d24728g299e40aa9b38e58";
      const response = await request(app).patch(
        `/insurances/${fakeInsuranceId}`
      );

      expect(response.status).toBe(404);
    });

    it("should return a single insurance and status code 200", async () => {
      const response = await request(app)
        .get(`/insurances/${insurance._id}`)
        .set("content-type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("customerName");
    });
  });

  describe("update an insurance", () => {
    let insurance: InsuranceType;

    beforeEach(async () => {
      insurance = await Insurance.create(insuranceMock);
    });

    it("should return the updated insurance and status code 200", async () => {
      const insuranceMockModified = {
        ...insuranceMock,
        customerName: "Lukaaaa",
      };

      const response = await request(app)
        .put(`/insurances/${insurance._id}`)
        .send(insuranceMockModified);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("customerName");
      expect(response.body.customerName).toBe("Lukaaaa");
    });
  });

  describe("delete an insurance", () => {
    let insurance: InsuranceType;
    beforeEach(async () => {
      insurance = await Insurance.create(insuranceMock);
    });

    it("should return 200 and the deleted insurance", async () => {
      const response = await request(app).delete(
        `/insurances/${insurance._id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("customerName");
    });
  });
});
