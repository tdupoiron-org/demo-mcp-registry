# MCP Registry

A static registry for Model Context Protocol (MCP) servers, hosted on GitHub Pages.

## API Endpoint

The registry is available at:
```
https://tdupoiron-org.github.io/demo-mcp-registry/v0/servers
```

## Usage

Fetch the server list using curl:
```bash
curl https://tdupoiron-org.github.io/demo-mcp-registry/v0/servers
```

Or use it in your application:
```javascript
fetch('https://tdupoiron-org.github.io/demo-mcp-registry/v0/servers')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Documentation

Visit [https://tdupoiron-org.github.io/demo-mcp-registry/](https://tdupoiron-org.github.io/demo-mcp-registry/) for the full API documentation.

## Registry Structure

The registry follows the [MCP Server Schema](https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json) specification and includes:

- Server metadata (name, description, version)
- Repository information
- Package distributions (npm, Docker, PyPI, NuGet, etc.)
- Environment variables
- Transport configuration

## CORS Support

This API supports Cross-Origin Resource Sharing (CORS) and can be accessed from any domain.
