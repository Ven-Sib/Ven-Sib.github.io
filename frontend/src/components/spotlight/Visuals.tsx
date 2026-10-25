import { useEffect, useState } from 'react';

/* ---------- helpers ---------- */
export function useReducedMotion() {
  const [r, setR] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!m) return;
    const on = () => setR(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}

/** counter that goes up every `ms` (frozen when the visitor prefers reduced motion) */
function useTick(ms: number) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(8);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setT((v) => v + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, reduced]);
  return { t, reduced };
}

const hex = (k: number) => ((k * 2654435761) >>> 0).toString(16).padStart(8, '0');
const ms = (k: number) => 18 + ((k * 37) % 64);

function SimTag() {
  return (
    <span className="sim-tag">
      <i /> simulated activity
    </span>
  );
}

function Node({ x, y = 8, w, label, sub, on }: { x: number; y?: number; w: number; label: string; sub: string; on: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={42} rx={10} className={`vnode ${on ? 'on' : ''}`} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" className="vtext">{label}</text>
      <text x={x + w / 2} y={y + 32} textAnchor="middle" className="vsub">{sub}</text>
    </g>
  );
}

function LogLines({ lines }: { lines: { k: number; text: string }[] }) {
  return (
    <div className="vlog" aria-hidden>
      {lines.map((l, i) => (
        <div key={l.k} className={`vlog-line ${i === lines.length - 1 ? 'new' : ''}`}>
          <span className="text-aqua/70">›</span> {l.text}
        </div>
      ))}
    </div>
  );
}

/* ---------- 1. Security: passkey login + signed transaction ---------- */
const AUTH_POOL: ((k: number) => string)[] = [
  () => 'webauthn.challenge issued',
  (k) => `webauthn.verify ✓ ${ms(k)}ms`,
  () => 'tls1.3 session established',
  () => 'signature.ecdsa verified ✓',
  (k) => `audit.append sha256:${hex(k)}`,
  () => 'rbac: role=teller → allow',
];

export function AuthVisual() {
  const { t, reduced } = useTick(1300);
  const active = t % 3;
  const lines = [t - 3, t - 2, t - 1, t].map((k) => ({ k, text: AUTH_POOL[k % AUTH_POOL.length](k) }));
  return (
    <div className="visual">
      <svg viewBox="0 0 320 58" className="w-full" role="img" aria-label="Passkey login flowing through a gateway to an auth service">
        <path d="M92 29 H118 M202 29 H228" className="vline" />
        <Node x={8} w={84} label="Passkey" sub="device key" on={active === 0} />
        <Node x={118} w={84} label="Gateway" sub="TLS 1.3" on={active === 1} />
        <Node x={228} w={84} label="Auth" sub="verify + sign" on={active === 2} />
        {!reduced && (
          <circle r="3.5" className="vdot">
            <animateMotion dur="3.9s" repeatCount="indefinite" path="M50 29 H270" />
          </circle>
        )}
      </svg>
      <LogLines lines={lines} />
      <SimTag />
    </div>
  );
}

/* ---------- 2. AI agent: claim → sources → compare → verdict ---------- */
const VERDICTS: { label: string; conf: number; tone: string }[] = [
  { label: 'Supported', conf: 0.91, tone: 'ok' },
  { label: 'Misleading', conf: 0.87, tone: 'bad' },
  { label: 'Unverified', conf: 0.58, tone: 'mid' },
];

export function PipelineVisual() {
  const { t } = useTick(1100);
  const step = t % 6; // 0..3 build up, 4..5 hold on the verdict
  const cycle = Math.floor(t / 6);
  const v = VERDICTS[cycle % VERDICTS.length];
  const done = step >= 3;
  const nodes = [
    { label: 'Claim', sub: `#${1000 + cycle}` },
    { label: 'Sources', sub: step >= 1 ? '3 found' : '…' },
    { label: 'Compare', sub: step >= 2 ? `match ${(v.conf - 0.04).toFixed(2)}` : '…' },
    { label: 'Verdict', sub: done ? v.label : '…' },
  ];
  return (
    <div className="visual">
      <svg viewBox="0 0 320 58" className="w-full" role="img" aria-label="Claim passing through source retrieval and comparison to a verdict">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${6 + i * 80 + 68} 29 H${6 + (i + 1) * 80}`} className={`vline ${step > i ? 'lit' : ''}`} />
        ))}
        {nodes.map((n, i) => (
          <Node key={n.label} x={6 + i * 80} w={68} label={n.label} sub={n.sub} on={step >= i} />
        ))}
      </svg>
      <div className="mt-3 flex items-center gap-3">
        <span className={`vchip ${done ? v.tone : 'idle'}`}>{done ? v.label : 'analyzing…'}</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden" aria-hidden>
          <div className={`h-full rounded-full vbar ${done ? v.tone : 'idle'}`} style={{ width: done ? `${v.conf * 100}%` : '8%' }} />
        </div>
        <span className="font-mono text-[11px] text-mute w-9 text-right">{done ? v.conf.toFixed(2) : '—'}</span>
      </div>
      <div className="vlog mt-3" aria-hidden>
        <div className="vlog-line"><span className="text-aqua/70">›</span> retrieve(trusted_sources) → {step >= 1 ? '3 documents' : 'pending'}</div>
        <div className="vlog-line"><span className="text-aqua/70">›</span> compare(claim, evidence) → {step >= 2 ? 'scored' : 'pending'}</div>
        <div className="vlog-line"><span className="text-aqua/70">›</span> assess() → {done ? `${v.label.toLowerCase()} + source links` : 'pending'}</div>
      </div>
      <SimTag />
    </div>
  );
}

/* ---------- 3. Cloud: requests routed through a broker to providers ---------- */
const PROVIDERS = ['AWS', 'Azure', 'GCP', 'K8s'];

export function BrokerVisual() {
  const { t, reduced } = useTick(1200);
  const cycle = Math.floor(t / 4);
  const phase = t % 4;
  const p = cycle % PROVIDERS.length;
  const prov = PROVIDERS[p];
  const tpl = `tpl-${prov.toLowerCase()}`;
  const cmds = [
    `$ orb machines request ${tpl} 3`,
    'status: provisioning…',
    'status: running ✓  3/3 machines',
    `$ orb machines return m-${hex(cycle).slice(0, 4)}`,
  ];
  const lines = [t - 3, t - 2, t - 1, t].map((k) => ({ k, text: cmds[((k % 4) + 4) % 4] }));
  const py = (i: number) => 5 + i * 19;
  return (
    <div className="visual">
      <svg viewBox="0 0 320 82" className="w-full" role="img" aria-label="Requests flowing through a broker to cloud providers">
        {[20, 38, 56].map((y, i) => (
          <g key={y}>
            <circle cx="14" cy={y} r="4" className="vnode on" />
            <path d={`M20 ${y} L120 41`} className="vline" />
            {!reduced && (
              <circle r="2.6" className="vdot">
                <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M20 ${y} L120 41`} />
              </circle>
            )}
          </g>
        ))}
        <rect x="120" y="20" width="80" height="42" rx="10" className="vnode on" />
        <text x="160" y="38" textAnchor="middle" className="vtext">ORB</text>
        <text x="160" y="52" textAnchor="middle" className="vsub">unified API</text>
        {PROVIDERS.map((name, i) => (
          <g key={name}>
            <path d={`M200 41 L252 ${py(i) + 8}`} className={`vline ${i === p && phase > 0 ? 'lit' : ''}`} />
            <rect x="252" y={py(i)} width="62" height="16" rx="8" className={`vnode ${i === p ? 'on' : ''}`} />
            <text x="283" y={py(i) + 11.5} textAnchor="middle" className="vsub" style={{ fill: i === p ? 'var(--color-ink)' : undefined }}>{name}</text>
          </g>
        ))}
      </svg>
      <LogLines lines={lines} />
      <SimTag />
    </div>
  );
}
