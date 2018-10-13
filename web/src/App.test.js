import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


describe('<App />', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = document.querySelector('body');
  body.appendChild(modalRoot);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
