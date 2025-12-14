import './loader.css';

const AppLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default AppLoader;
