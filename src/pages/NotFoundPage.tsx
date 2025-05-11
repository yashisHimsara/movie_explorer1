import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <Film className="w-20 h-20 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for isn't in our collection.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;