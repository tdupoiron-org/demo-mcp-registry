// Function to generate VS Code installation URL
// For Insiders, use 'vscode-insiders' instead of 'vscode'
function generateVSCodeUrl(serverData, isInsiders = false) {
    const protocol = isInsiders ? 'vscode-insiders' : 'vscode';
    
    // Get metadata from _meta
    const publisherProvided = serverData._meta?.['io.modelcontextprotocol.registry/publisher-provided'];
    const githubInfo = publisherProvided?.github;
    
    // Only proceed if we have GitHub metadata
    if (!githubInfo) {
        console.warn('No GitHub metadata found for server:', serverData.name);
        return '#';
    }
    
    // Determine command based on package type
    let command = 'npx';
    let args = ['-y'];
    
    // Get the first package
    const firstPackage = serverData.packages && serverData.packages[0];
    
    if (firstPackage) {
        if (firstPackage.registry_type === 'pypi') {
            command = 'uvx';
            args = [];
        }
        
        // Add package identifier
        args.push(firstPackage.identifier);
    }
    
    // Build manifest using only metadata from _meta
    const manifest = {
        name: serverData.name,
        config: {
            command: command,
            args: args
        }
    };
    
    // Add display name if available
    if (githubInfo.display_name) {
        manifest.displayName = githubInfo.display_name;
    }
    
    // Add description
    if (serverData.description) {
        manifest.description = serverData.description;
    }
    
    // Add publisher (extract from name)
    if (serverData.name) {
        manifest.publisher = serverData.name.split('/')[0];
    }
    
    // Add version
    if (serverData.version) {
        manifest.version = serverData.version;
    }
    
    // Add icon (avatar)
    if (githubInfo.preferred_image || githubInfo.owner_avatar_url) {
        manifest.icon = githubInfo.preferred_image || githubInfo.owner_avatar_url;
    }
    
    // Add license
    if (githubInfo.license) {
        manifest.license = githubInfo.license;
    }
    
    // Add repository URL
    if (serverData.repository?.url) {
        manifest.repository = serverData.repository.url;
    }
    
    // Add homepage
    if (serverData.repository?.url) {
        manifest.homepage = serverData.repository.url;
    }
    
    // Add topics as keywords if available (limit to keep URL size down)
    if (githubInfo.topics && githubInfo.topics.length > 0) {
        manifest.keywords = githubInfo.topics.slice(0, 5);
    }
    
    const url = `${protocol}:mcp/install?${encodeURIComponent(JSON.stringify(manifest))}`;
    console.log(`Generated ${isInsiders ? 'VS Code Insiders' : 'VS Code'} URL:`, url);
    console.log('Manifest:', manifest);

    return url;
}

// Function to create a server tile
function createServerTile(server) {
    const tile = document.createElement('div');
    tile.className = 'server-tile';
    
    // Get metadata from _meta
    const publisherProvided = server._meta?.['io.modelcontextprotocol.registry/publisher-provided'];
    const githubInfo = publisherProvided?.github;
    
    const header = document.createElement('div');
    header.className = 'server-header';
    
    // Add avatar if available
    const avatarUrl = githubInfo?.preferred_image || githubInfo?.owner_avatar_url;
    if (avatarUrl) {
        const avatar = document.createElement('img');
        avatar.className = 'server-avatar';
        avatar.src = avatarUrl;
        avatar.alt = githubInfo?.display_name || server.name;
        avatar.onerror = function() {
            this.style.display = 'none';
        };
        header.appendChild(avatar);
    }
    
    // Create info container
    const info = document.createElement('div');
    info.className = 'server-info';
    
    const name = document.createElement('div');
    name.className = 'server-name';
    name.textContent = githubInfo?.display_name || server.name;
    
    const repo = document.createElement('div');
    repo.className = 'server-repo';
    repo.textContent = server.name;
    
    info.appendChild(name);
    info.appendChild(repo);
    header.appendChild(info);
    
    const description = document.createElement('div');
    description.className = 'server-description';
    description.textContent = server.description || 'No description available';
    
    const meta = document.createElement('div');
    meta.className = 'server-meta';
    
    const versionBadge = document.createElement('span');
    versionBadge.className = 'meta-badge version';
    versionBadge.textContent = `v${server.version}`;
    
    const statusBadge = document.createElement('span');
    statusBadge.className = 'meta-badge status';
    statusBadge.textContent = server.status || 'active';
    
    meta.appendChild(versionBadge);
    meta.appendChild(statusBadge);
    
    // Add package type badges
    if (server.packages && server.packages.length > 0) {
        server.packages.forEach(pkg => {
            const pkgBadge = document.createElement('span');
            pkgBadge.className = 'meta-badge';
            pkgBadge.textContent = pkg.registry_type;
            meta.appendChild(pkgBadge);
        });
    }
    
    const installButtons = document.createElement('div');
    installButtons.className = 'install-buttons';
    
    const vscodeBtn = document.createElement('a');
    vscodeBtn.className = 'install-btn vscode';
    vscodeBtn.textContent = '📦 Install in VS Code';
    vscodeBtn.href = generateVSCodeUrl(server, false);
    vscodeBtn.title = 'Install in VS Code';
    
    const insidersBtn = document.createElement('a');
    insidersBtn.className = 'install-btn insiders';
    insidersBtn.textContent = '🚀 Install in Insiders';
    insidersBtn.href = generateVSCodeUrl(server, true);
    insidersBtn.title = 'Install in VS Code Insiders';
    
    installButtons.appendChild(vscodeBtn);
    installButtons.appendChild(insidersBtn);
    
    header.appendChild(name);
    tile.appendChild(header);
    tile.appendChild(description);
    tile.appendChild(meta);
    tile.appendChild(installButtons);
    
    return tile;
}

// Function to create stats display
function createStats(servers) {
    const statsContainer = document.getElementById('stats-container');
    
    // Clear any existing stats before creating new ones
    statsContainer.innerHTML = '';
    
    const stats = document.createElement('div');
    stats.className = 'stats';
    
    const totalServers = document.createElement('div');
    totalServers.className = 'stat-item';
    totalServers.innerHTML = `
        <div class="stat-number">${servers.length}</div>
        <div class="stat-label">MCP Servers</div>
    `;
    
    const activeServers = servers.filter(s => s.status === 'active').length;
    const activeStats = document.createElement('div');
    activeStats.className = 'stat-item';
    activeStats.innerHTML = `
        <div class="stat-number">${activeServers}</div>
        <div class="stat-label">Active</div>
    `;
    
    stats.appendChild(totalServers);
    stats.appendChild(activeStats);
    statsContainer.appendChild(stats);
}

// Load and display servers
async function loadServers(versionFilter = 'all') {
    const container = document.getElementById('servers-container');
    
    try {
        // Determine which versions to fetch based on filter
        const fetchPromises = [];
        const versions = [];
        
        if (versionFilter === 'all' || versionFilter === 'v0') {
            fetchPromises.push(fetch('v0/servers'));
            versions.push('v0');
        }
        
        const responses = await Promise.all(fetchPromises);
        
        // Collect all servers from fetched versions
        let allServers = [];
        
        for (let i = 0; i < responses.length; i++) {
            const response = responses[i];
            const version = versions[i];
            
            if (response.ok) {
                const data = await response.json();
                const servers = data.servers || [];
                allServers = allServers.concat(servers.map(s => ({ ...s, _source: version })));
            }
        }
        
        // If no servers from any source, show error
        if (allServers.length === 0) {
            container.innerHTML = '<div class="error">No servers found in the registry.</div>';
            return;
        }
        
        // Remove duplicates based on server name
        const serverMap = new Map();
        allServers.forEach(server => {
            const existing = serverMap.get(server.name);
            if (!existing) {
                serverMap.set(server.name, server);
            }
        });
        
        const servers = Array.from(serverMap.values());
        
        // Create stats
        createStats(servers);
        
        // Clear loading message
        container.innerHTML = '';
        container.className = 'servers-grid';
        
        // Create tiles for each server
        servers.forEach(server => {
            const tile = createServerTile(server);
            container.appendChild(tile);
        });
        
    } catch (error) {
        console.error('Error loading servers:', error);
        container.innerHTML = `
            <div class="error">
                <strong>Error loading servers:</strong> ${error.message}
            </div>
        `;
    }
}

// Load servers when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadServers();
    
    // Add event listener to version selector
    const versionSelect = document.getElementById('version-select');
    if (versionSelect) {
        versionSelect.addEventListener('change', (e) => {
            const container = document.getElementById('servers-container');
            container.className = 'loading';
            container.innerHTML = 'Loading MCP servers...';
            loadServers(e.target.value);
        });
    }
});
