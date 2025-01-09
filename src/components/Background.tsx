import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create nodes
    const nodes: THREE.Mesh[] = [];
    const nodeCount = 50;
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff9f });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      scene.add(node);
      nodes.push(node);
    }

    // Create connections
    const connections: THREE.Line[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00b8ff, transparent: true, opacity: 0.3 });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 5) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      nodes.forEach((node) => {
        node.position.x += Math.random() * 0.01 - 0.005;
        node.position.y += Math.random() * 0.01 - 0.005;
        node.position.z += Math.random() * 0.01 - 0.005;
      });

      connections.forEach((line) => {
        scene.remove(line);
      });
      connections.length = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].position.distanceTo(nodes[j].position) < 5) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position
            ]);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
            connections.push(line);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Background;