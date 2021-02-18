import { Client } from "discord.js";
import { DISCORD_TOKEN } from "./credentials";

const client = new Client();

client.token = DISCORD_TOKEN;

export default client;
