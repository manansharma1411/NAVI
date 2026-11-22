import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavigationItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  badge?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  icon,
  label,
  badge,
  shortcut,
  onClick
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 select-none ${
          isActive
            ? 'bg-brand-500/10 text-brand-300 font-semibold border border-brand-500/20 shadow-subtle-border'
            : 'text-slate-400 hover:text-slate-200 hover:bg-surface-50 border border-transparent'
        }`
      }
    >
      <div className="flex items-center gap-2.5 truncate">
        <span className="shrink-0 transition-transform group-hover:scale-105">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {badge}
        {shortcut && (
          <span className="text-[10px] font-mono text-slate-500 bg-surface-200 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {shortcut}
          </span>
        )}
      </div>
    </NavLink>
  );
};
