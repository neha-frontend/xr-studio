import './spinner.css';

const Spinner = ({ className = '', spinnerClassName = '' }) => (
  <div className={`d-flex justify-content-center ${className}`}>
    <div className={`spinner-border ${spinnerClassName}`} role="status">
      <span className="sr-only"></span>
    </div>
  </div>
);

export default Spinner;
