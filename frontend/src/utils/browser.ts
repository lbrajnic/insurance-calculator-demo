import { setupWorker } from "msw/browser";
import { handlers } from "../jestSetup";

export const worker = setupWorker(...handlers);

worker.events.on("request:start", ({ request }) => {
  console.log("Outgoing:", request.method, request.url);
});
