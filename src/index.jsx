import { createRoot } from 'react-dom/client';

//indicated you need to bundle './index.scss'
import './index.scss';
//main component 
const MyFlixApplication = () => {
  return (
    <div className='my-flix'>
      <div>Hello</div>
    </div>
  );
};

//finds root of app
const container = document.querySelector('#root');
const root = createRoot(container);

//tells react to render app i the root DOM element
root.render(<MyFlixApplication />);