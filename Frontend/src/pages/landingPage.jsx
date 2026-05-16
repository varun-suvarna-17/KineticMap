import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import AlgorithmCard from '../components/AlgorithmCard';
import { Network, Zap, GitFork, Car, Route, Infinity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Route,
    title: "Dijkstra's Algorithm",
    description: "Guarantees the absolute shortest path. Ideal for complex graphs where accuracy is paramount."
  },
  {
    icon: Zap,
    title: "A* Algorithm",
    description: "Combines heuristics and exact pathfinding for incredibly fast and accurate route generation."
  },
  {
    icon: GitFork,
    title: "Greedy Technique",
    description: "A fast approximation algorithm for huge networks where speed matters more than the perfect path."
  },
  {
    icon: Network,
    title: "Dynamic Route Visualization",
    description: "Watch the algorithms explore nodes and discover paths in real-time on our interactive map."
  },
  {
    icon: Car,
    title: "Traffic Simulation",
    description: "Test how algorithms adapt by simulating traffic congestion and dynamic edge weights."
  },
  {
    icon: Infinity,
    title: "Fast Calculation",
    description: "Optimized graph processing ensures minimal latency even on complex routing networks."
  }
];

const algorithms = [
  {
    title: "Dijkstra",
    description: "Explores all possible paths uniformly to ensure the absolutely shortest path is found. The gold standard for routing without heuristics.",
    timeEfficiency: "O((V + E) log V)",
    useCase: "General mapping and precise distance calculation."
  },
  {
    title: "A* Search",
    description: "Uses a heuristic (like straight-line distance) to guide the search towards the destination, significantly reducing the nodes explored.",
    timeEfficiency: "O(E)",
    useCase: "Game AI and fast GPS routing."
  },
  {
    title: "Greedy Best-First",
    description: "Always expands the node closest to the goal based on the heuristic. Incredibly fast but does not guarantee the shortest overall path.",
    timeEfficiency: "O(V log V)",
    useCase: "Heavily constrained real-time systems."
  }
];

const LandingPage = () => {
  useEffect(() => {
    // Feature cards animation
    gsap.fromTo('.feature-card-anim', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
        }
      }
    );

    // Algorithm section animation
    gsap.fromTo('.algo-card-anim',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#algorithms',
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Routing Features
            </h2>
            <p className="text-lg text-slate-600">
              KineticMap provides a comprehensive suite of algorithms and visualization tools to solve complex routing challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card-anim">
                <FeatureCard 
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section id="algorithms" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Compare Algorithms
              </h2>
              <p className="text-lg text-slate-600">
                Understand the trade-offs between different pathfinding techniques to choose the best one for your needs.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {algorithms.map((algo, idx) => (
              <div key={idx} className="algo-card-anim">
                <AlgorithmCard 
                  title={algo.title}
                  description={algo.description}
                  timeEfficiency={algo.timeEfficiency}
                  useCase={algo.useCase}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;