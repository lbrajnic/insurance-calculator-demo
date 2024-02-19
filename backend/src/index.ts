import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import INSURANCE_CONFIG_DEFAULT_VALUES from "./mocks/insuranceConfigMock.js";
import { create as storeInsuranceConfig } from "./services/insurance-config.service.js";

connectDB();
storeInsuranceConfig(INSURANCE_CONFIG_DEFAULT_VALUES);

app.listen(process.env.API_URI_PORT, () => {
  console.log(
    `Server is running at http://localhost:${process.env.API_URI_PORT}`
  );
});
