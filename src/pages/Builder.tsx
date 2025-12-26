
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Builder: React.FC = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--spacing-sm)', 
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--spacing-lg)',
        width: 'fit-content'
      }}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>
      <h1>App Builder</h1>
      <p>Editing App ID: {id}</p>
      <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
        Builder interface coming soon...
      </p>
    </div>
  );
};

export default Builder;
