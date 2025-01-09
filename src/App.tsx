import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          return;
        }
      } catch (error) {
        return;
      }
    };

    trackVisit();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[var(--background)] -z-10" />
      <Navigation activePage={activePage} onPageChange={setActivePage} />
      
      <main className="relative">
        {activePage === 'home' && (
          <section className="section flex flex-col justify-center items-center min-h-screen">
            <Terminal className="w-16 h-16 mb-6 text-[var(--primary)]" />
            <h1 className="text-4xl md:text-6xl mb-4 text-center">
              <span className="text-[var(--primary)]">Hello</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl opacity-80">
              I'm Victor. I build shit.
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

        {activePage === 'cv' && (
          <section className="section p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--primary)]">CV</h2>
            <div className="timeline-item">
              <h3 className="text-xl text-[var(--secondary)]">Senior Software Engineer</h3>
              <p className="text-sm opacity-60">2020 - Present</p>
              <p className="mt-2">Leading development of cloud-native applications and microservices architecture.</p>
            </div>
            <div className="timeline-item">
              <h3 className="text-xl text-[var(--secondary)]">Full Stack Developer</h3>
              <p className="text-sm opacity-60">2018 - 2020</p>
              <p className="mt-2">Developed and maintained multiple web applications using React and Node.js.</p>
            </div>
            <div className="timeline-item">
              <h3 className="text-xl text-[var(--secondary)]">Software Developer</h3>
              <p className="text-sm opacity-60">2016 - 2018</p>
              <p className="mt-2">Built responsive web applications and implemented RESTful APIs.</p>
            </div>
          </section>
        )}

        {activePage === 'projects' && (
          <section className="section p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--primary)]">Projects</h2>
            <div className="project-card">
              <h3 className="text-xl text-[var(--secondary)]">Cloud Infrastructure Platform</h3>
              <p className="mt-2">A scalable cloud infrastructure management platform built with Kubernetes and Go.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Go</span>
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Kubernetes</span>
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Docker</span>
              </div>
            </div>
            <div className="project-card">
              <h3 className="text-xl text-[var(--secondary)]">E-commerce Platform</h3>
              <p className="mt-2">Full-stack e-commerce solution with real-time inventory management.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">React</span>
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">Node.js</span>
                <span className="px-2 py-1 bg-opacity-20 bg-[var(--primary)] rounded">MongoDB</span>
              </div>
            </div>
          </section>
        )}

        {activePage === 'portfolio' && (
          <section className="section p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--primary)]">Portfolio</h2>
            <div className="tech-list">
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">Frontend Development</h3>
                <ul className="space-y-2">
                  <li>React.js</li>
                  <li>Vue.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">Backend Development</h3>
                <ul className="space-y-2">
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Go</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">DevOps</h3>
                <ul className="space-y-2">
                  <li>Docker</li>
                  <li>Kubernetes</li>
                  <li>AWS</li>
                  <li>CI/CD</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activePage === 'interests' && (
          <section className="section p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--primary)]">Areas of Interest</h2>
            <div className="tech-list">
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">Artificial Intelligence</h3>
                <p>Exploring machine learning applications in software development and automation.</p>
              </div>
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">Cloud Architecture</h3>
                <p>Designing scalable and resilient cloud-native applications.</p>
              </div>
              <div className="tech-item">
                <h3 className="text-xl text-[var(--secondary)] mb-4">Blockchain Technology</h3>
                <p>Investigating decentralized applications and smart contracts.</p>
              </div>
            </div>
          </section>
        )}

        {activePage === 'substack' && (
          <section className="section p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--primary)]">Substack</h2>
            <div className="space-y-8">
              <article className="project-card">
                <h3 className="text-xl text-[var(--secondary)]">The Future of Cloud Computing</h3>
                <p className="text-sm opacity-60">March 15, 2024</p>
                <p className="mt-2">Exploring emerging trends in cloud computing and their impact on software architecture.</p>
              </article>
              <article className="project-card">
                <h3 className="text-xl text-[var(--secondary)]">Building Scalable Microservices</h3>
                <p className="text-sm opacity-60">March 1, 2024</p>
                <p className="mt-2">A deep dive into microservices architecture and best practices for scalability.</p>
              </article>
              <article className="project-card">
                <h3 className="text-xl text-[var(--secondary)]">The Rise of Edge Computing</h3>
                <p className="text-sm opacity-60">February 15, 2024</p>
                <p className="mt-2">Understanding the implications of edge computing on modern application development.</p>
              </article>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;