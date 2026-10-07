import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc, CloudRain, Waves, Sparkles, Sliders } from 'lucide-react';

export default function SoundscapePlayer({ isOpen, onClose, isMuted, setIsMuted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('bowls'); // 'bowls', 'rain', 'ocean', 'drone'
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeNodesRef = useRef([]);

  const presets = [
    { id: 'bowls', name: 'Tibetan Singing Bowls', icon: Disc, description: '432Hz harmonic acoustic resonance for deep relaxation' },
    { id: 'rain', name: 'Bamboo Rainforest', icon: CloudRain, description: 'Soft rhythmic raindrops falling on bamboo leaves' },
    { id: 'ocean', name: 'Sanctuary Waves', icon: Waves, description: 'Gentle tidal rhythms soothing mind & spirit' },
    { id: 'drone', name: 'Deep Zen Drone', icon: Sparkles, description: 'Warm organic meditation chord synth' },
  ];

  // Initialize Web Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
  };

  const stopAudio = () => {
    activeNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // Safe catch
      }
    });
    activeNodesRef.current = [];
  };

  const startSoundscape = (presetId) => {
    initAudio();
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    stopAudio();

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    if (presetId === 'bowls') {
      // Create Tibetan Singing Bowl ambient synthesis
      const freqs = [172.4, 258.6, 432.0, 648.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // LFO for vibrato
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(osc.frequency);
        lfo.start(now);

        // Warm pulsing envelope
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), now + 3 + idx);
        
        osc.connect(gain);
        gain.connect(masterGainRef.current);
        osc.start(now);

        activeNodesRef.current.push(osc, lfo, gain);
      });
    } else if (presetId === 'drone') {
      // Deep Ambient Zen Drone chord (A1, E2, A2, C#3)
      const freqs = [110, 164.81, 220, 277.18];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + 4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);
        osc.start(now);

        activeNodesRef.current.push(osc, filter, gain);
      });
    } else if (presetId === 'ocean' || presetId === 'rain') {
      // Noise buffer synthesis for rain/waves
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = presetId === 'ocean' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(presetId === 'ocean' ? 300 : 800, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      
      lfo.frequency.setValueAtTime(presetId === 'ocean' ? 0.1 : 4, now); // Ocean tide slow swell vs rain fast shimmer
      lfoGain.gain.setValueAtTime(presetId === 'ocean' ? 200 : 300, now);
      
      lfo.connect(filter.frequency);
      lfo.start(now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);
      whiteNoise.start(now);

      activeNodesRef.current.push(whiteNoise, filter, lfo, gain);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startSoundscape(currentPreset);
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  const selectPreset = (presetId) => {
    setCurrentPreset(presetId);
    if (isPlaying) {
      startSoundscape(presetId);
    }
  };

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume, 
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : ''}`}>
      {/* Soundscape Floating Controller Badge */}
      <div className="glass-card-gold rounded-2xl p-4 shadow-2xl max-w-sm w-80 text-spa-pearl">
        <div className="flex items-center justify-between pb-3 border-b border-spa-gold/20">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-spa-gold animate-ping" />
            <span className="font-brand text-xs tracking-wider text-spa-gold uppercase">Ambient Soundscape</span>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-spa-muted hover:text-spa-gold transition-colors p-1"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Player Bar */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isPlaying 
                  ? 'bg-spa-gold text-spa-bg shadow-gold-glow' 
                  : 'bg-spa-softBg text-spa-gold hover:bg-spa-cardBorder'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
            </button>
            <div>
              <p className="text-sm font-semibold text-spa-pearl">
                {presets.find(p => p.id === currentPreset)?.name}
              </p>
              <p className="text-xs text-spa-muted">
                {isPlaying ? 'Playing Relaxation Audio' : 'Click play to start soundscape'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-spa-muted hover:text-spa-gold transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-spa-gold" />}
          </button>
        </div>

        {/* Audio Wave Visualizer Simulation */}
        {isPlaying && (
          <div className="flex items-end justify-center space-x-1 h-6 my-3">
            {[40, 70, 30, 90, 60, 100, 50, 80, 45, 75, 35].map((height, i) => (
              <div
                key={i}
                className="w-1 bg-spa-gold/80 rounded-full animate-pulse"
                style={{
                  height: `${height}%`,
                  animationDuration: `${0.8 + (i % 5) * 0.2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Expanded Sound Selection & Volume Slider */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-spa-gold/15 space-y-3 animate-fadeIn">
            <div className="space-y-2">
              <label className="text-xs text-spa-muted flex justify-between">
                <span>Volume Level</span>
                <span>{Math.round(volume * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-spa-cardBorder rounded-lg appearance-none cursor-pointer accent-spa-gold"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-semibold text-spa-gold/80 uppercase tracking-wider">Atmosphere Presets</p>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => {
                  const Icon = preset.icon;
                  const isActive = currentPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => selectPreset(preset.id)}
                      className={`flex items-center space-x-2 p-2 rounded-lg text-xs transition-all text-left ${
                        isActive
                          ? 'bg-spa-gold/20 border border-spa-gold/50 text-spa-gold'
                          : 'bg-spa-softBg hover:bg-spa-cardBorder text-spa-muted hover:text-spa-pearl'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
