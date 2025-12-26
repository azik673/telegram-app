import { X, ExternalLink, Copy, Check, Globe } from 'lucide-react';
import { useState } from 'react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  appId: string;
}

const ConnectModal = ({ isOpen, onClose, appId }: ConnectModalProps) => {
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  
  // Use custom domain if provided, otherwise fallback to current origin
  const baseUrl = customDomain || window.location.origin;
  const appUrl = `${baseUrl}/app/${appId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        width: '500px',
        maxWidth: '90vw',
        border: '1px solid var(--color-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Connect to Telegram</h2>
          <button 
            onClick={onClose}
            style={{ color: 'var(--color-text-secondary)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--spacing-lg)' }}>
          
          {/* Tunnel Setup Helper */}
          <div style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3b82f6', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} />
              Running Locally?
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              To test on Telegram, you need a public URL. Run this command in your terminal:
            </p>
            <div style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)', 
              padding: '8px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <code>npx -y localtunnel --port 5173</code>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>
                Paste the URL you get here (e.g., https://heavy-zebra-42.loca.lt):
              </label>
              <input 
                type="text" 
                placeholder="https://..."
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.875rem'
                }}
              />
              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--color-warning)' }}>
                <strong>Asking for a password?</strong> The password is your IP address. 
                <a href="https://ipv4.icanhazip.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', marginLeft: '4px' }}>
                  Click here to get it
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-xs)'
            }}>
              Your App URL for BotFather
            </label>
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              backgroundColor: 'var(--color-bg-tertiary)',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <input 
                readOnly
                value={appUrl}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.875rem'
                }}
              />
              <button 
                onClick={handleCopy}
                style={{ 
                  color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Instructions</h3>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 600,
                flexShrink: 0
              }}>1</div>
              <div>
                <p style={{ marginBottom: '4px' }}>Open <strong>@BotFather</strong> on Telegram</p>
                <a 
                  href="https://t.me/BotFather" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Open BotFather <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 600,
                flexShrink: 0
              }}>2</div>
              <div>
                <p style={{ marginBottom: '4px' }}>Create a new bot with <code>/newbot</code></p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Follow the prompts to name your bot.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 600,
                flexShrink: 0
              }}>3</div>
              <div>
                <p style={{ marginBottom: '4px' }}>Link your app with <code>/newapp</code></p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Select your bot, then paste the <strong>App URL</strong> above when asked for the Web App URL.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
