import { http, HttpResponse, delay } from "msw";
import mockedInsurances from "./utils/mockedInsurances";
import { INSURANCES_API_ENDPOINT } from "./utils/constants";

export const handlers = [
  http.post(`${INSURANCES_API_ENDPOINT}/insurances`, async () => {
    await delay(150);
    return HttpResponse.json(mockedInsurances[0]);
  }),
  http.get(`${INSURANCES_API_ENDPOINT}/insurances`, async () => {
    await delay(150);
    return HttpResponse.json(mockedInsurances);
  }),
  http.get(`${INSURANCES_API_ENDPOINT}/insurances/:id`, async () => {
    await delay(150);
    return HttpResponse.json(mockedInsurances[0]);
  }),
  http.put(`${INSURANCES_API_ENDPOINT}/insurances/:id`, async () => {
    await delay(150);
    return HttpResponse.json(mockedInsurances[0]);
  }),
];
