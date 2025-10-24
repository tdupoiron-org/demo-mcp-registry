# MCP Registry

A static registry for Model Context Protocol (MCP) servers, hosted on GitHub Pages. Browse and install MCP servers directly from the web interface or integrate with the API.

## 🌐 Web Interface

Visit the interactive registry at:
**[https://tdupoiron-org.github.io/demo-mcp-registry/](https://tdupoiron-org.github.io/demo-mcp-registry/)**

Features:
- 📦 Browse available MCP servers with rich metadata
- 🔗 One-click installation for VS Code and VS Code Insiders
- 📊 Real-time server statistics
- 🔄 Multi-version support (v0, v0.1)
- 📱 Responsive design for all devices

## 📡 API Endpoints

### Current Version (v0.1)
```
https://tdupoiron-org.github.io/demo-mcp-registry/v0.1/servers
```

### Legacy Version (v0)
```
https://tdupoiron-org.github.io/demo-mcp-registry/v0/servers
```

## 🚀 Quick Installation

### VS Code / VS Code Insiders
Use the one-click install buttons available on each server in the web interface, or manually configure using the API data.

### API Usage

Fetch the server list using curl:
```bash
# Get latest servers (v0.1)
curl https://tdupoiron-org.github.io/demo-mcp-registry/v0.1/servers

# Get legacy servers (v0)
curl https://tdupoiron-org.github.io/demo-mcp-registry/v0/servers
```

Or use it in your application:
```javascript
// Fetch latest servers
fetch('https://tdupoiron-org.github.io/demo-mcp-registry/v0.1/servers')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📈 What's New in v0.1

### Enhanced Server Data
- **Rich Metadata**: Extended server information including GitHub repository details, README content, and publisher information
- **Avatar Support**: Server tiles now display organization/publisher avatars for better visual identification
- **Enhanced Descriptions**: More detailed server descriptions and metadata
- **Remote Endpoints**: Support for remote MCP servers with SSE transport

### Featured Servers in v0.1
- **GitHub MCP Server**: Official GitHub integration with comprehensive repository management capabilities
- **Notion MCP Server**: Official Notion API integration for seamless workspace management  
- **Atlassian MCP Server**: Remote MCP server connecting Jira and Confluence with OAuth 2.1 security

### Web Interface Improvements
- **VS Code Integration**: One-click installation buttons for both VS Code and VS Code Insiders
- **Version Selector**: Switch between different registry versions (v0, v0.1, or view all)
- **Enhanced UI**: Modern, responsive design with improved server tiles and metadata display
- **Statistics Dashboard**: Real-time count of available and active servers

### API Enhancements
- **Versioned Endpoints**: Support for multiple API versions with backward compatibility
- **Extended Schema**: Updated to MCP Server Schema 2025-07-09 with richer metadata structure
- **CORS Support**: Full cross-origin resource sharing support for web applications

## 🏗️ Registry Structure

The registry follows the [MCP Server Schema](https://static.modelcontextprotocol.io/schemas/2025-07-09/server.schema.json) specification and includes:

- **Server Metadata**: Name, description, version, status
- **Repository Information**: GitHub integration with README, topics, and statistics  
- **Package Distributions**: Support for npm, Docker, PyPI, NuGet, and more
- **Remote Endpoints**: SSE transport configuration for remote servers
- **Publisher Data**: Organization details, avatars, and branding
- **Environment Configuration**: Required environment variables and setup instructions

## 🔒 CORS Support

This API supports Cross-Origin Resource Sharing (CORS) and can be accessed from any domain.

## 🤝 Contributing

This is a demo registry showcasing MCP server registration and discovery patterns. For production registries, consider:

- Authentication and authorization mechanisms
- Rate limiting and API quotas  
- Server validation and security scanning
- Automated testing and CI/CD integration
- Monitoring and analytics capabilities

## 📝 License

This project is open source and available under the MIT License.
