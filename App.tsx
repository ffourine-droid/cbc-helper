
import React, { useState, useEffect, useMemo } from 'react';
import { AppTab, Language, ProjectTemplate, GradeBand } from './types';
import { TRANSLATIONS, PROJECTS, GUIDES, FAQS } from './constants';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import { getAiResponse, getDailyTip } from './services/gemini';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedGrade, setSelectedGrade] = useState<GradeBand | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectTemplate | null>(null);
  const [dailyTip, setDailyTip] = useState<string>('');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const t = TRANSLATIONS[language];

  // Load Daily Tip
  useEffect(() => {
    const loadTip = async () => {
      const tip = await getDailyTip(language);
      setDailyTip(tip);
    };
    loadTip();
  }, [language]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesGrade = !selectedGrade || p.gradeBand === selectedGrade;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGrade && matchesSearch;
    });
  }, [selectedGrade, searchQuery]);

  const handleAskAi = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    const response = await getAiResponse(aiInput, language);
    setAiResponse(response || '');
    setIsAiLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
        <h1 className="text-2xl font-bold mb-2 leading-tight">{t.welcome}</h1>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {(Object.keys(t.gradeBands) as GradeBand[]).map((band) => (
            <button
              key={band}
              onClick={() => {
                setSelectedGrade(band);
                setActiveTab(AppTab.PROJECTS);
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-left transition-all active:scale-95"
            >
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-1">{band}</div>
              <div className="text-xs font-semibold leading-tight">{t.gradeBands[band]}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-indigo-50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-amber-100 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{t.dailyTip}</h2>
        </div>
        <p className="text-sm text-gray-600 italic leading-relaxed">
          {dailyTip || "Loading daily wisdom..."}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">{t.trending}</h2>
          <button 
            onClick={() => setActiveTab(AppTab.PROJECTS)}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            See all
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {PROJECTS.map(p => (
            <div key={p.id} className="min-w-[280px]">
              <ProjectCard project={p} onClick={setSelectedProject} language={language} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="space-y-4 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.guides}</h1>
      {GUIDES.map(guide => (
        <details key={guide.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
          <summary className="p-4 flex items-center justify-between cursor-pointer list-none">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{guide.title}</h3>
                <p className="text-xs text-gray-500">{guide.summary}</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-50 bg-gray-50/30 leading-relaxed">
            {guide.content}
          </div>
        </details>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t.projects}</h1>
        <div className="flex space-x-2">
           <button 
            onClick={() => setSelectedGrade(null)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${!selectedGrade ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
          >
            All
          </button>
          {(Object.keys(t.gradeBands) as GradeBand[]).map(band => (
            <button 
              key={band}
              onClick={() => setSelectedGrade(band)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedGrade === band ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            >
              {band}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredProjects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={setSelectedProject} language={language} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 italic">No projects found for this selection.</div>
        )}
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">{t.help}</h1>
      
      {/* AI Search Box */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{t.askAi}</h2>
            <p className="text-xs text-gray-500">{t.askAiDesc}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="e.g. How to make a simple puppet?"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleAskAi}
            disabled={isAiLoading || !aiInput.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50 active:scale-95 transition-transform"
          >
            {isAiLoading ? '...' : 'Ask'}
          </button>
        </div>
        {aiResponse && (
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {aiResponse}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Common Questions</h2>
        {FAQS.map(faq => (
          <div key={faq.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-2">{faq.question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectDetail = (project: ProjectTemplate) => (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-slideUp">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between z-10">
        <button onClick={() => setSelectedProject(null)} className="p-2 -ml-2 rounded-full active:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="font-bold text-sm uppercase tracking-wider text-gray-500">{project.subject}</div>
        <div className="w-10"></div>
      </div>

      <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />

      <div className="p-6 space-y-8 pb-12">
        <header>
          <div className="text-xs font-bold text-indigo-600 uppercase mb-1">{t.gradeBands[project.gradeBand]}</div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{project.title}</h1>
          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
              {t.cost}: {project.cost === 0 ? t.free : `KSh ${project.cost}`}
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center space-x-2">
            <span className="bg-indigo-600 w-1.5 h-6 rounded-full"></span>
            <span>{t.materials}</span>
          </h2>
          <ul className="grid grid-cols-1 gap-2">
            {project.materials.map((m, i) => (
              <li key={i} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center space-x-2">
            <span className="bg-indigo-600 w-1.5 h-6 rounded-full"></span>
            <span>{t.steps}</span>
          </h2>
          <div className="space-y-6 relative">
            <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-gray-100"></div>
            {project.steps.map((step, i) => (
              <div key={i} className="flex space-x-4 relative">
                <div className="bg-indigo-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 z-10 border-4 border-white">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 pt-1.5 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {project.tips && (
           <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
            <h3 className="font-bold text-amber-800 text-sm mb-2 flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Tips for Parents</span>
            </h3>
            <p className="text-sm text-amber-900 leading-relaxed">{project.tips}</p>
          </section>
        )}

        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.competencies}</h2>
          <div className="flex flex-wrap gap-2">
            {project.competencies.map((c, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-100">
                {c}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto relative bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg">C</div>
          <span className="font-black text-lg text-gray-900 tracking-tight">CBC Mama</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest active:scale-95 transition-transform"
          >
            {language === 'en' ? 'Kiswahili' : 'English'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 pt-6">
        {activeTab === AppTab.HOME && renderHome()}
        {activeTab === AppTab.GUIDES && renderGuides()}
        {activeTab === AppTab.PROJECTS && renderProjects()}
        {activeTab === AppTab.HELP && renderHelp()}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} language={language} />

      {/* Project Detail Overlay */}
      {selectedProject && renderProjectDetail(selectedProject)}

      {/* Animations via Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
