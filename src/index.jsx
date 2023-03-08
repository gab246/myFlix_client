import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

//indicated you need to bundle './index.scss'
import './index.scss';
//main component 
const App = () => {
  return <MainView />;
};
  

//finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

//tells react to render app i the root DOM element
root.render(<App />);