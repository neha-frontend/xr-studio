import { createPortal } from 'react-dom';

function ReactPortal({ children, wrapperId }) {
  return createPortal(children, document.getElementById(wrapperId));
}
export default ReactPortal;
