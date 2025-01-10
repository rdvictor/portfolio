import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import LoadingScreen from './components/LoadingScreen';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [displayedPage, setDisplayedPage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleMenuOpen = (e: CustomEvent) => {
      document.body.classList.toggle('menu-open', e.detail.isOpen);
    };

    window.addEventListener('menuToggle', handleMenuOpen as EventListener);
    return () => window.removeEventListener('menuToggle', handleMenuOpen as EventListener);
  }, []);

  const handlePageChange = (newPage: string) => {
    if (newPage === activePage) return;
    
    setIsVisible(false);
    
    setTimeout(() => {
      setDisplayedPage(newPage);
      setActivePage(newPage);
      
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 300);
  };

  return (
    <>
      <LoadingScreen />
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 bg-[var(--background)] -z-10" />
        <Navigation activePage={activePage} onPageChange={handlePageChange} />
        
        <main className={`content-area ${isVisible ? 'visible' : ''}`}>
          {displayedPage === 'home' && (
            <section className="section flex flex-col justify-center items-center min-h-screen">
              <Terminal className="w-16 h-16 mb-6 text-[var(--primary)]" />
              <h1 className="text-4xl md:text-6xl mb-4 text-center">
                <span className="text-[var(--primary)]">Hello</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl opacity-80">
                I'm Victor. I build stuff.
                <br />
                Let's build together<span className="cursor-blink">_</span>
              </p>
              
              <div className="flex gap-6">
                <a href="https://github.com/rdvictor" target="_blank" rel="noopener noreferrer" className="nav-item">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/victor-cordiano-jr-2b7b3317a/" target="_blank" rel="noopener noreferrer" className="nav-item">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:victor@rocketdaddy.ai" className="nav-item">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </section>
          )}

          {displayedPage === 'cv' && (
            <section className="section p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--primary)]">CV</h2>
              <div className="timeline-item">
                <h3 className="text-xl text-[var(--secondary)]">Senior Software Engineer @ Tech Innovations Inc.</h3>
                <p className="text-sm opacity-60">2020 - Present</p>
                <p className="mt-2">Led development of cloud-native applications and microservices architecture. Implemented CI/CD pipelines and mentored junior developers.</p>
              </div>
              <div className="timeline-item">
                <h3 className="text-xl text-[var(--secondary)]">Full Stack Developer @ Digital Solutions Ltd.</h3>
                <p className="text-sm opacity-60">2018 - 2020</p>
                <p className="mt-2">Developed scalable web applications using React and Node.js. Improved application performance by 40% through optimization.</p>
              </div>
              <div className="timeline-item">
                <h3 className="text-xl text-[var(--secondary)]">Software Developer @ WebTech Corp</h3>
                <p className="text-sm opacity-60">2016 - 2018</p>
                <p className="mt-2">Built responsive web applications and implemented RESTful APIs. Collaborated with UX team to improve user experience.</p>
              </div>
            </section>
          )}

          {displayedPage === 'projects' && (
            <section className="section p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--primary)]">Projects</h2>
              <div className="project-card">
                <h3 className="text-xl text-[var(--secondary)]">Quantum Cloud Platform</h3>
                <p className="mt-2">A revolutionary cloud infrastructure management platform leveraging quantum computing principles for enhanced security and performance.</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Rust</span>
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">WebAssembly</span>
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Kubernetes</span>
                </div>
              </div>
              <div className="project-card">
                <h3 className="text-xl text-[var(--secondary)]">Neural Network Visualizer</h3>
                <p className="mt-2">Interactive 3D visualization tool for neural networks, helping developers understand and debug AI models.</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Three.js</span>
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">TensorFlow.js</span>
                  <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">WebGL</span>
                </div>
              </div>
            </section>
          )}

          {displayedPage === 'portfolio' && (
            <section className="section p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--primary)]">Technical Skills</h2>
              <div className="tech-list">
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">Frontend Development</h3>
                  <ul className="space-y-2">
                    <li>React & Next.js</li>
                    <li>Vue.js & Nuxt</li>
                    <li>TypeScript</li>
                    <li>WebGL & Three.js</li>
                  </ul>
                </div>
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">Backend Development</h3>
                  <ul className="space-y-2">
                    <li>Node.js & Deno</li>
                    <li>Rust & Go</li>
                    <li>GraphQL</li>
                    <li>PostgreSQL & MongoDB</li>
                  </ul>
                </div>
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">DevOps & Cloud</h3>
                  <ul className="space-y-2">
                    <li>AWS & GCP</li>
                    <li>Docker & Kubernetes</li>
                    <li>Terraform</li>
                    <li>CI/CD Pipelines</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {displayedPage === 'interests' && (
            <section className="section p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--primary)]">Research Interests</h2>
              <div className="tech-list">
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">Quantum Computing</h3>
                  <p>Exploring the intersection of quantum computing and cryptography for next-generation security solutions.</p>
                </div>
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">AI Ethics</h3>
                  <p>Researching ethical implications of AI deployment in critical systems and developing frameworks for responsible AI.</p>
                </div>
                <div className="tech-item">
                  <h3 className="text-xl text-[var(--secondary)] mb-4">Edge Computing</h3>
                  <p>Investigating distributed computing paradigms for IoT and real-time processing applications.</p>
                </div>
              </div>
            </section>
          )}

          {displayedPage === 'substack' && (
            <section className="section p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--primary)]">Recent Articles</h2>
              <div className="space-y-8">
                <article className="project-card">
                  <h3 className="text-xl text-[var(--secondary)]">The Future of Edge Computing</h3>
                  <p className="text-sm opacity-60">March 15, 2024</p>
                  <p className="mt-2">An in-depth analysis of edge computing trends and their impact on modern application architectures.</p>
                </article>
                <article className="project-card">
                  <h3 className="text-xl text-[var(--secondary)]">Quantum Computing: A Developer's Perspective</h3>
                  <p className="text-sm opacity-60">March 1, 2024</p>
                  <p className="mt-2">Exploring quantum computing concepts and their practical applications in software development.</p>
                </article>
                <article className="project-card">
                  <h3 className="text-xl text-[var(--secondary)]">Ethics in AI Development</h3>
                  <p className="text-sm opacity-60">February 15, 2024</p>
                  <p className="mt-2">Discussing the importance of ethical considerations in AI development and deployment.</p>
                </article>
              </div>
            </section>
          )}
        </main>

        <MusicPlayer />
      </div>
    </>
  );
}

export default App;