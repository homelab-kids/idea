
import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Cpu, 
  Camera, 
  Wind, 
  Thermometer, 
  Droplets, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Lightbulb,
  Box,
  Wifi,
  Zap,
  Activity,
  BatteryCharging,
  Lock,
  ChevronDown,
  Star
} from 'lucide-react';

interface BuildStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  componentId: string;
  details: string[];
  victoryLabel: string;
}

const STEPS: BuildStep[] = [
  {
    id: 1,
    title: "Unbox Your Lab",
    description: "Spread everything out! Organization is the first step of a great scientist.",
    icon: <Package className="w-5 h-5" />,
    color: "bg-blue-500",
    componentId: "all",
    details: ["Find the ESP32 brain", "Locate the sensors", "Identify the mini-fan", "Get your USB cable ready"],
    victoryLabel: "Ready! 📦"
  },
  {
    id: 2,
    title: "Brain & Antenna",
    description: "Give your lab its thinking power and Wi-Fi ears!",
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-indigo-500",
    componentId: "brain",
    details: ["Seat the CPU in mount", "Attach Wi-Fi antenna", "Ensure a firm click"],
    victoryLabel: "Brain Online! 🧠"
  },
  {
    id: 3,
    title: "Smart Eye Cam",
    description: "Let your AI see! The camera watches your plants grow.",
    icon: <Camera className="w-5 h-5" />,
    color: "bg-pink-500",
    componentId: "camera",
    details: ["Connect ribbon cable", "Lock the camera tab", "Mount to bracket"],
    victoryLabel: "I Can See! 👁️"
  },
  {
    id: 4,
    title: "Soil Senses",
    description: "Connect the probe so your lab knows when to water.",
    icon: <Droplets className="w-5 h-5" />,
    color: "bg-orange-500",
    componentId: "probe",
    details: ["Connect JST cable", "Thread through baseplate", "Avoid touching tips"],
    victoryLabel: "Senses Active! 🌡️"
  },
  {
    id: 5,
    title: "Breathing Fan",
    description: "Plants need fresh air! Mount the fan to help them breathe.",
    icon: <Wind className="w-5 h-5" />,
    color: "bg-cyan-500",
    componentId: "fan",
    details: ["Check air arrows", "Connect to 5V Header", "Secure with screws"],
    victoryLabel: "Air Flowing! 💨"
  },
  {
    id: 6,
    title: "Energize!",
    description: "Plug it in and watch the lights come to life.",
    icon: <BatteryCharging className="w-5 h-5" />,
    color: "bg-yellow-500",
    componentId: "power",
    details: ["Plug USB-C cable", "Connect power brick", "Check status LED"],
    victoryLabel: "Power Up! ⚡"
  },
  {
    id: 7,
    title: "Seed Launch",
    description: "Plant your seed and start your AI growth journey.",
    icon: <Box className="w-5 h-5" />,
    color: "bg-emerald-500",
    componentId: "box",
    details: ["Run diagnostic", "Add 50ml water", "Plant at 1cm depth"],
    victoryLabel: "Launched! 🚀"
  }
];

const BuildGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPowered, setIsPowered] = useState(false);
  const [isDataFlowing, setIsDataFlowing] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  useEffect(() => {
    setIsPowered(completedSteps.includes(6));
    setIsDataFlowing(completedSteps.includes(7));
  }, [completedSteps]);

  const toggleStep = (id: number) => {
    if (!completedSteps.includes(id)) {
      setCompletedSteps([...completedSteps, id]);
      setIsVictory(true);
      setTimeout(() => {
        setIsVictory(false);
        if (id < STEPS.length) {
          setActiveStep(id + 1);
        }
      }, 700);
    } else {
      setCompletedSteps(completedSteps.filter(s => s !== id));
    }
  };

  const isStepDone = (id: number) => completedSteps.includes(id);
  const canAccessStep = (id: number) => id === 1 || completedSteps.includes(id - 1);

  const getComponentState = (compId: string) => {
    const stepIdx = STEPS.findIndex(s => s.componentId === compId);
    const stepId = stepIdx + 1;
    const isActive = activeStep === stepId;
    const isDone = completedSteps.includes(stepId);
    const isLocked = !canAccessStep(stepId);
    return { isActive, isDone, isLocked };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Compact Header */}
      <div className="bg-white rounded-[32px] p-4 lg:p-6 shadow-xl border-2 border-emerald-50 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
        <div className={`absolute inset-0 bg-emerald-50/30 transition-opacity duration-1000 ${isDataFlowing ? 'opacity-100' : 'opacity-0'}`} />
        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-md rotate-3 shrink-0 relative z-10">
          <Wrench className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left relative z-10">
          <h1 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight leading-none">Operation: Assemble Lab</h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Build your AI nature system step-by-step.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50/80 px-5 py-2 rounded-2xl border border-gray-100 relative z-10">
          <div className="text-center">
            <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
            <div className="text-lg font-black text-emerald-600 space-font">{Math.round((completedSteps.length / STEPS.length) * 100)}%</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex flex-col items-center">
             <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Status</span>
             <div className={`flex items-center gap-1.5 text-[9px] font-black transition-all ${isPowered ? 'text-emerald-500' : 'text-gray-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isPowered ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                {isPowered ? 'ONLINE' : 'OFFLINE'}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Compact Sidebar Progression */}
        <div className="xl:col-span-4 space-y-2">
          <div className="bg-white/40 backdrop-blur-xl p-1.5 rounded-[32px] border-2 border-white shadow-xl space-y-1.5">
            {STEPS.map((step) => {
              const locked = !canAccessStep(step.id);
              const active = activeStep === step.id;
              const done = isStepDone(step.id);

              return (
                <div 
                  key={step.id} 
                  className={`rounded-[22px] overflow-hidden transition-all duration-700 ease-in-out border-2 ${
                    active ? 'bg-white border-emerald-400 shadow-lg max-h-[600px]' : 'border-transparent max-h-[64px]'
                  } ${locked ? 'opacity-30 grayscale' : 'opacity-100'}`}
                >
                  <button
                    disabled={locked}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${locked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50/50'}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-500 ${done ? 'bg-emerald-500 rotate-[360deg]' : step.color} shadow-sm ${active ? 'scale-105' : ''}`}>
                      {locked ? <Lock className="w-4 h-4" /> : done ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8px] font-black uppercase tracking-tighter ${active ? 'text-emerald-500' : 'text-gray-400'}`}>Phase {step.id}</span>
                        {done && !active && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />}
                      </div>
                      <h3 className="font-bold text-gray-700 text-sm truncate">{step.title}</h3>
                    </div>
                    {!locked && (
                      <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-500 ${active ? 'rotate-180 text-emerald-400' : ''}`} />
                    )}
                  </button>

                  {/* Transitions simplified for vertical space */}
                  <div className={`px-4 pb-4 pt-1 transition-all duration-700 ease-in-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 h-0 pointer-events-none'}`}>
                    <p className="text-gray-400 text-[11px] mb-3 leading-tight font-medium italic">{step.description}</p>
                    
                    <div className="space-y-1.5 mb-4">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100/50">
                          <span className="w-5 h-5 bg-white border border-gray-200 rounded-md flex items-center justify-center text-[8px] font-black text-gray-400">
                            {idx + 1}
                          </span>
                          <span className="text-[10px] font-bold text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => toggleStep(step.id)}
                      className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${
                        done 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600'
                      }`}
                    >
                      {done ? step.victoryLabel : "I Built This! 🚀"}
                      {done ? <Star className="w-4 h-4 fill-emerald-600" /> : <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-yellow-50/60 p-3 rounded-2xl border border-yellow-100 flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-[9px] text-yellow-800 leading-tight font-medium uppercase tracking-tight">
              PRO TIP: Handle pins with care! Static can damage sensors.
            </p>
          </div>
        </div>

        {/* Schematic Area with INCREASED component spacing */}
        <div className="xl:col-span-8 flex flex-col gap-4 h-full sticky top-6">
          <div className="bg-gray-950 rounded-[40px] p-4 lg:p-8 text-white relative border-[8px] border-gray-900 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] min-h-[550px] overflow-hidden group">
            
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />

            {/* Connection SVG Layer - Spacing MAXIMIZED */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 650">
               {/* Connections - Components are now pushed further towards the edge */}
               {/* Power (Far Left to Center) */}
               <path d="M 120 325 H 300" stroke={getComponentState('power').isDone ? "#f59e0b" : "#1a1a1a"} strokeWidth="4" fill="none" className="transition-all duration-1000" />
               {isPowered && <circle r="4" fill="#f59e0b">
                 <animateMotion path="M 120 325 H 300" dur="2s" repeatCount="indefinite" />
               </circle>}

               {/* Camera (Far Top to Center) */}
               <path d="M 400 100 V 225" stroke={getComponentState('camera').isDone ? "#ec4899" : "#1a1a1a"} strokeWidth="4" fill="none" className="transition-all duration-1000" />
               
               {/* Soil Probe (Far Bottom to Center) */}
               <path d="M 400 560 V 425" stroke={getComponentState('probe').isDone ? "#f97316" : "#1a1a1a"} strokeWidth="4" fill="none" className="transition-all duration-1000" />
               
               {/* Fan (Far Right to Center) */}
               <path d="M 680 325 H 500" stroke={getComponentState('fan').isDone ? "#06b6d4" : "#1a1a1a"} strokeWidth="4" fill="none" className="transition-all duration-1000" />

               {/* Data Flow */}
               {isDataFlowing && (
                 <>
                   <circle r="3" fill="#10b981">
                     <animateMotion path="M 400 560 V 425" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                   <circle r="3" fill="#10b981">
                     <animateMotion path="M 680 325 H 500" dur="2s" repeatCount="indefinite" />
                   </circle>
                   <circle r="3" fill="#10b981">
                     <animateMotion path="M 400 100 V 225" dur="2.5s" repeatCount="indefinite" />
                   </circle>
                 </>
               )}
            </svg>

            {/* Components Layer - Spacing increased significantly */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full py-2">
              
              {/* TOP: SMART EYE - Pushed Higher */}
              <div className="flex flex-col items-center gap-1 transform -translate-y-2">
                <div className={`w-24 h-24 bg-gray-900 border-4 border-pink-500 rounded-3xl flex flex-col items-center justify-center relative transition-all duration-700 shadow-xl ${
                  getComponentState('camera').isActive ? 'scale-110 shadow-[0_0_30px_rgba(236,72,153,0.3)] opacity-100' : 
                  getComponentState('camera').isDone ? 'opacity-100' : 'opacity-10 grayscale'
                }`}>
                  <Camera className={`w-10 h-10 text-pink-400 ${isDataFlowing ? 'animate-pulse' : ''}`} />
                </div>
                <span className={`font-black text-[7px] uppercase tracking-[0.2em] ${getComponentState('camera').isLocked ? 'text-gray-800' : 'text-pink-400'}`}>Smart Eye Cam</span>
              </div>

              {/* MIDDLE ROW - Widened Further */}
              <div className="flex items-center justify-between w-full px-2 lg:px-8">
                
                {/* POWER PACK (FAR LEFT) */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-24 h-24 bg-gray-900 border-4 border-yellow-500 rounded-3xl flex flex-col items-center justify-center relative transition-all duration-700 shadow-xl ${
                    getComponentState('power').isActive ? 'scale-110 shadow-[0_0_30px_rgba(234,179,8,0.3)] opacity-100' : 
                    getComponentState('power').isDone ? 'opacity-100' : 'opacity-10 grayscale'
                  }`}>
                    <BatteryCharging className={`w-10 h-10 text-yellow-500 ${isPowered ? 'animate-bounce' : ''}`} />
                  </div>
                  <span className={`font-black text-[7px] uppercase tracking-[0.2em] ${getComponentState('power').isLocked ? 'text-gray-800' : 'text-yellow-500'}`}>Power Pack</span>
                </div>

                {/* CENTRAL BRAIN */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-44 h-52 bg-gray-900 border-[8px] border-indigo-600 rounded-[40px] flex flex-col items-center justify-center relative transition-all duration-700 shadow-xl ${
                    getComponentState('brain').isActive ? 'scale-105 shadow-[0_0_50px_rgba(79,70,229,0.3)] opacity-100' : 
                    getComponentState('brain').isDone ? 'opacity-100' : 'opacity-10 grayscale'
                  }`}>
                    <Cpu className={`w-16 h-16 text-indigo-400 ${isPowered ? 'animate-pulse' : ''}`} />
                    
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                       <div className={`w-1.5 h-1.5 rounded-full ${isPowered ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-gray-800'}`} />
                       <div className={`w-1.5 h-1.5 rounded-full ${isDataFlowing ? 'bg-blue-400 shadow-[0_0_6px_#60a5fa]' : 'bg-gray-800'}`} />
                    </div>

                    <div className={`absolute -top-10 -right-6 w-12 h-16 bg-gray-800 border-2 border-indigo-400 rounded-xl flex items-center justify-center transition-all duration-700 ${getComponentState('brain').isDone ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                       <Wifi className={`w-6 h-6 text-indigo-300 ${isPowered ? 'animate-pulse' : ''}`} />
                    </div>
                  </div>
                  <span className={`font-black text-[9px] uppercase tracking-[0.3em] ${getComponentState('brain').isLocked ? 'text-gray-800' : 'text-indigo-400'}`}>Lab Brain AI</span>
                </div>

                {/* FRESH AIR FAN (FAR RIGHT) */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-24 h-24 bg-gray-900 border-4 border-cyan-500 rounded-3xl flex flex-col items-center justify-center relative transition-all duration-700 shadow-xl ${
                    getComponentState('fan').isActive ? 'scale-110 shadow-[0_0_30px_rgba(6,182,212,0.3)] opacity-100' : 
                    getComponentState('fan').isDone ? 'opacity-100' : 'opacity-10 grayscale'
                  }`}>
                    <Wind className={`w-10 h-10 text-cyan-400 ${isPowered ? 'animate-spin' : ''}`} style={{ animationDuration: '1s' }} />
                  </div>
                  <span className={`font-black text-[7px] uppercase tracking-[0.2em] ${getComponentState('fan').isLocked ? 'text-gray-800' : 'text-cyan-400'}`}>Fresh Air Fan</span>
                </div>
              </div>

              {/* BOTTOM: SOIL SENTRY - Pushed Lower */}
              <div className="flex flex-col items-center gap-1 transform translate-y-2">
                <div className={`w-20 h-32 bg-gray-900 border-4 border-orange-500 rounded-t-xl rounded-b-[40px] flex flex-col items-center pt-5 relative transition-all duration-700 shadow-xl ${
                  getComponentState('probe').isActive ? 'scale-110 shadow-[0_0_30px_rgba(249,115,22,0.3)] opacity-100' : 
                  getComponentState('probe').isDone ? 'opacity-100' : 'opacity-10 grayscale'
                }`}>
                   <Droplets className={`w-8 h-8 text-orange-400 ${isDataFlowing ? 'animate-bounce' : ''}`} />
                   <div className="mt-3 flex flex-col gap-2 w-full px-4">
                      <div className="h-1 bg-orange-400/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-orange-500 transition-all duration-1000 ${isDataFlowing ? 'w-2/3' : 'w-0'}`} />
                      </div>
                   </div>
                </div>
                <span className={`font-black text-[7px] uppercase tracking-[0.2em] ${getComponentState('probe').isLocked ? 'text-gray-800' : 'text-orange-500'}`}>Soil Sentry</span>
              </div>
            </div>

            {/* Compact Telemetry */}
            <div className={`absolute bottom-4 left-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl px-3 py-2 rounded-2xl transition-opacity duration-1000 ${isDataFlowing ? 'opacity-100' : 'opacity-20'}`}>
              <Activity className={`w-4 h-4 text-emerald-500 ${isDataFlowing ? 'animate-pulse' : ''}`} />
              <p className="text-[7px] text-emerald-100/70 leading-none font-black uppercase tracking-widest">
                {isDataFlowing ? 'Link Verified' : 'Waiting for power...'}
              </p>
            </div>
          </div>

          {/* Squeezed Action Footer */}
          <div className="bg-white rounded-[32px] p-4 shadow-lg border-2 border-emerald-50 flex items-center justify-between transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-1000 ${isDataFlowing ? 'bg-emerald-500 rotate-[360deg]' : 'bg-gray-100'}`}>
                <CheckCircle2 className={`w-5 h-5 ${isDataFlowing ? 'text-white' : 'text-gray-300'}`} />
              </div>
              <div>
                <h4 className="font-black text-gray-800 text-sm">Status</h4>
                <p className="text-[10px] text-gray-400 font-medium">{isDataFlowing ? 'Lab Complete!' : 'Complete the build!'}</p>
              </div>
            </div>
            <button 
              disabled={!isDataFlowing}
              className={`px-6 py-3 rounded-xl font-black text-sm shadow-md transition-all flex items-center gap-2 group ${
                isDataFlowing 
                ? 'bg-emerald-500 text-white hover:scale-105 shadow-emerald-100' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Start Lab <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildGuide;
