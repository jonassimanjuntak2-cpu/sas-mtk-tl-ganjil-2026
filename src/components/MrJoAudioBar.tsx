import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Pause, Play, RotateCcw, Square } from 'lucide-react';

interface MrJoAudioBarProps {
  scriptText: string;
  label?: string;
  compact?: boolean;
}

type SpeechStatus = 'idle' | 'playing' | 'paused';

function pickIndonesianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
  if (idVoices.length === 0) return null;
  // Prefer natural Google / Microsoft / female-or-male natural voices if available
  const preferred = idVoices.find(
    (v) =>
      v.name.toLowerCase().includes('google') ||
      v.name.toLowerCase().includes('natural') ||
      v.name.toLowerCase().includes('ardit') ||
      v.name.toLowerCase().includes('gadis')
  );
  return preferred ?? idVoices[0];
}

export const MrJoAudioBar: React.FC<MrJoAudioBarProps> = ({
  scriptText,
  label = 'Dengarkan Soal',
  compact = false,
}) => {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [voiceInfo, setVoiceInfo] = useState<string>('Suara Bahasa Indonesia (id-ID)');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const updateVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const chosen = pickIndonesianVoice(voices);
      if (chosen) {
        setVoiceInfo(`Suara id-ID · ${chosen.name}`);
      }
    };

    updateVoice();
    window.speechSynthesis.addEventListener?.('voiceschanged', updateVoice);

    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', updateVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop speech when script changes (e.g. changing question)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
  }, [scriptText]);

  const startSpeech = () => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const chosen = pickIndonesianVoice(window.speechSynthesis.getVoices());
    if (chosen) {
      utterance.voice = chosen;
    }

    utterance.onstart = () => setStatus('playing');
    utterance.onpause = () => setStatus('paused');
    utterance.onresume = () => setStatus('playing');
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');

    utteranceRef.current = utterance;
    setStatus('playing');
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  };

  const handleResume = () => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setStatus('playing');
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setStatus('idle');
  };

  return (
    <div
      className={`rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] ${
        compact ? 'p-3' : 'p-3.5 sm:p-4'
      }`}
      aria-label="Kontrol Audio Narator MR JO"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#1E3A8A]">
            <Volume2 className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
            <span>MR JO – MATHEMATICS LEARNING GUIDE</span>
          </div>
          <p className="text-[11px] text-[#475569] mt-0.5 truncate">
            {isSupported
              ? `${voiceInfo} · ${status === 'playing' ? 'Sedang membacakan...' : status === 'paused' ? 'Dijeda' : 'Siap membacakan'}`
              : 'Web Speech API tidak tersedia pada browser ini'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={startSpeech}
            disabled={!isSupported}
            className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </button>

          <button
            type="button"
            onClick={handlePause}
            disabled={!isSupported || status !== 'playing'}
            className="inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium hover:bg-[#F8FAFC] disabled:opacity-45 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Jeda</span>
          </button>

          <button
            type="button"
            onClick={handleResume}
            disabled={!isSupported || status !== 'paused'}
            className="inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium hover:bg-[#F8FAFC] disabled:opacity-45 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Lanjutkan</span>
          </button>

          <button
            type="button"
            onClick={startSpeech}
            disabled={!isSupported || status === 'idle'}
            className="inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium hover:bg-[#F8FAFC] disabled:opacity-45 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ulangi</span>
          </button>

          <button
            type="button"
            onClick={handleStop}
            disabled={!isSupported || status === 'idle'}
            className="inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-medium hover:bg-[#F8FAFC] disabled:opacity-45 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Square className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Berhenti</span>
          </button>
        </div>
      </div>
    </div>
  );
};
