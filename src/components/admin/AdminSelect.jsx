import React, { useEffect, useRef, useState } from 'react';

const AdminSelect = ({ value, onChange, options, disabled, className = '', 'aria-label': ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = options.find((opt) => opt.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div className={`admin-custom-select${open ? ' admin-custom-select-open' : ''}${className ? ` ${className}` : ''}`} ref={rootRef}>
      <button
        type="button"
        className="admin-select admin-custom-select-trigger"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="admin-custom-select-value">{selected?.label ?? value}</span>
      </button>
      {open && (
        <ul className="admin-custom-select-menu" role="listbox">
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={`admin-custom-select-option${opt.value === value ? ' admin-custom-select-option-active' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminSelect;
