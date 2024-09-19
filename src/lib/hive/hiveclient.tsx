import { Client } from "../../lib/hive/dhive/lib"
const dhive = require("../../lib/hive/dhive/lib");

const HiveClient = new Client([
  "https://api.deathwing.me",
  "https://api.hive.blog",
  "https://techcoderx.com",
  "https://anyx.io",
  "https://hive-api.arcange.eu",
  "https://hive-api.3speak.tv",
])


export { dhive };
export default HiveClient
