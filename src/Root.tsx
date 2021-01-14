import React from "react";
import { hot, setConfig } from "react-hot-loader";

import App from "./App";

setConfig({ logLevel: "debug" });

function Root() {
  return <App />;
}

export default hot(module)(Root);
