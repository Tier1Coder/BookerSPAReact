import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import './App.css';
import reportWebVitals from './reportWebVitals.js';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals(console.log);
