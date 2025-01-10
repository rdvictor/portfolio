import React, { useState, useEffect } from 'react';
import { FolderTree, FileText, ChevronRight, Menu, X, FolderOpen } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (page: string) => activePage === page;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    onPageChange('home');
    setIsMenuOpen(false);
  };

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg text-[var(--primary)] hover:text-white transition-colors"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Container */}
      <nav 
        className={`
          nav-container
          ${isMobile ? 'mobile-nav' : ''}
          ${isMenuOpen ? 'mobile-nav-open' : ''}
        `}
        id="mobile-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="folder-structure">
          <div 
            className="folder"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            aria-label="Go to home page"
          >
            <FolderTree className="inline-block mr-2" size={16} />
            root/
          </div>
          
          <div className="folder-structure">
            <div 
              className={`nav-item file ${isActive('cv') ? 'text-[var(--primary)]' : ''}`}
              onClick={() => handlePageChange('cv')}
              role="button"
              tabIndex={0}
              aria-label="View CV"
            >
              <ChevronRight className="inline-block mr-2" size={16} />
              <FileText className="inline-block mr-2" size={16} />
              cv.md
            </div>
            
            <div 
              className={`nav-item file ${isActive('projects') ? 'text-[var(--primary)]' : ''}`}
              onClick={() => handlePageChange('projects')}
              role="button"
              tabIndex={0}
              aria-label="View projects"
            >
              <ChevronRight className="inline-block mr-2" size={16} />
              <FileText className="inline-block mr-2" size={16} />
              projects.md
            </div>
            
            <div 
              className={`nav-item file ${isActive('portfolio') ? 'text-[var(--primary)]' : ''}`}
              onClick={() => handlePageChange('portfolio')}
              role="button"
              tabIndex={0}
              aria-label="View portfolio"
            >
              <ChevronRight className="inline-block mr-2" size={16} />
              <FileText className="inline-block mr-2" size={16} />
              portfolio.md
            </div>
            
            <div 
              className={`nav-item file ${isActive('interests') ? 'text-[var(--primary)]' : ''}`}
              onClick={() => handlePageChange('interests')}
              role="button"
              tabIndex={0}
              aria-label="View interests"
            >
              <ChevronRight className="inline-block mr-2" size={16} />
              <FileText className="inline-block mr-2" size={16} />
              interests.md
            </div>
            
            <div 
              className={`nav-item file ${isActive('substack') ? 'text-[var(--primary)]' : ''}`}
              onClick={() => handlePageChange('substack')}
              role="button"
              tabIndex={0}
              aria-label="View blog posts"
            >
              <ChevronRight className="inline-block mr-2" size={16} />
              <FileText className="inline-block mr-2" size={16} />
              substack.md
            </div>

            <div className="folder mt-4">
              <FolderOpen className="inline-block mr-2" size={16} />
              links/
            </div>
            
            <div className="folder-structure space-y-0">
              <div>
                <a 
                  href="https://rocketdaddy.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-item file external glow"
                  aria-label="Visit company website"
                >
                  <ChevronRight className="inline-block mr-2" size={16} />
                  <FileText className="inline-block mr-2" size={16} />
                  company.redirect
                </a>
              </div>

              <div>
                <a 
                  href="https://open.spotify.com/user/fvlse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-item file spotify"
                  aria-label="Visit Spotify profile"
                >
                  <ChevronRight className="inline-block mr-2" size={16} />
                  <FileText className="inline-block mr-2" size={16} />
                  spotify.redirect
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navigation;