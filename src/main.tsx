import ReactDOM from 'react-dom/client';

import { FilterProvider } from './context/filters';
import { App } from './App';

import './main.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <FilterProvider>
        <App />
    </FilterProvider>
);
