import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-error-50 text-error-700 p-4 rounded-md flex items-start">
      <AlertCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;