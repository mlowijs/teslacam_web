import { getConfiguration } from "./Configuration";
import WebServer from "./WebServer";

const config = getConfiguration();

const webServer = new WebServer(config);
webServer.start();