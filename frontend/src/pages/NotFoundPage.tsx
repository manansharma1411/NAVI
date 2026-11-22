import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
        <Compass className="w-8 h-8 text-brand-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
        The route you are navigating to does not exist in the NAVI workspace.
      </p>
      <Link to="/">
        <Button variant="primary">Return to Workspace</Button>
      </Link>
    </div>
  );
};
