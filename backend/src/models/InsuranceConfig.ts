import { model, Schema, InferSchemaType } from "mongoose";

const insuranceConfigSchema = new Schema(
  {
    // Coverages
    bonusProtection: Number,
    autoLiabilityUnder30: Number,
    autoLiabilityOverAnd30: Number,
    glassProtection: Number,

    // Discounts/surcharges
    commercialDiscount: Number,
    agentsDiscount: Number,
    agentsDiscountCoveragesNeeded: Number,
    vipDiscount: Number,
    vipDiscountVehiclePower: Number,
    strongCarSurcharge: Number,
    strongCarSurchargeVehiclePower: Number,
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export type InsuranceConfigType = InferSchemaType<typeof insuranceConfigSchema>;

const InsuranceConfig = model<InsuranceConfigType>(
  "InsuranceConfig",
  insuranceConfigSchema
);
export default InsuranceConfig;
