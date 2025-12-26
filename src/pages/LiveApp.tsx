import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';
import type { ComponentConfig } from '../types/builder';

const ComponentRenderer = ({ component }: { component: ComponentConfig }) => {
  switch (component.type) {
    case 'text':
      return <div style={{ padding: '8px', ...component.style }}>{component.props.text}</div>;
    case 'button':
      return (
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: component.style?.backgroundColor || '#3b82f6',
          color: component.style?.color || 'white',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 600,
          ...component.style
        }}>
          {component.props.text}
        </button>
      );
    case 'image':
      return (
        <img 
          src={component.props.src || 'https://via.placeholder.com/300x200'} 
          alt="Placeholder" 
          style={{ width: '100%', borderRadius: '8px', ...component.style }} 
        />
      );
    case 'spacer':
      return <div style={{ height: component.props.height || '20px' }} />;
    default:
      return null;
  }
};

const LiveApp = () => {
  const { id } = useParams();
  const { appConfig, loadProject } = useBuilder();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      try {
        loadProject(id, false);
      } catch (e) {
        console.error("Failed to load project:", e);
        setError("Failed to load project data.");
      }
    }
  }, [id]);

  const activePage = appConfig.pages.find(p => p.id === appConfig.activePageId);

  // Fallback if no page is found (e.g. data not synced) or error occurred
  if (!activePage || error) {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    return (
      <div style={{ 
        padding: '20px', 
        color: 'white', 
        backgroundColor: '#1f1f1f', 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>App Not Found</h2>
        
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '12px', 
          fontSize: '0.95rem',
          maxWidth: '400px',
          marginBottom: '24px'
        }}>
          {!isLocalhost ? (
            <>
              <p style={{ marginBottom: '12px', fontWeight: 600, color: '#fbbf24' }}>
                ⚠️ Domain Mismatch Detected
              </p>
              <p style={{ marginBottom: '12px' }}>
                You likely built your app on <code>localhost</code>, but you are viewing it on a public Tunnel URL.
              </p>
              <p style={{ marginBottom: '0', color: '#9ca3af', fontSize: '0.85rem' }}>
                Browsers do not share saved data between different domains. To fix this, you need to create your app <strong>on this URL</strong>.
              </p>
            </>
          ) : (
            <p>
              We couldn't find the app data for ID: <strong>{id}</strong>. It might have been deleted.
            </p>
          )}
        </div>

        <a 
          href="/"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          Go to Builder (On This URL)
        </a>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: activePage.backgroundColor || 'white',
      color: appConfig.theme.textColor,
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {activePage.components.map(comp => (
        <div key={comp.id} style={{ marginBottom: '12px' }}>
          <ComponentRenderer component={comp} />
        </div>
      ))}
    </div>
  );
};

export default LiveApp;
