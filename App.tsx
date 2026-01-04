
import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Beaker, 
  Settings, 
  ChevronRight, 
  RefreshCcw, 
  Camera, 
  MessageSquare,
  BookOpen,
  Sprout,
  Target,
  Wrench,
  Sparkles,
  Zap,
  Dna,
  Lock,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AppView, SensorData, PlantLog } from './types';
import { MOCK_SENSORS, SENSOR_METRICS, PLANT_STATUS_COLORS, PLANT_FACTS, PLANT_BADGES } from './constants';
import SensorCard from './components/SensorCard';
import About from './components/About';
import BuildGuide from './components/BuildGuide';
import { analyzePlantStatus, simulateExperiment } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [sensors, setSensors] = useState<SensorData>(MOCK_SENSORS);
  const [userLevel, setUserLevel] = useState(4); // Default level 4 as per user request
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [logs, setLogs] = useState<PlantLog[]>([
    {
      id: '1',
      date: 'Nov 28, 2025',
      status: 'Sprouting',
      actionTaken: 'Turned on grow light',
      aiAnalysis: 'Germination successful! 4-6+ sprouts visible with green cotyledons emerging.'
    }
  ]);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [experimentQuery, setExperimentQuery] = useState('');
  const [experimentResult, setExperimentResult] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    handleAnalyze();
    setCurrentFactIndex(Math.floor(Math.random() * PLANT_FACTS.length));
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      let imageBase64 = undefined;
      if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, 320, 240);
          imageBase64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
        }
      }
      const result = await analyzePlantStatus(sensors, imageBase64);
      setAiAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExperiment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experimentQuery) return;
    setIsAnalyzing(true);
    try {
      const res = await simulateExperiment(experimentQuery);
      setExperimentResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % PLANT_FACTS.length);
  };

  const currentBadge = PLANT_BADGES.find(b => b.level === userLevel) || PLANT_BADGES[0];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(AppView.DASHBOARD)}>
            <div className="bg-green-500 p-2 rounded-2xl rotate-3 shadow-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-green-800 tracking-tight">SproutLab AI</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {[
              { id: AppView.DASHBOARD, label: 'Dashboard', icon: <Sprout className="w-5 h-5" /> },
              { id: AppView.BUILD_GUIDE, label: 'Build Guide', icon: <Wrench className="w-5 h-5" /> },
              { id: AppView.EXPERIMENTS, label: 'Experiments', icon: <Beaker className="w-5 h-5" /> },
              { id: AppView.ABOUT, label: 'About', icon: <Info className="w-5 h-5" /> },
            ].map(nav => (
              <button 
                key={nav.id}
                onClick={() => setView(nav.id)}
                className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition ${view === nav.id ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-green-600'}`}
              >
                {nav.icon} {nav.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Gamified Badge Trigger */}
            <div 
              className="relative group cursor-help"
              onMouseEnter={() => setShowBadgePopup(true)}
              onMouseLeave={() => setShowBadgePopup(false)}
            >
              <div className={`hidden lg:flex items-center gap-2 ${currentBadge.color} px-4 py-1.5 rounded-full font-bold text-sm text-gray-900 shadow-sm border-2 border-white/50 transition-all hover:scale-105 active:scale-95`}>
                {currentBadge.icon}
                Level {userLevel} {currentBadge.name}
              </div>

              {/* Badge Progression Pop-up */}
              {showBadgePopup && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-[32px] shadow-2xl border-4 border-green-50 p-6 z-[60] animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 ${currentBadge.color} rounded-[24px] flex items-center justify-center shadow-lg`}>
                       <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-800 leading-tight">Current Rank</h4>
                      <p className="text-emerald-600 font-bold uppercase text-xs tracking-widest">{currentBadge.name}</p>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Your Growth Path</h5>
                    {PLANT_BADGES.map((badge) => {
                      const isCompleted = badge.level < userLevel;
                      const isCurrent = badge.level === userLevel;
                      const isLocked = badge.level > userLevel;

                      return (
                        <div 
                          key={badge.level} 
                          className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-all ${
                            isCurrent ? 'bg-emerald-50 border-emerald-200' : 
                            isCompleted ? 'bg-gray-50 border-transparent opacity-60' : 
                            'bg-gray-100 border-transparent grayscale'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isLocked ? 'bg-gray-300' : badge.color}`}>
                            {isLocked ? <Lock className="w-4 h-4" /> : isCompleted ? <CheckCircle2 className="w-5 h-5" /> : badge.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-black uppercase ${isCurrent ? 'text-emerald-500' : 'text-gray-400'}`}>Level {badge.level}</span>
                              {isCurrent && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                            </div>
                            <h6 className={`font-black text-xs ${isLocked ? 'text-gray-400' : 'text-gray-700'}`}>{badge.name}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Complete more experiments to level up!</p>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition active:scale-95">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        {view === AppView.DASHBOARD && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animated-in fade-in duration-700">
            {/* Left: Plant Visualization & Sensors */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-[40px] shadow-2xl border-4 border-white overflow-hidden relative">
                {/* Live Camera Feed or Placeholder */}
                <div className="aspect-video bg-gray-900 flex items-center justify-center relative group">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover opacity-80" 
                  />
                  <canvas ref={canvasRef} width="320" height="240" className="hidden" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white border border-white/20">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold uppercase tracking-widest">Live Laboratory Feed</span>
                    </div>
                    {aiAnalysis && (
                      <div className={`${PLANT_STATUS_COLORS[aiAnalysis.status] || 'bg-gray-400'} px-4 py-2 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-lg`}>
                        <RefreshCcw className="w-4 h-4" /> {aiAnalysis.status}
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={startCamera}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 px-8 py-4 rounded-3xl text-white font-black text-xl transition-all hover:scale-110 flex items-center gap-4 group-hover:scale-105"
                    >
                      <Camera className="w-8 h-8" /> 
                      Start Smart Eye
                    </button>
                  </div>
                </div>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {SENSOR_METRICS.map((metric) => (
                  <SensorCard 
                    key={metric.id}
                    label={metric.label}
                    value={sensors[metric.id as keyof SensorData] as number}
                    unit={metric.unit}
                    icon={metric.icon}
                    color={metric.color}
                  />
                ))}
              </div>

              {/* AI Insight Box */}
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <MessageSquare className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
                      <Beaker className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black">AI Plant Scientist Report</h3>
                  </div>
                  {isAnalyzing ? (
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-2/3 bg-white/20 rounded-full animate-pulse" />
                      <div className="h-4 w-full bg-white/20 rounded-full animate-pulse" />
                      <div className="h-4 w-1/2 bg-white/20 rounded-full animate-pulse" />
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-4">
                      <p className="text-xl font-bold leading-relaxed">"{aiAnalysis.summary}"</p>
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                          <span className="text-xs uppercase font-black tracking-widest block mb-1 opacity-70">Next Action</span>
                          <p className="font-bold">{aiAnalysis.action}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                          <span className="text-xs uppercase font-black tracking-widest block mb-1 opacity-70">Science Fun Fact</span>
                          <p className="text-sm">{aiAnalysis.funFact}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg opacity-80">Click the camera or refresh to get an AI reading!</p>
                  )}
                  <button 
                    onClick={handleAnalyze}
                    className="mt-6 bg-white text-emerald-600 px-6 py-3 rounded-2xl font-black hover:bg-green-50 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                  >
                    <RefreshCcw className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} /> Run Diagnosis
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Growth Log & History */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-green-50">
                <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                  <BookOpen className="text-green-500" /> Growth Lab Log
                </h3>
                <div className="space-y-6">
                  {logs.map((log) => (
                    <div key={log.id} className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-0 before:w-1 before:bg-green-100">
                      <div className="absolute left-0 top-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                      <div className="mb-1">
                        <span className="text-sm font-black text-gray-400">{log.date}</span>
                        <h4 className="font-black text-lg text-gray-700">{log.status} Phase</h4>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4 text-sm border border-gray-100">
                        <p className="text-gray-600 italic">"{log.aiAnalysis}"</p>
                        <div className="mt-2 text-xs font-bold text-green-600 flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> Action: {log.actionTaken}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-green-300 hover:text-green-600 transition-colors">
                  + Log Manual Experiment
                </button>
              </div>

              {/* Lab Stats Card */}
              <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full -mr-10 -mt-10" />
                <h4 className="font-black mb-4 flex items-center gap-2">
                   <Target className="w-5 h-5" /> Progress to Level {userLevel + 1}
                </h4>
                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span>Exp Level</span>
                      <span>32%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-white w-[32%] transition-all duration-1000 ease-out" />
                    </div>
                  </div>
                  <p className="text-xs opacity-70 leading-relaxed font-medium">
                    Run more diagnosis or complete build phases to reach Level {userLevel + 1} ({PLANT_BADGES[userLevel]?.name}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === AppView.EXPERIMENTS && (
          <div className="max-w-5xl mx-auto space-y-12 animated-in slide-in-from-bottom duration-700">
            {/* Trivia Section (Knowledge of the Day) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute -top-10 -right-10 opacity-20 group-hover:rotate-45 transition-transform duration-1000">
                  <Sparkles className="w-48 h-48 rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">Sprout Trivia!</h3>
                  <p className="text-yellow-100 font-bold mb-8">Ignite your plant curiosity...</p>
                </div>
                
                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-[32px] p-6 border border-white/20 min-h-[220px] flex flex-col justify-between transition-all duration-500">
                  <div className="animate-in fade-in slide-in-from-left duration-500">
                    <h4 className="text-xl font-black text-white mb-3">"{PLANT_FACTS[currentFactIndex].title}"</h4>
                    <p className="text-lg font-medium leading-relaxed italic text-white/90">
                      {PLANT_FACTS[currentFactIndex].fact}
                    </p>
                  </div>
                  <button 
                    onClick={nextFact}
                    className="mt-6 self-start px-6 py-2 bg-white text-orange-600 rounded-full font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group-active:rotate-12"
                  >
                    Another One! <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Simulation Header */}
              <div className="md:col-span-7 bg-white rounded-[48px] p-10 shadow-2xl border-4 border-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 grayscale">
                  <Dna className="w-40 h-40" />
                </div>
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <Dna className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-black text-gray-800 mb-4 relative z-10">Nature Simulator</h2>
                <p className="text-gray-500 text-lg leading-relaxed relative z-10">
                  Become a Virtual Bio-Engineer! Ask our Lab AI to simulate crazy ideas. What if you grew plants on Mars? Or fed them honey?
                </p>
                
                <form onSubmit={handleExperiment} className="mt-8 flex flex-col sm:flex-row gap-3 relative z-10">
                  <input 
                    type="text" 
                    value={experimentQuery}
                    onChange={(e) => setExperimentQuery(e.target.value)}
                    placeholder="What if I increase the temperature to 100°F?"
                    className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-emerald-300 outline-none font-bold transition-all text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  >
                    {isAnalyzing ? 'Thinking...' : 'Simulate!'}
                  </button>
                </form>
              </div>
            </div>

            {/* Simulation Results */}
            {experimentResult && (
              <div className="bg-white rounded-[48px] p-10 shadow-xl border-4 border-indigo-50 animate-in zoom-in duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800">Bio-Analysis Results</h3>
                </div>
                <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed text-lg bg-indigo-50/30 p-8 rounded-[32px] border-2 border-indigo-100/50">
                  {experimentResult.split('\n').map((line, i) => (
                    <p key={i} className="mb-4">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === AppView.ABOUT && <About />}
        {view === AppView.BUILD_GUIDE && <BuildGuide />}
      </main>

      {/* Mobile Navigation Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setView(AppView.DASHBOARD)} className={`p-3 rounded-2xl transition-all active:scale-90 ${view === AppView.DASHBOARD ? 'bg-green-100 text-green-600 shadow-inner' : 'text-gray-400'}`}>
          <Sprout className="w-7 h-7" />
        </button>
        <button onClick={() => setView(AppView.BUILD_GUIDE)} className={`p-3 rounded-2xl transition-all active:scale-90 ${view === AppView.BUILD_GUIDE ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'text-gray-400'}`}>
          <Wrench className="w-7 h-7" />
        </button>
        <button onClick={() => setView(AppView.EXPERIMENTS)} className={`p-3 rounded-2xl transition-all active:scale-90 ${view === AppView.EXPERIMENTS ? 'bg-green-100 text-green-600 shadow-inner' : 'text-gray-400'}`}>
          <Beaker className="w-7 h-7" />
        </button>
        <button onClick={() => setView(AppView.ABOUT)} className={`p-3 rounded-2xl transition-all active:scale-90 ${view === AppView.ABOUT ? 'bg-indigo-100 text-indigo-600 shadow-inner' : 'text-gray-400'}`}>
          <Info className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default App;
