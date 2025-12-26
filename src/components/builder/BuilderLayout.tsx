import { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import MobilePreview from '../preview/MobilePreview';
import PropertiesPanel from './PropertiesPanel';
import ConnectModal from './ConnectModal';
import { Type, Image as ImageIcon, Square, ArrowLeft, Save, Globe, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { ComponentType } from '../../types/builder';

const BuilderLayout = () => {
  const { id } = useParams();
  const { addComponent, saveProject, loadProject } = useBuilder();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const handleAddComponent = (type: ComponentType) => {
    const newComponent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      props: type === 'text' ? { text: 'New Text Block' } : 
             type === 'button' ? { text: 'Click Me' } : 
             type === 'image' ? { src: '' } : 
             { height: '20px' },
      style: {
        fontSize: '16px',
        textAlign: 'left',
        color: type === 'button' ? '#ffffff' : '#000000',
        backgroundColor: type === 'button' ? '#3b82f6' : 'transparent'
      }
    };
    addComponent(newComponent);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f0f12' }}>
      <ConnectModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
        appId={id || ''} 
      />

      {/* Left Sidebar - Components */}
      <div style={{
        width: '300px',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-secondary)'
      }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)', 
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '0.875rem'
          }}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Components</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                to={`/app/${id}`}
                target="_blank"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
                title="Open Live App"
              >
                <ExternalLink size={16} />
              </Link>
              <button
                onClick={() => setIsConnectModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
                title="Connect to Telegram"
              >
                <Globe size={16} />
              </button>
              <button
                onClick={saveProject}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-success)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Click to add to your app</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
          <button 
            onClick={() => handleAddComponent('text')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Type size={24} />
            <span style={{ fontSize: '0.875rem' }}>Text</span>
          </button>
          
          <button 
            onClick={() => handleAddComponent('button')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Square size={24} />
            <span style={{ fontSize: '0.875rem' }}>Button</span>
          </button>

          <button 
            onClick={() => handleAddComponent('image')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              transition: 'var(--transition-fast)'
            }}
          >
            <ImageIcon size={24} />
            <span style={{ fontSize: '0.875rem' }}>Image</span>
          </button>
        </div>
      </div>

      {/* Center - Preview */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <MobilePreview />
      </div>

      {/* Right Sidebar - Properties */}
      <div style={{
        width: '300px',
        borderLeft: '1px solid var(--color-border)',
        padding: 'var(--spacing-lg)',
        backgroundColor: 'var(--color-bg-secondary)',
        overflowY: 'auto'
      }}>
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default BuilderLayout;
