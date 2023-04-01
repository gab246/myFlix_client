import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
//indicated you need to bundle './index.scss'
import './index.scss';
import Container from 'react-bootstrap/Container';

//main component 
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};
  

//finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

//tells react to render app i the root DOM element
root.render(<App />);