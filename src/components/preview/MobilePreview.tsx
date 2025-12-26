import { useBuilder } from '../../context/BuilderContext';
import type { ComponentConfig } from '../../types/builder';

const ComponentRenderer = ({ 
  component, 
  isSelected, 
  onSelect 
}: { 
  component: ComponentConfig; 
  isSelected: boolean; 
  onSelect: (id: string) => void;
}) => {
  const baseStyle = {
    cursor: 'pointer',
    border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const renderContent = () => {
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
            pointerEvents: 'none', // Prevent button click from interfering with selection
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

  return (
    <div onClick={handleClick} style={baseStyle}>
      {renderContent()}
    </div>
  );
};

const MobilePreview = () => {
  const { appConfig, selectedComponentId, selectComponent } = useBuilder();
  const activePage = appConfig.pages.find(p => p.id === appConfig.activePageId);

  return (
    <div 
      onClick={() => selectComponent(null)} // Deselect when clicking background
      style={{
        width: '375px',
        height: '812px',
        backgroundColor: 'white',
        borderRadius: '40px',
        border: '12px solid #1f1f1f',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150px',
        height: '30px',
        backgroundColor: '#1f1f1f',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        zIndex: 10
      }} />

      {/* Status Bar Area */}
      <div style={{ height: '44px', backgroundColor: activePage?.backgroundColor || 'white', width: '100%', flexShrink: 0 }} />

      {/* App Content */}
      <div style={{
        flex: 1,
        backgroundColor: activePage?.backgroundColor || 'white',
        color: appConfig.theme.textColor,
        padding: '16px',
        overflowY: 'auto'
      }}>
        {activePage?.components.map(comp => (
          <div key={comp.id} style={{ marginBottom: '12px' }}>
            <ComponentRenderer 
              component={comp} 
              isSelected={selectedComponentId === comp.id}
              onSelect={selectComponent}
            />
          </div>
        ))}
        {activePage?.components.length === 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            color: '#9ca3af',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            Drag components here or click to add
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
