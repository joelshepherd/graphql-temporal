import * as polyfill from "@js-temporal/polyfill";

declare global {
  namespace Temporal {
    // @ts-ignore
    export = polyfill.Temporal;
  }
}

if (!globalThis.Temporal) {
  globalThis.Temporal = polyfill.Temporal;
}
