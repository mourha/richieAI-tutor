
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Added Sparkles to imports
import { Mic, MicOff, RotateCcw, X, Send, Play, Pause, Waves, Volume2, Info, AlertCircle, RefreshCw, ChevronLeft, Sparkles } from 'lucide-react';
import { Companion, AppView } from '../types';
import { SUBJECT_METADATA, HAUSA_TEACHER_PROMPT } from '../constants';
import { Button } from './Button';
import { getTutorResponse } from '../services/gemini';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface LessonViewProps {
  companion: Companion;
  onEnd: () => void;
  onNavigate: (view: AppView) => void;
}

// Utility functions for audio
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const LessonView: React.FC<LessonViewProps> = ({ companion, onEnd, onNavigate }) => {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [transcription, setTranscription] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const greet = useCallback(async () => {
    setIsThinking(true);
    setError(null);
    try {
      const customPrompt = companion.id === 'hausa-tutor' ? HAUSA_TEACHER_PROMPT : '';
      const welcome = await getTutorResponse(
        companion.name, 
        companion.subject, 
        companion.topic, 
        "Barka da zuwa! Hello! I'm ready to start our lesson. Can you tell me what you're excited to learn today?",
        [],
        customPrompt
      );
      setMessages([{ role: 'model', text: welcome || 'Hello! Ready to learn?' }]);
    } catch (e: any) {
      console.error(e);
      setError("Ba za a iya fara tattaunawa ba. (Could not start the conversation.)");
    } finally {
      setIsThinking(false);
    }
  }, [companion]);

  useEffect(() => {
    greet();

    return () => {
      if (liveSessionRef.current) {
        liveSessionRef.current.close();
      }
    };
  }, [greet]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, transcription]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isThinking) return;
    
    const userMsg = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);
    setError(null);

    try {
      const customPrompt = companion.id === 'hausa-tutor' ? HAUSA_TEACHER_PROMPT : '';
      const response = await getTutorResponse(
        companion.name,
        companion.subject,
        companion.topic,
        userMsg,
        messages,
        customPrompt
      );
      setMessages(prev => [...prev, { role: 'model', text: response || 'Yi hakuri, ban gane ba. (Sorry, I didn\'t catch that.)' }]);
    } catch (err: any) {
      console.error(err);
      setError("An sami matsala wajen samun amsa. (There was a problem getting a response.)");
    } finally {
      setIsThinking(false);
    }
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) {
      if (liveSessionRef.current) liveSessionRef.current.close();
      setIsLiveMode(false);
      return;
    }

    try {
      setError(null);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const systemInstruction = companion.id === 'hausa-tutor' 
        ? HAUSA_TEACHER_PROMPT 
        : `You are ${companion.name}, a helpful AI tutor for ${companion.subject}. Topic: ${companion.topic}. Keep it educational and interactive.`;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLiveMode(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent.outputTranscription.text);
            }
            if (message.serverContent?.turnComplete) {
              setMessages(prev => [...prev, { role: 'model', text: transcription }]);
              setTranscription('');
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsLiveMode(false),
          onerror: (e) => {
            console.error("Live Error:", e);
            setError("Muryar live ta tsaya saboda kuskure. (Live voice stopped due to an error.)");
            setIsLiveMode(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction,
          outputAudioTranscription: {},
        }
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start live session:", err);
      setError("Ana buƙatar makirifoni don yin magana. (Microphone required for voice interaction.)");
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-1000">
      {/* Lesson Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-indigo-100/50 rounded-[32px] p-5 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={onEnd}
            className="p-3 mr-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-2xl ${SUBJECT_METADATA[companion.subject].color} flex items-center justify-center mr-4 shadow-sm`}>
               {SUBJECT_METADATA[companion.subject].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                 <h2 className="text-xl font-black text-indigo-950">{companion.name}</h2>
                 <span className="bg-indigo-950 text-white text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest">{companion.subject}</span>
              </div>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{companion.topic}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           {isLiveMode && (
             <div className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-indigo-200">
                <Waves className="w-4 h-4 mr-2" /> Live Now
             </div>
           )}
           <div className="bg-white px-4 py-2 rounded-xl text-indigo-950 font-black text-sm border border-indigo-50 shadow-sm hidden md:block">
             {companion.duration}
           </div>
        </div>
      </div>

      {/* Main Lesson Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Visual/Chat Section */}
        <div className="lg:col-span-3 flex flex-col bg-white rounded-[40px] border border-indigo-50 overflow-hidden shadow-sm">
          {/* Visual Canvas */}
          <div className={`h-[35%] transition-all duration-1000 relative flex items-center justify-center p-12 overflow-hidden ${
            isLiveMode 
            ? 'bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900' 
            : 'bg-indigo-50/30'
          }`}>
             {/* Background Effects */}
             <div className="absolute inset-0 opacity-10">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[120px]"></div>
             </div>
             
             <div className="text-center z-10 relative">
                <div className={`w-28 h-28 rounded-[40px] flex items-center justify-center mx-auto mb-6 floating shadow-2xl transition-all duration-700 ${
                  isLiveMode 
                  ? 'bg-white/10 backdrop-blur-2xl border border-white/20' 
                  : 'bg-white border-2 border-indigo-50 shadow-indigo-200/50'
                }`}>
                   {React.cloneElement(SUBJECT_METADATA[companion.subject].icon as React.ReactElement, { 
                     className: `w-14 h-14 ${isLiveMode ? 'text-white' : 'text-indigo-600'}` 
                   })}
                </div>
                <h3 className={`text-3xl font-black tracking-tight ${isLiveMode ? 'text-white' : 'text-indigo-950'}`}>{companion.name}</h3>
                {isLiveMode ? (
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest ml-2">Listening...</p>
                  </div>
                ) : (
                  <p className="text-indigo-300 text-sm font-bold mt-1">Chatting via text</p>
                )}
             </div>

             <div className={`absolute inset-0 pointer-events-none border-[16px] ${isLiveMode ? 'border-white/5' : 'border-indigo-100/10'} rounded-[40px]`}></div>
          </div>

          {/* Chat/Transcript Section */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-white">
            {messages.length === 0 && !isThinking && !error && (
              <div className="h-full flex flex-col items-center justify-center text-indigo-200">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 opacity-20" />
                </div>
                <p className="font-bold">Establishing connection...</p>
              </div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[80%] px-6 py-4 rounded-[24px] text-base leading-relaxed font-medium ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none shadow-xl shadow-indigo-500/10' 
                    : 'bg-indigo-50/50 text-indigo-950 rounded-bl-none border border-indigo-100/50'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {transcription && (
               <div className="flex justify-start">
                 <div className="max-w-[85%] px-6 py-4 rounded-[24px] bg-indigo-50/30 text-indigo-400 italic rounded-bl-none text-base border-2 border-dashed border-indigo-100 animate-pulse font-medium">
                    {transcription}...
                 </div>
               </div>
            )}
            {isThinking && (
               <div className="flex justify-start">
                  <div className="bg-indigo-50/50 px-6 py-4 rounded-[24px] rounded-bl-none">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
               </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-100 p-6 rounded-[24px] flex items-start gap-4 text-red-600 animate-in slide-in-from-top-4">
                <AlertCircle className="w-6 h-6 shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-black text-lg">Oops! Something went wrong.</p>
                  <p className="text-sm font-bold opacity-80 mt-1">{error}</p>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={messages.length === 0 ? greet : handleSendMessage}
                    className="mt-4 !rounded-xl !bg-red-500 !shadow-none"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                  </Button>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          {!isLiveMode && (
            <div className="p-6 border-t border-indigo-50 bg-indigo-50/10">
              <div className="relative flex items-center max-w-4xl mx-auto">
                 <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Richie anything..." 
                  className="w-full bg-white border border-indigo-100 rounded-[24px] py-5 px-8 pr-16 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-indigo-950 font-medium text-lg placeholder:text-indigo-200"
                 />
                 <button 
                  onClick={handleSendMessage}
                  disabled={isThinking || !inputText.trim()}
                  className="absolute right-3 p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 active:scale-90"
                 >
                   <Send className="w-6 h-6" />
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white border border-indigo-50 rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-sm group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <img 
                src={companion.id === 'hausa-tutor' ? 'https://api.dicebear.com/7.x/bottts/svg?seed=RichieHausa' : `https://api.dicebear.com/7.x/bottts/svg?seed=${companion.id}`} 
                className="w-32 h-32 rounded-[32px] bg-indigo-50 p-2 relative z-10 border-4 border-white shadow-2xl transition-transform group-hover:scale-105 duration-500"
                alt="Tutor Avatar"
              />
            </div>
            
            <h4 className="text-2xl font-black text-indigo-950 tracking-tight">{companion.name}</h4>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
               <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-indigo-100/50">Active Now</span>
               <span className="bg-purple-50 text-purple-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-purple-100/50">Level 1</span>
            </div>
            
            <p className="text-indigo-400 text-sm font-medium mt-6 leading-relaxed">
              {companion.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={toggleLiveMode}
              className={`flex items-center justify-between p-6 rounded-[32px] transition-all shadow-xl active:scale-95 group border-2 ${
                isLiveMode 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-transparent shadow-indigo-500/30' 
                  : 'bg-white text-indigo-950 border-indigo-50 hover:border-indigo-200 shadow-indigo-500/5'
              }`}
            >
              <div className="flex items-center">
                 <div className={`p-4 rounded-2xl mr-5 transition-colors ${isLiveMode ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                    <Mic className={`w-7 h-7 ${isLiveMode ? 'animate-pulse' : ''}`} />
                 </div>
                 <div className="text-left">
                    <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">Interactive</div>
                    <div className="text-lg font-black leading-none">Voice Mode</div>
                 </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${isLiveMode ? 'bg-white animate-pulse' : 'bg-indigo-100'}`}></div>
            </button>
            
            {isLiveMode && (
               <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`flex items-center justify-center p-6 rounded-[32px] border-2 transition-all font-black uppercase tracking-widest text-sm shadow-lg ${
                  isMuted 
                  ? 'bg-red-50 text-red-600 border-red-100 shadow-red-200/50' 
                  : 'bg-white text-indigo-950 border-indigo-50 hover:bg-indigo-50 shadow-indigo-200/50'
                }`}
               >
                 {isMuted ? <MicOff className="w-6 h-6 mr-3" /> : <Mic className="w-6 h-6 mr-3" />}
                 {isMuted ? 'Muted' : 'Unmuted'}
               </button>
            )}
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={onEnd}
            className="rounded-[32px] !py-6 text-xl font-black shadow-2xl shadow-indigo-500/40"
          >
            Finish Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};
