import * as polyfill from "proposal-temporal";

declare global {
  namespace Temporal {
    // @ts-ignore
    export = polyfill.Temporal;
  }
}

if (!globalThis.Temporal) {
  globalThis.Temporal = polyfill.Temporal;
}
