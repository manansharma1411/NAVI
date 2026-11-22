import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16">
      <EmptyState
        icon={<Compass className="w-6 h-6 text-brand-400" />}
        title="Page Not Found"
        description="The workspace route you navigated to does not exist or has been moved."
        action={
          <Link to="/">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Return to Workspace
            </Button>
          </Link>
        }
      />
    </div>
  );
};
