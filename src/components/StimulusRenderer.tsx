import React, { useState } from 'react';
import { ZoomIn, X, ImageOff } from 'lucide-react';
import { StimulusSpec } from '../types/assessment';
import { MathText } from './MathText';

interface StimulusRendererProps {
  stimulus: StimulusSpec;
}

export const StimulusRenderer: React.FC<StimulusRendererProps> = ({ stimulus }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (stimulus.kind === 'none') return null;

  const hasVisualSvgOrPhoto =
    stimulus.kind === 'photo' ||
    stimulus.kind.startsWith('svg_');

  const renderGraphic = (large = false) => {
    switch (stimulus.kind) {
      case 'svg_horner_table':
        return <HornerDiagram large={large} />;
      case 'svg_unit_circle':
        return <UnitCircleDiagram large={large} />;
      case 'svg_sine_graph':
        return <SineGraphDiagram large={large} />;
      case 'svg_cosine_graph':
        return <CosineGraphDiagram large={large} />;
      case 'svg_compound_angles':
        return <CompoundAnglesDiagram large={large} />;
      case 'svg_elevation_double':
        return <ElevationDoubleDiagram large={large} />;
      case 'svg_tower_wires':
        return <TowerWiresDiagram large={large} />;
      case 'svg_display_board':
        return <DisplayBoardDiagram large={large} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#1E3A8A]">{stimulus.title}</h3>
        {hasVisualSvgOrPhoto && (
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-xs font-medium text-[#1E3A8A] hover:bg-[#EFF6FF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Perbesar Visual</span>
          </button>
        )}
      </div>

      {stimulus.textContext && (
        <p className="text-sm leading-relaxed text-[#334155]">
          <MathText text={stimulus.textContext} />
        </p>
      )}

      {stimulus.imageUrl && (
        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
          {!imgError ? (
            <img
              src={stimulus.imageUrl}
              alt={stimulus.imageAlt ?? stimulus.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full max-h-[280px] object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 bg-[#EFF6FF] text-[#1E3A8A]">
              <ImageOff className="w-8 h-8 mb-2 text-[#2563EB]" aria-hidden="true" />
              <span className="text-xs font-medium">{stimulus.title}</span>
            </div>
          )}
        </div>
      )}

      {stimulus.kind.startsWith('svg_') && (
        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white p-2 sm:p-3">
          {renderGraphic(false)}
        </div>
      )}

      {stimulus.mathLines && stimulus.mathLines.length > 0 && (
        <div className="rounded-lg border border-[#DBEAFE] bg-white px-3.5 py-3 space-y-1.5">
          {stimulus.mathLines.map((line, i) => (
            <div key={i} className="text-sm sm:text-base text-[#0F172A] overflow-x-auto">
              <MathText text={`$$${line}$$`} />
            </div>
          ))}
        </div>
      )}

      {stimulus.tableHeaders && stimulus.tableRows && (
        <div className="overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#EFF6FF] border-b border-[#DBEAFE] text-[#1E3A8A]">
                {stimulus.tableHeaders.map((h, i) => (
                  <th key={i} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                    <MathText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {stimulus.tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#F8FAFC]">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2.5 text-[#334155] font-mono-tabular">
                      <MathText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stimulus.caption && (
        <p className="text-xs leading-relaxed text-[#64748B]">
          <MathText text={stimulus.caption} />
        </p>
      )}

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-16 px-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Perbesar ${stimulus.title}`}
        >
          <div className="w-full max-w-4xl rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
              <h4 className="text-sm sm:text-base font-bold text-[#0F172A] truncate">
                {stimulus.title}
              </h4>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg bg-[#EFF6FF] text-[#1E3A8A] text-xs font-semibold hover:bg-[#DBEAFE] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Tutup</span>
              </button>
            </div>

            <div className="space-y-4">
              {stimulus.imageUrl && !imgError && (
                <img
                  src={stimulus.imageUrl}
                  alt={stimulus.imageAlt ?? stimulus.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[65vh] object-contain rounded-lg border border-[#E2E8F0]"
                />
              )}
              {stimulus.kind.startsWith('svg_') && (
                <div className="rounded-lg border border-[#E2E8F0] bg-white p-3">
                  {renderGraphic(true)}
                </div>
              )}
              {stimulus.caption && (
                <p className="text-xs sm:text-sm text-[#475569]">
                  <MathText text={stimulus.caption} />
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- High-Precision Mathematical SVG Diagrams ---------- */

const HornerDiagram: React.FC<{ large: boolean }> = ({ large }) => (
  <svg
    viewBox="0 0 640 210"
    className={`w-full h-auto ${large ? 'max-h-[420px]' : 'max-h-[210px]'}`}
    role="img"
    aria-label="Skema Horner Raka untuk 6x^3 - 7x^2 - 16x + 15 dengan k = 3/2"
  >
    <rect x="0" y="0" width="640" height="210" fill="#FFFFFF" />
    <text x="20" y="28" fontSize="13" fontWeight="600" fill="#1E3A8A">
      Skema Horner (Pembagi: 2x - 3 → k = 3/2)
    </text>
    {/* Horner L-shape */}
    <line x1="115" y1="45" x2="115" y2="155" stroke="#1E3A8A" strokeWidth="2.5" />
    <line x1="115" y1="155" x2="585" y2="155" stroke="#1E3A8A" strokeWidth="2.5" />
    <line x1="505" y1="160" x2="505" y2="195" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />

    {/* k value */}
    <text x="65" y="108" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563EB">
      3/2
    </text>

    {/* Column headers */}
    <text x="175" y="54" textAnchor="middle" fontSize="11" fill="#64748B">x³</text>
    <text x="290" y="54" textAnchor="middle" fontSize="11" fill="#64748B">x²</text>
    <text x="405" y="54" textAnchor="middle" fontSize="11" fill="#64748B">x¹</text>
    <text x="545" y="54" textAnchor="middle" fontSize="11" fill="#64748B">x⁰</text>

    {/* Row 1 */}
    <text x="175" y="88" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0F172A">6</text>
    <text x="290" y="88" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0F172A">-7</text>
    <text x="405" y="88" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0F172A">-16</text>
    <text x="545" y="88" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0F172A">15</text>

    {/* Row 2 */}
    <text x="175" y="136" textAnchor="middle" fontSize="16" fill="#64748B">*</text>
    <text x="290" y="136" textAnchor="middle" fontSize="16" fontWeight="500" fill="#0284C7">9</text>
    <text x="405" y="136" textAnchor="middle" fontSize="16" fontWeight="500" fill="#0284C7">3</text>
    <text x="545" y="136" textAnchor="middle" fontSize="16" fontWeight="500" fill="#0284C7">-39/2</text>

    {/* Row 3 */}
    <text x="175" y="184" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0F172A">6</text>
    <text x="290" y="184" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0F172A">2</text>
    <text x="405" y="184" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0F172A">-13</text>
    <rect x="515" y="162" width="60" height="30" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5" />
    <text x="545" y="183" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1E3A8A">-9/2</text>
  </svg>
);

const UnitCircleDiagram: React.FC<{ large: boolean }> = ({ large }) => {
  // Center (220, 175), radius = 120
  // P = (-3/5, -4/5) -> (220 - 72, 175 + 96) = (148, 271)
  // Q = (4/5, -3/5)  -> (220 + 96, 175 + 72) = (316, 247)
  const cx = 220;
  const cy = 175;
  const r = 120;
  const px = cx - 0.6 * r;
  const py = cy + 0.8 * r;
  const qx = cx + 0.8 * r;
  const qy = cy + 0.6 * r;

  return (
    <svg
      viewBox="0 0 460 350"
      className={`w-full h-auto ${large ? 'max-h-[480px]' : 'max-h-[280px]'}`}
      role="img"
      aria-label="Lingkaran satuan x^2 + y^2 = 1 dengan titik P di Kuadran III dan titik Q hasil rotasi +90 derajat di Kuadran IV"
    >
      <rect x="0" y="0" width="460" height="350" fill="#FFFFFF" />
      {/* Subtle Grid */}
      <circle cx={cx} cy={cy} r={r} fill="#F8FAFC" stroke="#2563EB" strokeWidth="2" />
      {/* Axes */}
      <line x1="50" y1={cy} x2="395" y2={cy} stroke="#475569" strokeWidth="1.5" />
      <line x1={cx} y1="25" x2={cx} y2="325" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y={cy + 4} fontSize="13" fontWeight="600" fill="#334155">x</text>
      <text x={cx + 6} y="26" fontSize="13" fontWeight="600" fill="#334155">y</text>

      {/* Unit ticks */}
      <text x={cx + r + 6} y={cy + 14} fontSize="11" fill="#64748B">(1, 0)</text>
      <text x={cx - r - 38} y={cy + 14} fontSize="11" fill="#64748B">(-1, 0)</text>
      <text x={cx + 6} y={cy - r - 6} fontSize="11" fill="#64748B">(0, 1)</text>
      <text x={cx + 6} y={cy + r + 15} fontSize="11" fill="#64748B">(0, -1)</text>

      {/* Rays OP and OQ */}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#1E3A8A" strokeWidth="2.2" />
      <line x1={cx} y1={cy} x2={qx} y2={qy} stroke="#0284C7" strokeWidth="2.2" strokeDasharray="5 3" />

      {/* Right angle arc between OP and OQ */}
      <path d={`M ${cx - 12} ${cy + 16} L ${cx + 4} ${cy + 28} L ${cx + 16} ${cy + 12}`} fill="none" stroke="#0284C7" strokeWidth="1.5" />

      {/* Theta arc from +x axis */}
      <path d={`M ${cx + 32} ${cy} A 32 32 0 1 0 ${cx - 19.2} ${cy + 25.6}`} fill="none" stroke="#2563EB" strokeWidth="1.6" />
      <text x={cx - 42} y={cy - 20} fontSize="13" fontWeight="600" fill="#2563EB">θ</text>

      {/* Rotation arrow +90° */}
      <path d={`M ${px + 18} ${py - 8} A 95 95 0 0 0 ${qx - 14} ${qy + 12}`} fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
      <text x={cx + 12} y={cy + 104} fontSize="11" fontWeight="600" fill="#0284C7">+90°</text>

      {/* Points P and Q */}
      <circle cx={px} cy={py} r="5.5" fill="#1E3A8A" />
      <text x={px - 96} y={py + 12} fontSize="12" fontWeight="700" fill="#1E3A8A">P(-3/5, yₚ)</text>

      <circle cx={qx} cy={qy} r="5.5" fill="#0284C7" />
      <text x={qx + 10} y={qy + 8} fontSize="12" fontWeight="700" fill="#0284C7">Q(x_Q, y_Q)</text>
    </svg>
  );
};

const SineGraphDiagram: React.FC<{ large: boolean }> = ({ large }) => {
  // Exact curve: y = 3 sin(2x - pi/3) + 1 for x in [0, 7pi/6]
  // Plot box: x from 60 to 560 representing x in [0, 7pi/6] -> scaleX
  // y from 35 (y=5) to 265 (y=-3) -> scaleY: y=0 at 178.75? Let's make neat integer mapping:
  // Range y in [-3, 5] (8 units). Height = 240px (from ySvg=30 to ySvg=270), 30px per unit!
  // ySvg(val) = 30 + (5 - val) * 30 = 180 - 30 * val.
  // Check: val=5 -> 30; val=4 -> 60; val=1 -> 150; val=0 -> 180; val=-2 -> 240; val=-3 -> 270.
  // Range x in [0, 14pi/12 = 7pi/6]. Let each pi/12 = 34px -> 14 * 34 = 476px. xSvg(u) = 70 + (u / (Math.PI / 12)) * 34.
  const xToSvg = (x: number) => 70 + (x / (Math.PI / 12)) * 34;
  const yToSvg = (y: number) => 180 - 30 * y;

  const pts: string[] = [];
  const xMax = (14 * Math.PI) / 12;
  for (let i = 0; i <= 140; i++) {
    const x = (i / 140) * xMax;
    const y = 3 * Math.sin(2 * x - Math.PI / 3) + 1;
    pts.push(`${i === 0 ? 'M' : 'L'} ${xToSvg(x).toFixed(1)} ${yToSvg(y).toFixed(1)}`);
  }

  const xTicks = [
    { mult: 2, label: 'π/6' },
    { mult: 5, label: '5π/12' },
    { mult: 8, label: '2π/3' },
    { mult: 11, label: '11π/12' },
    { mult: 14, label: '7π/6' },
  ];

  return (
    <svg
      viewBox="0 0 600 305"
      className={`w-full h-auto ${large ? 'max-h-[460px]' : 'max-h-[260px]'}`}
      role="img"
      aria-label="Grafik fungsi sinus dengan titik (pi/6, 1), puncak (5pi/12, 4), dan lembah (11pi/12, -2)"
    >
      <rect x="0" y="0" width="600" height="305" fill="#FFFFFF" />
      {/* Horizontal gridlines */}
      {[-2, -1, 0, 1, 2, 3, 4].map((yv) => (
        <g key={yv}>
          <line
            x1="70"
            y1={yToSvg(yv)}
            x2="565"
            y2={yToSvg(yv)}
            stroke={yv === 0 ? '#334155' : yv === 1 ? '#93C5FD' : '#E2E8F0'}
            strokeWidth={yv === 0 ? 1.6 : 1}
            strokeDasharray={yv === 1 ? '5 4' : undefined}
          />
          <text x="58" y={yToSvg(yv) + 4} textAnchor="end" fontSize="11" fill="#475569">
            {yv}
          </text>
        </g>
      ))}
      {/* Vertical gridlines */}
      {xTicks.map((t) => {
        const xv = 70 + t.mult * 34;
        return (
          <g key={t.mult}>
            <line x1={xv} y1="35" x2={xv} y2="265" stroke="#E2E8F0" strokeWidth="1" />
            <text x={xv} y="196" textAnchor="middle" fontSize="11" fill="#1E3A8A" fontWeight="600">
              {t.label}
            </text>
          </g>
        );
      })}
      {/* Y axis */}
      <line x1="70" y1="30" x2="70" y2="270" stroke="#334155" strokeWidth="1.6" />
      <text x="64" y="24" fontSize="12" fontWeight="700" fill="#0F172A">y</text>
      <text x="572" y="184" fontSize="12" fontWeight="700" fill="#0F172A">x</text>

      {/* Curve */}
      <path d={pts.join(' ')} fill="none" stroke="#2563EB" strokeWidth="2.8" />

      {/* Highlighted exact coordinates */}
      {[
        { x: Math.PI / 6, y: 1, label: '(π/6, 1)', dx: -52, dy: -10 },
        { x: (5 * Math.PI) / 12, y: 4, label: '(5π/12, 4)', dx: 8, dy: -10 },
        { x: (11 * Math.PI) / 12, y: -2, label: '(11π/12, -2)', dx: -24, dy: 18 },
      ].map((p, idx) => (
        <g key={idx}>
          <circle cx={xToSvg(p.x)} cy={yToSvg(p.y)} r="5" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x={xToSvg(p.x) + p.dx}
            y={yToSvg(p.y) + p.dy}
            fontSize="11.5"
            fontWeight="700"
            fill="#0F172A"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const CosineGraphDiagram: React.FC<{ large: boolean }> = ({ large }) => {
  // Exact curve: y = 2 cos(2x - pi/3) - 1 for x in [0, 7pi/6]
  // y in [-4, 2]: ySvg(val) = 45 + (2 - val) * 35 = 115 - 35 * val
  // Check: val=2->45; val=1->80; val=0->115; val=-1->150; val=-3->220.
  const xToSvg = (x: number) => 70 + (x / (Math.PI / 6)) * 66;
  const yToSvg = (y: number) => 115 - 35 * y;

  const pts: string[] = [];
  const xMax = (7 * Math.PI) / 6;
  for (let i = 0; i <= 140; i++) {
    const x = (i / 140) * xMax;
    const y = 2 * Math.cos(2 * x - Math.PI / 3) - 1;
    pts.push(`${i === 0 ? 'M' : 'L'} ${xToSvg(x).toFixed(1)} ${yToSvg(y).toFixed(1)}`);
  }

  const xTicks = [
    { mult: 1, label: 'π/6' },
    { mult: 2, label: 'π/3' },
    { mult: 4, label: '2π/3' },
    { mult: 7, label: '7π/6' },
  ];

  return (
    <svg
      viewBox="0 0 600 280"
      className={`w-full h-auto ${large ? 'max-h-[460px]' : 'max-h-[250px]'}`}
      role="img"
      aria-label="Grafik fungsi cosinus melalui (0,0), puncak (pi/6, 1), lembah (2pi/3, -3), puncak (7pi/6, 1)"
    >
      <rect x="0" y="0" width="600" height="280" fill="#FFFFFF" />
      {[-3, -2, -1, 0, 1, 2].map((yv) => (
        <g key={yv}>
          <line
            x1="70"
            y1={yToSvg(yv)}
            x2="560"
            y2={yToSvg(yv)}
            stroke={yv === 0 ? '#334155' : yv === -1 ? '#93C5FD' : '#E2E8F0'}
            strokeWidth={yv === 0 ? 1.6 : 1}
            strokeDasharray={yv === -1 ? '5 4' : undefined}
          />
          <text x="58" y={yToSvg(yv) + 4} textAnchor="end" fontSize="11" fill="#475569">
            {yv}
          </text>
        </g>
      ))}
      {xTicks.map((t) => {
        const xv = 70 + t.mult * 66;
        return (
          <g key={t.mult}>
            <line x1={xv} y1="35" x2={xv} y2="245" stroke="#E2E8F0" strokeWidth="1" />
            <text x={xv} y="131" textAnchor="middle" fontSize="11" fill="#1E3A8A" fontWeight="600">
              {t.label}
            </text>
          </g>
        );
      })}
      <line x1="70" y1="30" x2="70" y2="250" stroke="#334155" strokeWidth="1.6" />
      <text x="64" y="24" fontSize="12" fontWeight="700" fill="#0F172A">y</text>
      <text x="568" y="119" fontSize="12" fontWeight="700" fill="#0F172A">x</text>

      <path d={pts.join(' ')} fill="none" stroke="#0284C7" strokeWidth="2.8" />

      {[
        { x: 0, y: 0, label: '(0, 0)', dx: 8, dy: -10 },
        { x: Math.PI / 6, y: 1, label: '(π/6, 1)', dx: 6, dy: -10 },
        { x: (2 * Math.PI) / 3, y: -3, label: '(2π/3, -3)', dx: -18, dy: 18 },
        { x: (7 * Math.PI) / 6, y: 1, label: '(7π/6, 1)', dx: -26, dy: -10 },
      ].map((p, idx) => (
        <g key={idx}>
          <circle cx={xToSvg(p.x)} cy={yToSvg(p.y)} r="5" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x={xToSvg(p.x) + p.dx}
            y={yToSvg(p.y) + p.dy}
            fontSize="11.5"
            fontWeight="700"
            fill="#0F172A"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const CompoundAnglesDiagram: React.FC<{ large: boolean }> = ({ large }) => (
  <svg
    viewBox="0 0 560 220"
    className={`w-full h-auto ${large ? 'max-h-[420px]' : 'max-h-[220px]'}`}
    role="img"
    aria-label="Dua segitiga siku-siku pada kisi persegi satuan dengan tan alfa = 1/2 dan tan beta = 1/3"
  >
    <rect x="0" y="0" width="560" height="220" fill="#FFFFFF" />
    {/* Left Triangle: base 2 (120px), height 1 (60px) */}
    <g transform="translate(45, 50)">
      {[0, 60, 120].map((x) => (
        <line key={`lx${x}`} x1={x} y1="0" x2={x} y2="120" stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {[0, 60, 120].map((y) => (
        <line key={`ly${y}`} x1="0" y1={y} x2="120" y2={y} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      <polygon points="0,120 120,120 120,60" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.4" />
      <rect x="108" y="108" width="12" height="12" fill="none" stroke="#1E3A8A" strokeWidth="1.4" />
      <path d="M 32 120 A 32 32 0 0 0 28.6 105.7" fill="none" stroke="#1E3A8A" strokeWidth="1.8" />
      <text x="38" y="114" fontSize="13" fontWeight="700" fill="#1E3A8A">α</text>
      <text x="60" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">2 satuan</text>
      <text x="132" y="94" fontSize="12" fontWeight="600" fill="#334155">1 satuan</text>
    </g>

    {/* Right Triangle: base 3 (180px), height 1 (60px) */}
    <g transform="translate(280, 50)">
      {[0, 60, 120, 180].map((x) => (
        <line key={`rx${x}`} x1={x} y1="0" x2={x} y2="120" stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {[0, 60, 120].map((y) => (
        <line key={`ry${y}`} x1="0" y1={y} x2="180" y2={y} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      <polygon points="0,120 180,120 180,60" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2.4" />
      <rect x="168" y="108" width="12" height="12" fill="none" stroke="#0369A1" strokeWidth="1.4" />
      <path d="M 36 120 A 36 36 0 0 0 34.2 108.6" fill="none" stroke="#0369A1" strokeWidth="1.8" />
      <text x="42" y="114" fontSize="13" fontWeight="700" fill="#0369A1">β</text>
      <text x="90" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">3 satuan</text>
      <text x="192" y="94" fontSize="12" fontWeight="600" fill="#334155">1 satuan</text>
    </g>
  </svg>
);

const ElevationDoubleDiagram: React.FC<{ large: boolean }> = ({ large }) => (
  <svg
    viewBox="0 0 600 260"
    className={`w-full h-auto ${large ? 'max-h-[440px]' : 'max-h-[240px]'}`}
    role="img"
    aria-label="Diagram sudut elevasi ganda 30 derajat dari A dan 60 derajat dari B dengan jarak AB = 40 m dan tinggi teodolit 1,6 m"
  >
    <rect x="0" y="0" width="600" height="260" fill="#FFFFFF" />
    {/* Ground */}
    <line x1="35" y1="225" x2="560" y2="225" stroke="#475569" strokeWidth="2" />
    {/* Eye-level horizontal line (1.6m above ground) */}
    <line x1="65" y1="195" x2="495" y2="195" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 4" />

    {/* Lighthouse tower at x=495 */}
    <rect x="485" y="40" width="22" height="185" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2" />
    <polygon points="482,40 510,40 496,24" fill="#1E3A8A" />

    {/* Tripods at A (x=85) and B (x=345) */}
    <line x1="85" y1="195" x2="85" y2="225" stroke="#1E3A8A" strokeWidth="2.5" />
    <line x1="345" y1="195" x2="345" y2="225" stroke="#1E3A8A" strokeWidth="2.5" />

    {/* Sight lines to top C(496, 24) */}
    <line x1="85" y1="195" x2="496" y2="24" stroke="#2563EB" strokeWidth="2" />
    <line x1="345" y1="195" x2="496" y2="24" stroke="#0284C7" strokeWidth="2" />

    {/* Labels */}
    <circle cx="85" cy="195" r="4" fill="#1E3A8A" />
    <circle cx="345" cy="195" r="4" fill="#1E3A8A" />
    <circle cx="496" cy="24" r="4" fill="#1E3A8A" />
    <text x="72" y="188" fontSize="12" fontWeight="700" fill="#0F172A">A</text>
    <text x="332" y="188" fontSize="12" fontWeight="700" fill="#0F172A">B</text>
    <text x="515" y="30" fontSize="12" fontWeight="700" fill="#0F172A">C (Puncak)</text>
    <text x="515" y="200" fontSize="11" fontWeight="600" fill="#475569">D</text>

    {/* Angles */}
    <text x="128" y="190" fontSize="12" fontWeight="700" fill="#2563EB">30°</text>
    <text x="366" y="188" fontSize="12" fontWeight="700" fill="#0284C7">60°</text>

    {/* Dimensions */}
    <text x="215" y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A">40 m</text>
    <text x="515" y="116" fontSize="12" fontWeight="600" fill="#1E3A8A">h&apos;</text>
    <text x="515" y="214" fontSize="11" fontWeight="600" fill="#475569">1,6 m</text>
  </svg>
);

const TowerWiresDiagram: React.FC<{ large: boolean }> = ({ large }) => (
  <svg
    viewBox="0 0 580 250"
    className={`w-full h-auto ${large ? 'max-h-[430px]' : 'max-h-[230px]'}`}
    role="img"
    aria-label="Menara 15 meter dengan dua kawat penopang bersudut elevasi teta dan dua teta"
  >
    <rect x="0" y="0" width="580" height="250" fill="#FFFFFF" />
    {/* Ground */}
    <line x1="40" y1="210" x2="540" y2="210" stroke="#475569" strokeWidth="2" />
    {/* Tower at x=470 */}
    <line x1="470" y1="40" x2="470" y2="210" stroke="#1E3A8A" strokeWidth="4" />
    <rect x="458" y="198" width="12" height="12" fill="none" stroke="#1E3A8A" strokeWidth="1.4" />
    {/* Wires: P1(90,210), P2(360,210) to top(470,40) */}
    <line x1="90" y1="210" x2="470" y2="40" stroke="#2563EB" strokeWidth="2.2" />
    <line x1="360" y1="210" x2="470" y2="40" stroke="#0284C7" strokeWidth="2.2" />

    <circle cx="90" cy="210" r="4.5" fill="#2563EB" />
    <circle cx="360" cy="210" r="4.5" fill="#0284C7" />
    <circle cx="470" cy="40" r="4.5" fill="#1E3A8A" />

    <text x="80" y="230" fontSize="12" fontWeight="700" fill="#0F172A">Pancang 1</text>
    <text x="342" y="230" fontSize="12" fontWeight="700" fill="#0F172A">Pancang 2</text>
    <text x="482" y="130" fontSize="13" fontWeight="700" fill="#1E3A8A">15 m</text>
    <text x="148" y="202" fontSize="13" fontWeight="700" fill="#2563EB">θ</text>
    <text x="382" y="198" fontSize="13" fontWeight="700" fill="#0284C7">2θ</text>
    <text x="260" y="116" fontSize="12" fontWeight="600" fill="#2563EB">Kawat 1</text>
    <text x="424" y="148" fontSize="12" fontWeight="600" fill="#0284C7">Kawat 2</text>
  </svg>
);

const DisplayBoardDiagram: React.FC<{ large: boolean }> = ({ large }) => (
  <svg
    viewBox="0 0 580 255"
    className={`w-full h-auto ${large ? 'max-h-[430px]' : 'max-h-[235px]'}`}
    role="img"
    aria-label="Diagram sudut pandang papan digital setinggi 6 m di atas penyangga 2 m pada jarak d meter"
  >
    <rect x="0" y="0" width="580" height="255" fill="#FFFFFF" />
    {/* Eye-level horizontal */}
    <line x1="85" y1="210" x2="495" y2="210" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" />
    {/* Support pole (2m -> 40px) + Digital board (6m -> 120px) */}
    <line x1="475" y1="170" x2="475" y2="210" stroke="#64748B" strokeWidth="4" />
    <rect x="469" y="50" width="12" height="120" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="2.2" />

    {/* Sight rays from observer eye (100, 210) */}
    <line x1="100" y1="210" x2="469" y2="50" stroke="#2563EB" strokeWidth="2" />
    <line x1="100" y1="210" x2="469" y2="170" stroke="#0284C7" strokeWidth="2" />

    {/* Observer point */}
    <circle cx="100" cy="210" r="5" fill="#1E3A8A" />
    <text x="64" y="230" fontSize="12" fontWeight="700" fill="#0F172A">Mata Pengamat</text>

    {/* Angle arcs */}
    <path d="M 168 210 A 68 68 0 0 0 163 183" fill="none" stroke="#2563EB" strokeWidth="1.8" />
    <text x="178" y="184" fontSize="12" fontWeight="700" fill="#2563EB">α (ke tepi atas)</text>
    <text x="210" y="204" fontSize="12" fontWeight="700" fill="#0284C7">β (ke tepi bawah)</text>
    <text x="285" y="156" fontSize="12" fontWeight="700" fill="#1E3A8A">θ = α - β</text>

    {/* Dimensions */}
    <text x="490" y="115" fontSize="12" fontWeight="700" fill="#1E3A8A">6 m (Papan)</text>
    <text x="490" y="194" fontSize="12" fontWeight="600" fill="#475569">2 m</text>
    <text x="285" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">d meter</text>
  </svg>
);
