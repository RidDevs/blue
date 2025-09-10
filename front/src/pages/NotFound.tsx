import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl font-bold text-white">404</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-foreground">Page not found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors shadow-eco"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
