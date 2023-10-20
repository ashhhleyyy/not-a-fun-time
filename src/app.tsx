import { useEffect, useState } from 'preact/hooks';
import { AboutModal } from './about';

export function App({ forceMode }: { forceMode: ClockMode | null; }) {
    const [now, setNow] = useState(new Date());
    const [mode, setMode] = useState<ClockMode>(forceMode || 'normal');

    const [showAbout, setShowAbout] = useState(false);

    function updateMode(mode: ClockMode) {
        setMode(mode);
        window.localStorage.setItem('mode', mode);
    }

    useEffect(() => {
        if (!forceMode) {
            const storedMode = window.localStorage.getItem('mode');
            if (storedMode) {
                setMode(storedMode as ClockMode);
            }
        }
    });

    useEffect(() => {
        const ival = setInterval(() => {
            setNow(new Date());
        }, mode === 'unix' ? 1 : 100);
        return () => clearInterval(ival);
    }, []);

    return (
        <>
            <h1>
                {mode === 'normal' && (
                    <>
                        {now.getHours()}:{pad(now.getMinutes())}:
                        {pad(now.getSeconds())}
                    </>
                )}
                {mode === 'degrees' && (
                    <DegreesClock
                        h={now.getHours() % 12}
                        m={now.getMinutes()}
                        s={now.getSeconds()}
                    />
                )}
                {mode === 'radians' && (
                    <RadiansClock
                        h={now.getHours() % 12}
                        m={now.getMinutes()}
                        s={now.getSeconds()}
                    />
                )}
                {mode === 'unix' && (
                    <>{now.getTime()}</>
                )}
            </h1>

            {!forceMode && <Switch mode={mode} setMode={updateMode} />}

            {!forceMode && <button class='about-button' onClick={() => setShowAbout(true)}>
                ?
            </button>}

            {showAbout && <AboutModal close={() => setShowAbout(false)} />}
        </>
    );
}

type Time = { h: number; m: number; s: number };

const remap12 = (v: number, target: number, shouldRound: boolean) => {
    const mapped = remapRange(v, 12, target);
    return shouldRound ? round(mapped) : mapped.toFixed(0);
};
const remap60 = (v: number, target: number, shouldRound: boolean) => {
    const mapped = remapRange(v, 60, target);
    return shouldRound ? round(mapped) : mapped.toFixed(0);
};

function RadiansClock({ h, m, s }: Time) {
    return (
        <>
            {remap12(h, 2, true)}&pi;:{remap60(m, 2, true)}&pi;:
            {remap60(s, 2, true)}&pi;
        </>
    );
}

function DegreesClock({ h, m, s }: Time) {
    return (
        <>
            {remap12(h, 360, false)}&deg;:{remap60(m, 360, false)}&deg;:
            {remap60(s, 360, false)}&deg;
        </>
    );
}

function remapRange(
    v: number,
    inputRange: number,
    outputRange: number
): number {
    return (v / inputRange) * outputRange;
}

function round(v: number): string {
    return v.toPrecision(3);
}

function pad(v: number): string {
    return v.toString().padStart(2, '0');
}

export const CLOCK_MODES: string[] = [ 'normal', 'radians', 'degrees', 'unix' ];
export type ClockMode = 'normal' | 'radians' | 'degrees' | 'unix';

function Switch({
    mode,
    setMode,
}: {
    mode: ClockMode;
    setMode: (mode: ClockMode) => void;
}) {
    return (
        <div class='switch-bar'>
            <button
                class={'switch-item' + (mode === 'normal' ? ' selected' : '')}
                onClick={() => setMode('normal')}
            >
                Normal
            </button>
            <button
                class={'switch-item' + (mode === 'degrees' ? ' selected' : '')}
                onClick={() => setMode('degrees')}
            >
                Degrees
            </button>
            <button
                class={'switch-item' + (mode === 'radians' ? ' selected' : '')}
                onClick={() => setMode('radians')}
            >
                Radians
            </button>
            <button
                class={'switch-item' + (mode === 'radians' ? ' selected' : '')}
                onClick={() => setMode('unix')}
            >
                Unix
            </button>
        </div>
    );
}
