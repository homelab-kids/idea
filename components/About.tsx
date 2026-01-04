
import React from 'react';
import { Book, Code, Cpu, Target, Rocket, ShieldAlert, Heart, Zap, Globe, Microscope } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Catchy Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[48px] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl">
              <Microscope className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight">BioMatrix Jr.</h1>
              <p className="text-indigo-200 text-lg font-bold uppercase tracking-[0.2em] mt-1">SproutLab AI Global Initiative</p>
            </div>
          </div>
          <p className="text-xl lg:text-2xl text-indigo-50 max-w-2xl font-medium leading-relaxed">
            Engineering the next generation of food security through data, curiosity, and artificial intelligence.
          </p>
        </div>
      </div>

      {/* Why This Exists & Impact */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform">
          <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-4">Why We Build</h2>
          <p className="text-gray-500 leading-relaxed font-medium">
            Traditional agriculture is often seen as "getting your hands dirty" with high uncertainty. We believe agriculture is a 
            <strong> biological engineering system</strong>. By teaching kids to measure humidity, CO2, and moisture at age five, 
            we create a smarter, more resilient generation of food producers.
          </p>
        </div>
        <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-4">The Impact</h2>
          <p className="text-gray-500 leading-relaxed font-medium">
            Every BioMatrix lab acts as a localized data node. Imagine thousands of kids worldwide sharing what happens when CO2 levels rise 
            or light spectrums shift. We aren't just growing plants; we're growing a <strong>global decentralized research network</strong> 
            led by the youth.
          </p>
        </div>
      </div>

      {/* Values & Vision */}
      <div className="bg-indigo-50 rounded-[48px] p-10 lg:p-14 border-4 border-indigo-100 grid md:grid-cols-3 gap-10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-3xl mx-auto shadow-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="font-black text-indigo-900 text-xl">Curiosity First</h3>
          <p className="text-indigo-600 text-sm font-medium">Turning "What if?" into data-driven experiments using AI simulations.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-3xl mx-auto shadow-lg flex items-center justify-center">
            <Target className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="font-black text-indigo-900 text-xl">Precision Logic</h3>
          <p className="text-indigo-600 text-sm font-medium">Replacing uncertainty with measurement. Agriculture is a science, not a guess.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-3xl mx-auto shadow-lg flex items-center justify-center">
            <Rocket className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="font-black text-indigo-900 text-xl">Future Ready</h3>
          <p className="text-indigo-600 text-sm font-medium">Preparing students for high-tech careers in ag-tech and biotechnology.</p>
        </div>
      </div>

      {/* The Mega Spec Box */}
      <div className="bg-white rounded-[48px] shadow-2xl border-8 border-gray-50 overflow-hidden">
        <div className="bg-gray-900 p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Code className="text-emerald-400 w-8 h-8" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">PROJECT_MANIFEST.MD</h2>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
        
        <div className="p-10 lg:p-16 prose prose-indigo max-w-none">
          <h1 className="text-gray-900 font-black mb-8">Full Technical Specification: BioMatrix Jr.</h1>
          
          <div className="grid md:grid-cols-2 gap-10 not-prose mb-12">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h3 className="text-indigo-600 font-black uppercase text-xs mb-4">Hardware Stack</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                <li className="flex items-center gap-2">🔹 ESP32-S3 Dual-Core AI Processor</li>
                <li className="flex items-center gap-2">🔹 OV2640 2MP Wide-Angle Camera</li>
                <li className="flex items-center gap-2">🔹 SCD40 CO2 / Temperature / Humidity</li>
                <li className="flex items-center gap-2">🔹 Capacitive Soil Moisture V2.0</li>
                <li className="flex items-center gap-2">🔹 Full Spectrum 5V Grow LED PWM</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h3 className="text-indigo-600 font-black uppercase text-xs mb-4">Software Architecture</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                <li className="flex items-center gap-2">⚡ React 19 + Tailwind CSS + Framer</li>
                <li className="flex items-center gap-2">🤖 Gemini 3 Flash Multimodal Integration</li>
                <li className="flex items-center gap-2">📡 WebSocket Real-time Telemetry</li>
                <li className="flex items-center gap-2">📊 SVG Canvas Component Rendering</li>
                <li className="flex items-center gap-2">📱 Progressive Web App (Offline First)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-black mt-10">1. Problem Statement</h3>
          <p className="text-gray-600">
            Current primary and secondary education treats agriculture as a historical or purely biological subject. 
            There is a significant disconnect between modern STEM (coding, robotics, AI) and environmental stewardship. 
            <strong>BioMatrix Jr.</strong> bridges this gap by turning the growth of a single plant into a 
            high-fidelity data collection project.
          </p>

          <h3 className="text-2xl font-black mt-10">2. Technical Challenges</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800">Calibration & Drift</h4>
                <p className="text-sm text-gray-600">Low-cost sensors often suffer from data drift. The system implements a "Cloud-Correction" layer where Gemini AI identifies anomalies in the telemetry stream compared to the plant's visual health.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldAlert className="w-10 h-10 text-orange-500 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800">Sealed Environment Power</h4>
                <p className="text-sm text-gray-600">Operating a high-RPM fan and ESP32 camera inside a humid environment requires specialized PCB coating (Conformal Coating) and moisture-resistant wiring to prevent short circuits.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-black mt-10">3. Non-Technical Challenges</h3>
          <p className="text-gray-600">
            The biggest hurdle is user patience. Plants grow slowly, while digital interfaces are instant. We mitigate this through 
            "AI Hallucination Simulations" where the lab predicts the next 10 days of growth based on current parameters, 
            giving immediate feedback to user actions.
          </p>

          <h3 className="text-2xl font-black mt-10">4. Design Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Safety First:</strong> No high voltage components inside the moist soil zone.</li>
            <li><strong>Affordability:</strong> Keep BOM (Bill of Materials) under $45 USD to ensure accessibility for public schools.</li>
            <li><strong>Aesthetics:</strong> Use high-saturation colors and friendly typography (Fredoka/Space Grotesk) to lower the barrier for younger students.</li>
            <li><strong>Transparency:</strong> Components should be visible (Clear Acrylic) to demystify the "magic" of electronics.</li>
          </ul>

          <div className="mt-16 bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200">
            <h4 className="text-emerald-600 font-black uppercase text-xs mb-4">Master LLM Prompt Summary</h4>
            <div className="bg-white p-6 rounded-2xl font-mono text-xs leading-relaxed text-gray-800 border border-gray-100 overflow-x-auto">
              ACT AS A SENIOR SYSTEM ARCHITECT. PROJECT: BIOMATRIX JR. <br/><br/>
              CORE OBJECTIVE: Create a desktop-sized automated growth lab for children. <br/>
              SYSTEM: ESP32-S3 + OV2640 + SCD4x + Capacitive Moisture. <br/>
              UI: React-based "Mission Control" with real-time SVG schematics. <br/>
              AI LAYER: Use Gemini 3 Flash for Vision-based plant analysis and multimodal sensor fusion. <br/>
              GOAL: Enable "What-If" simulations where students can predict growth results based on variable changes in CO2, Humidity, and Light Temp. <br/>
              VALUE PROP: Moving from uncertainty-based traditional farming to high-fidelity engineered agriculture from age 5+.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
