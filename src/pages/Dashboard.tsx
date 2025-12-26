
import { useState, useEffect } from 'react';
import { Plus, Smartphone, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';
import type { AppConfig } from '../types/builder';

const Dashboard = () => {
  const navigate = useNavigate();
  const { importProject } = useBuilder();
  const [apps, setApps] = useState<AppConfig[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importCode, setImportCode] = useState('');

  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
    setApps(savedApps);
  }, []);

  const handleCreateNew = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    navigate(`/builder/${newId}`);
  };

  const handleImport = () => {
    try {
      const config = JSON.parse(importCode);
      if (!config.id || !config.pages) {
        throw new Error('Invalid project configuration');
      }
      importProject(config);
      setShowImportModal(false);
      setImportCode('');
      // Refresh list
      const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
      setApps(savedApps);
    } catch (e) {
      alert('Invalid code! Please copy the full code from the Export button.');
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 'var(--spacing-xl)' 
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>My Apps</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage your Telegram Mini Apps</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowImportModal(true)}
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontWeight: 600,
              transition: 'var(--transition-fast)'
            }}
          >
            <Download size={20} />
            Import App
          </button>
          <button 
            onClick={handleCreateNew}
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontWeight: 600,
              transition: 'var(--transition-fast)'
            }}
          >
            <Plus size={20} />
            Create New App
          </button>
        </div>
      </header>

      {showImportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '24px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Import App</h3>
            <p style={{ marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
              Paste the code you copied from the "Export" button on your computer.
            </p>
            <textarea
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              placeholder='Paste code here...'
              style={{
                width: '100%',
                height: '150px',
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px',
                color: 'white',
                marginBottom: '16px',
                fontFamily: 'monospace'
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowImportModal(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                style={{
                  padding: '8px 24px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {apps.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-xl)',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--color-border)'
        }}>
          <p>No apps yet. Click "Create New App" to get started!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}>
          {apps.map(app => (
            <div key={app.id} style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-lg)',
              border: '1px solid var(--color-border)',
              transition: 'var(--transition-normal)',
              cursor: 'pointer'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-md)', 
                marginBottom: 'var(--spacing-md)' 
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)'
                }}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600 }}>{app.name}</h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                    ID: {app.id}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <Link to={`/builder/${app.id}`} style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.5rem',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  Edit
                </Link>
                <button style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)'
                }}>
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
