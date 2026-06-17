'use client';

import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { TEXT } from '../lib/text';

interface UserDropdownProps {
  onClose: () => void;
}

export function UserDropdown({ onClose }: UserDropdownProps) {
  const { user, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose, true);

  function handleLogout() {
    logout();
    onClose();
  }

  return (
    <div ref={ref} className="epicure-user-dropdown" role="menu" aria-label={TEXT.userDropdown.ariaLabel}>
      <p className="epicure-user-dropdown__name">{user?.name}</p>
      <button
        type="button"
        className="epicure-user-dropdown__logout"
        onClick={handleLogout}
      >
        {TEXT.userDropdown.logoutBtn}
      </button>
    </div>
  );
}
