import { model, Schema } from "mongoose";

export interface InsuranceType {
  _id: string | Schema.Types.ObjectId;
  customerName: string;
  birthdate: Date;
  city: string;
  vehiclePower: number;
  voucher: number;
  priceMatch: number;
  activeDiscounts: string[];
  activeCoverages: string[];
  totalPrice: number;
  insuranceCalculations: {
    basePrice: number;
    totalPrice: number;
    agentsDiscount: number;
    autoLiability: number;
    bonusProtection: number;
    commercialDiscount: number;
    glassProtection: number;
    priceMatch: number;
    vipDiscount: number;
    strongCarSurcharge: number;
    voucher: number;
  };
}

const insuranceSchema = new Schema(
  {
    customerName: String,
    birthdate: Date,
    city: String,
    vehiclePower: Number,
    voucher: { type: Number, default: 0 },
    priceMatch: Number,
    activeDiscounts: [String],
    activeCoverages: [String],
    totalPrice: Number,
    insuranceCalculations: {
      basePrice: Number,
      totalPrice: Number,
      agentsDiscount: Number,
      autoLiability: Number, // AO+
      bonusProtection: Number,
      commercialDiscount: Number,
      glassProtection: Number,
      priceMatch: Number,
      vipDiscount: Number,
      strongCarSurcharge: Number,
      voucher: { type: Number, default: 0 },
    },
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

const Insurance = model<InsuranceType>("Insurance", insuranceSchema);
export default Insurance;
