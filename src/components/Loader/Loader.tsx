import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader-backdrop">
      <div className="loader">
        <div className="spinner"></div>
        <span>Loading countries...</span>
      </div>
    </div>
  );
}
