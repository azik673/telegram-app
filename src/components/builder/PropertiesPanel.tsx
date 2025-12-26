import { useBuilder } from '../../context/BuilderContext';
import { Trash2 } from 'lucide-react';

const PropertiesPanel = () => {
  const { appConfig, selectedComponentId, updateComponent, removeComponent } = useBuilder();

  const activePage = appConfig.pages.find(p => p.id === appConfig.activePageId);
  const selectedComponent = activePage?.components.find(c => c.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <div style={{ padding: 'var(--spacing-lg)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        <p>Select a component to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (key: string, value: any, isStyle = false) => {
    if (isStyle) {
      updateComponent(selectedComponent.id, {
        style: { ...selectedComponent.style, [key]: value }
      });
    } else {
      updateComponent(selectedComponent.id, {
        props: { ...selectedComponent.props, [key]: value }
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Properties</h2>
        <button 
          onClick={() => removeComponent(selectedComponent.id)}
          style={{ 
            color: 'var(--color-error)', 
            padding: '8px', 
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          title="Delete Component"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
          Content
        </h3>
        
        {/* Text Content Input */}
        {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Text</label>
            <input
              type="text"
              value={selectedComponent.props.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>
        )}

        {/* Image Source Input */}
        {selectedComponent.type === 'image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Image URL</label>
            <input
              type="text"
              value={selectedComponent.props.src || ''}
              onChange={(e) => handleChange('src', e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>
        )}
      </div>

      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
          Style
        </h3>

        {/* Text Color */}
        {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Text Color</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="color"
                value={selectedComponent.style?.color || '#000000'}
                onChange={(e) => handleChange('color', e.target.value, true)}
                style={{
                  width: '40px',
                  height: '40px',
                  padding: '0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={selectedComponent.style?.color || '#000000'}
                onChange={(e) => handleChange('color', e.target.value, true)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
          </div>
        )}

        {/* Background Color */}
        {selectedComponent.type === 'button' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Background Color</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="color"
                value={selectedComponent.style?.backgroundColor || '#3b82f6'}
                onChange={(e) => handleChange('backgroundColor', e.target.value, true)}
                style={{
                  width: '40px',
                  height: '40px',
                  padding: '0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={selectedComponent.style?.backgroundColor || '#3b82f6'}
                onChange={(e) => handleChange('backgroundColor', e.target.value, true)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
          </div>
        )}

        {/* Font Size */}
        {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Font Size</label>
            <select
              value={selectedComponent.style?.fontSize || '16px'}
              onChange={(e) => handleChange('fontSize', e.target.value, true)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)'
              }}
            >
              <option value="12px">Small (12px)</option>
              <option value="14px">Medium (14px)</option>
              <option value="16px">Normal (16px)</option>
              <option value="20px">Large (20px)</option>
              <option value="24px">Extra Large (24px)</option>
            </select>
          </div>
        )}

        {/* Alignment */}
        {selectedComponent.type === 'text' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.875rem' }}>Alignment</label>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-bg-tertiary)', padding: '4px', borderRadius: '4px' }}>
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => handleChange('textAlign', align, true)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '4px',
                    backgroundColor: selectedComponent.style?.textAlign === align ? 'var(--color-accent)' : 'transparent',
                    color: selectedComponent.style?.textAlign === align ? 'white' : 'var(--color-text-secondary)',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
