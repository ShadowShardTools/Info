import React, { useState, useEffect, memo } from 'react';
import FilterableList from '../shared/components/FilterableList';
import GlowContainer from '../shared/components/GlowContainer';
import { Project } from '../shared/types';

interface ProjectCardProps {
  project: Project;
  isVisible: boolean;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, isVisible, delay }) => {
  // Handle deprecated status properly
  const isDeprecated = project.deprecated;

  return (
    <div
      className={`relative transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <GlowContainer>
        <div className="h-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-800">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {isDeprecated && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
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
                {project.technologies.map((tech: any) => (
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
      </GlowContainer>
    </div>
  );
});

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeprecated, setShowDeprecated] = useState<boolean>(true);

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const rawData = await response.json();

        // Normalize 'deprecated' to boolean
        const normalizedData = rawData.map((item: any) => ({
          ...item,
          deprecated: String(item.deprecated).toLowerCase() === 'true'
        }));

        setProjects(normalizedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);


  // Filter out deprecated projects if needed
  const displayProjects = showDeprecated
    ? projects
    : projects.filter(project => !(project.deprecated === true || project.deprecated === "true"));

  // Render function for FilterableList
  const renderProject = (project: Project, isVisible: boolean, index: number) => {
    return (
      <ProjectCard
        key={project.id}
        project={project}
        isVisible={isVisible}
        delay={(index % 3) * 150}
      />
    );
  };

  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      <FilterableList
        items={displayProjects}
        filterKey="technologies"
        searchFields={['title', 'description']}
        renderItem={renderProject}
        title="Projects"
        subtitle="A collection of projects we have been involved in."
        emptyMessage="No projects match your current filters."
        loading={loading}
        showSearchInput={true}
        showDeprecated={showDeprecated}
        toggleShowDeprecated={() => setShowDeprecated(prev => !prev)}
      />
    </div>
  );
};

export default memo(Projects);