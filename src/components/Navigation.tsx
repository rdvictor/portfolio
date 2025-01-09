import React from 'react';
import { FolderTree, FileText, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onPageChange }) => {
  const isActive = (page: string) => activePage === page;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    onPageChange('home');
  };

  return (
    <nav className="nav-container">
      <div className="folder-structure">
        <div className="folder" onClick={scrollToTop}>
          <FolderTree className="inline-block mr-2" size={16} />
          root/
        </div>
        
        <div className="folder-structure">
          <div 
            className={`nav-item file ${isActive('cv') ? 'text-[var(--primary)]' : ''}`}
            onClick={() => onPageChange('cv')}
          >
            <ChevronRight className="inline-block mr-2" size={16} />
            <FileText className="inline-block mr-2" size={16} />
            cv.md
          </div>
          
          <div 
            className={`nav-item file ${isActive('projects') ? 'text-[var(--primary)]' : ''}`}
            onClick={() => onPageChange('projects')}
          >
            <ChevronRight className="inline-block mr-2" size={16} />
            <FileText className="inline-block mr-2" size={16} />
            projects.md
          </div>
          
          <div 
            className={`nav-item file ${isActive('portfolio') ? 'text-[var(--primary)]' : ''}`}
            onClick={() => onPageChange('portfolio')}
          >
            <ChevronRight className="inline-block mr-2" size={16} />
            <FileText className="inline-block mr-2" size={16} />
            portfolio.md
          </div>
          
          <div 
            className={`nav-item file ${isActive('interests') ? 'text-[var(--primary)]' : ''}`}
            onClick={() => onPageChange('interests')}
          >
            <ChevronRight className="inline-block mr-2" size={16} />
            <FileText className="inline-block mr-2" size={16} />
            interests.md
          </div>
          
          <div 
            className={`nav-item file ${isActive('substack') ? 'text-[var(--primary)]' : ''}`}
            onClick={() => onPageChange('substack')}
          >
            <ChevronRight className="inline-block mr-2" size={16} />
            <FileText className="inline-block mr-2" size={16} />
            substack.md
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;