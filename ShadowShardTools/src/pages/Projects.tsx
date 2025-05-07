import React, { useState, memo, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

// Animation component
interface AnimatedSectionProps {
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({ children, inView, delay = 0, className = '' }) => (
  <div
    className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
));

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  deprecated?: boolean | string; // Can be boolean or string
}

// Custom hook for dynamic refs
const useProjectInViews = (count: number) => {
  return Array.from({ length: count }, () => useInView({ triggerOnce: true, threshold: 0.1 }));
};

// Utility functions
const getFilteredProjects = (projects: Project[], filter: string, searchTerm: string) =>
  projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.technologies.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

const getAllTechnologies = (projects: Project[]) =>
  Array.from(new Set(projects.flatMap((project) => project.technologies)));

// ProjectCard Component
const ProjectCard: React.FC<{
  project: Project;
  inView: boolean;
  delay: number;
  refCb: (node?: Element | null) => void
}> = memo(({ project, inView, delay, refCb }) => {
  // Handle deprecated status properly (checking for boolean true or string "true")
  const isDeprecated = project.deprecated === true || project.deprecated === "true";

  return (
    <div
      ref={refCb}
      className={`relative transition-all duration-1000 transform group h-full ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Neon glow effect matching Products component */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-10 group-hover:opacity-70 transition-opacity duration-500"></div>

      <div className="h-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl relative z-10 hover:scale-[1.02] transition-all duration-300 flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {isDeprecated && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
              Deprecated
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{project.date}</p>
            <p className="text-gray-300 mb-4">{project.description}</p>

            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={`${project.id}-${tech}`}
                  className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links at the bottom */}
          <div className="mt-auto flex justify-between">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-400 transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 bg-lime-700 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-lime-600/30 hover:bg-lime-400 transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const Projects: React.FC = () => {
  // State hooks
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeprecated, setShowDeprecated] = useState<boolean>(true); // Added state for deprecated filter

  // Animation refs
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: filtersRef, inView: filtersInView } = useInView({ triggerOnce: true });

  // Get dynamic project refs
  const projectRefs = useProjectInViews(12); // Use a reasonable maximum

  // Fetch projects data from JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real application, you would use a path like '/data/projects.json'
        const response = await fetch('/Info/data/projects.json');

        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to empty array if fetch fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Memoized values for better performance
  const allTechnologies = useMemo(() => getAllTechnologies(projects), [projects]);

  // Updated filteredProjects to include deprecated filter
  const filteredProjects = useMemo(() => {
    let filtered = getFilteredProjects(projects, filter, searchTerm);

    // Filter out deprecated projects if showDeprecated is false
    if (!showDeprecated) {
      filtered = filtered.filter(project => {
        // Check if deprecated is either boolean true or string "true"
        return !(project.deprecated === true || project.deprecated === "true");
      });
    }

    return filtered;
  }, [projects, filter, searchTerm, showDeprecated]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection inView={headerInView} className="text-center mb-12">
          <div ref={headerRef}>
            <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Projects</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              A collection of projects we have been involved in.
            </p>
          </div>
        </AnimatedSection>

        {/* Filters and Search */}
        <AnimatedSection inView={filtersInView} delay={200}>
          <div ref={filtersRef} className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
              >
                All Projects
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300  ${filter === tech
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                >
                  {tech}
                </button>
              ))}

              {/* Toggle for deprecated projects */}
              <button
                onClick={() => setShowDeprecated(!showDeprecated)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${showDeprecated
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
              >
                {showDeprecated ? 'Hide Deprecated' : 'Show Deprecated'}
              </button>
            </div>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, index) => {
              const { ref, inView } = projectRefs[index % projectRefs.length];
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  inView={inView}
                  delay={(index % 3) * 150}
                  refCb={ref}
                />
              );
            })}
          </div>
        ) : (
          <AnimatedSection inView={true} delay={300}>
            <div className="text-center py-12">
              <p className="text-gray-300 text-xl">No projects match your current filters.</p>
              <button
                onClick={() => { setFilter('all'); setSearchTerm(''); setShowDeprecated(true); }}
                className="mt-4 px-6 py-2 bg-slate-700 rounded-xl shadow-lg text-white hover:bg-slate-400 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default memo(Projects);