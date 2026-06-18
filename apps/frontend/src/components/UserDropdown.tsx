'use client';

import { useRef, type RefObject } from 'react';
import { useAuth } from '../context/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { TEXT } from '../lib/text';

interface UserDropdownProps {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function UserDropdown({ onClose, triggerRef }: UserDropdownProps) {
  const { user, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose, true, triggerRef);

  function handleLogout() {
    logout();
    onClose();
  }

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <div ref={ref} className="epicure-user-dropdown" role="menu" aria-label={TEXT.userDropdown.ariaLabel}>
      <div className="epicure-user-dropdown__avatar" aria-hidden="true">{initial}</div>
      <p className="epicure-user-dropdown__name">{user?.name}</p>
      <p className="epicure-user-dropdown__email">{user?.email}</p>
      <hr className="epicure-user-dropdown__divider" />
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
