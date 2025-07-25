import { MemoryStorage, PaidMcpServer } from "@getalby/paidmcp";
import { registerGetWeatherTool } from "./tools/get_weather.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const storage = new MemoryStorage();

export function createMcpServer(): McpServer {
  if (!process.env.NWC_URL) {
    throw new Error("No NWC URL set");
  }

  const server = new PaidMcpServer(
    {
      name: "@getalby/weather-mcp",
      version: "1.0.0",
      title: "Weather MCP Server",
    },
    { nwcUrl: process.env.NWC_URL, storage }
  );

  registerGetWeatherTool(server);

  return server;
}
