
import React from 'react';
import { ProjectTemplate, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProjectCardProps {
  project: ProjectTemplate;
  onClick: (p: ProjectTemplate) => void;
  language: Language;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <button
      onClick={() => onClick(project)}
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-indigo-700 uppercase">
          {project.subject}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 leading-tight">{project.title}</h3>
        </div>
        <div className="text-xs text-gray-500 mb-3">{t.gradeBands[project.gradeBand]}</div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">{t.cost}:</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              project.cost === 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {project.cost === 0 ? t.free : `KSh ${project.cost}`}
            </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
