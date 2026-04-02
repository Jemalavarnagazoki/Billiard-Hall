import { useEffect, useRef, useState } from 'react';

export default function CustomSelect({ label, name, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleSelect(nextValue) {
    onChange(name, nextValue);
    setOpen(false);
  }

  return (
    <div className="custom-select-field" ref={wrapperRef}>
      <span className="field-label">{label}</span>
      <button
        aria-expanded={open}
        className={`custom-select-trigger${open ? ' is-open' : ''}`}
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.label || placeholder}</span>
        <span className="custom-select-chevron" />
      </button>

      {open ? (
        <div className="custom-select-menu" role="listbox">
          {options.map((option) => (
            <button
              className={`custom-select-option${option.value === value ? ' is-selected' : ''}`}
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
