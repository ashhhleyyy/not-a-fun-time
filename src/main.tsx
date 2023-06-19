import { render } from 'preact';
import { App, CLOCK_MODES, ClockMode } from './app';
import './index.css';
import '@fontsource/poppins';

const query = new URLSearchParams(window.location.search);

let forceMode: ClockMode | null = null;
if (query.has('mode')) {
    let mode = query.get('mode')!;
    if (CLOCK_MODES.includes(mode)) {
        forceMode = mode as ClockMode;
    }
}

if (query.has('background')) {
    document.body.style.setProperty('--background', query.get('background'));
} else if (query.has('background_hex')) {
    document.body.style.setProperty('--background', '#' + query.get('background_hex'));
}

if (query.has('foreground')) {
    document.body.style.setProperty('--foreground', query.get('foreground'));
} else if (query.has('foreground_hex')) {
    document.body.style.setProperty('--foreground', '#' + query.get('foreground_hex'));
}

render(<App forceMode={forceMode} />, document.getElementById('app')!);
