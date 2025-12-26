
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, Layers, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-sm)', 
          marginBottom: 'var(--spacing-xl) * 2',
          color: 'var(--color-accent)',
          fontWeight: 700,
          fontSize: '1.25rem'
        }}>
          <Layers size={28} />
          <span>MiniApp Builder</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <NavLink to="/" style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
            fontWeight: 500,
            transition: 'var(--transition-fast)'
          })}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          
          <NavLink to="/settings" style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
            fontWeight: 500,
            transition: 'var(--transition-fast)'
          })}>
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>

        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          padding: '0.75rem 1rem',
          color: 'var(--color-text-tertiary)',
          marginTop: 'auto',
          fontWeight: 500
        }}>
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
