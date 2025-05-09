import React, { useState, useEffect, memo } from 'react';
import FilterableList from '../shared/components/FilterableList';
import GlowContainer from '../shared/components/GlowContainer';
import { Project } from '../shared/types';
import Icons from '../shared/Icons';

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
                  className="relative z-10 bg-blue-700 text-white text-center py-2 px-4 gap-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-400 transition-all duration-300 flex items-center"
                >
                  <Icons.GitHub />
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