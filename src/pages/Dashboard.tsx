
import { useState, useEffect } from 'react';
import { Plus, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { AppConfig } from '../types/builder';

const Dashboard = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppConfig[]>([]);

  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
    setApps(savedApps);
  }, []);

  const handleCreateNew = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    navigate(`/builder/${newId}`);
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
      </header>

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
