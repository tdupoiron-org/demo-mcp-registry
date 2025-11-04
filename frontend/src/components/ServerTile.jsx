// Generate VS Code installation URL
const generateVSCodeUrl = (serverData, isInsiders = false) => {
  const protocol = isInsiders ? 'vscode-insiders' : 'vscode';
  
  const publisherProvided = serverData.meta?.['io.modelcontextprotocol.registry/publisher-provided'];
  const githubInfo = publisherProvided?.github;
  
  if (!githubInfo) {
    console.warn('No GitHub metadata found for server:', serverData.name);
    return '#';
  }
  
  let command = 'npx';
  let args = ['-y'];
  
  const firstPackage = serverData.packages && serverData.packages[0];
  
  if (firstPackage) {
    if (firstPackage.registry_type === 'pypi') {
      command = 'uvx';
      args = [];
    }
    args.push(firstPackage.identifier);
  }
  
  const manifest = {
    name: serverData.name,
    config: {
      command: command,
      args: args
    }
  };
  
  if (githubInfo.display_name) {
    manifest.displayName = githubInfo.display_name;
  }
  
  if (serverData.description) {
    manifest.description = serverData.description;
  }
  
  if (serverData.name) {
    manifest.publisher = serverData.name.split('/')[0];
  }
  
  if (serverData.version) {
    manifest.version = serverData.version;
  }
  
  if (githubInfo.owner_avatar_url) {
    manifest.icon = githubInfo.owner_avatar_url;
  }
  
  const encodedManifest = btoa(JSON.stringify(manifest));
  return `${protocol}://modelcontextprotocol.install-server?manifestBase64=${encodedManifest}`;
};

const ServerTile = ({ server }) => {
  const publisherProvided = server.meta?.['io.modelcontextprotocol.registry/publisher-provided'];
  const githubInfo = publisherProvided?.github;
  const avatarUrl = githubInfo?.owner_avatar_url || '';
  const displayName = githubInfo?.display_name || server.name;
  const firstPackage = server.packages && server.packages[0];

  return (
    <div className="server-tile" style={{
      background: 'var(--card-bg)',
      border: '2px solid var(--card-border)',
      borderRadius: '12px',
      padding: '24px',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${displayName} logo`}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '4px',
            wordBreak: 'break-word',
          }}>
            {displayName}
          </h3>
          <p style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            wordBreak: 'break-word',
          }}>
            {server.name}
          </p>
        </div>
      </div>

      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        minHeight: '60px',
      }}>
        {server.description || 'No description available'}
      </p>

      {firstPackage && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '4px 12px',
            background: 'linear-gradient(135deg, var(--badge-bg-start), var(--badge-bg-end))',
            border: '1px solid var(--badge-border)',
            borderRadius: '20px',
            fontSize: '12px',
            color: 'var(--badge-text)',
            fontWeight: '500',
          }}>
            {firstPackage.registry_type || 'npm'}
          </span>
          {server.version && (
            <span style={{
              padding: '4px 12px',
              background: 'linear-gradient(135deg, var(--badge-bg-start), var(--badge-bg-end))',
              border: '1px solid var(--badge-border)',
              borderRadius: '20px',
              fontSize: '12px',
              color: 'var(--badge-text)',
              fontWeight: '500',
            }}>
              v{server.version}
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <a
          href={generateVSCodeUrl(server, false)}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
          }}
        >
          Install in VS Code
        </a>
        <a
          href={generateVSCodeUrl(server, true)}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: 'var(--badge-bg-start)',
            color: 'var(--badge-text)',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            border: '2px solid var(--badge-border)',
            transition: 'all 0.2s ease',
          }}
        >
          Insiders
        </a>
      </div>
    </div>
  );
};

export default ServerTile;
