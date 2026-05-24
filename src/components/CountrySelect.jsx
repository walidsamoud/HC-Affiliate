"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRY_OPTIONS } from "../lib/countries";

export default function CountrySelect({ value, onChange, placeholder, label, required }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);

  const selected = COUNTRY_OPTIONS.find((c) => c.code === value) || null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (code) => {
    onChange(code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="cx-country-select" ref={wrapRef}>
      {label ? <label className="cx-field__label">{label}</label> : null}
      <button
        type="button"
        className="cx-country-select__trigger cx-field__input"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {selected ? (
          <span>
            {selected.name} <span className="cx-country-select__code">({selected.code})</span>
          </span>
        ) : (
          <span className="cx-country-select__placeholder">{placeholder}</span>
        )}
        <span className="cx-country-select__chevron" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="cx-country-select__panel">
          <input
            className="cx-country-select__search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          <ul className="cx-country-select__list" role="listbox">
            {filtered.length === 0 ? (
              <li className="cx-country-select__empty">—</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    className={`cx-country-select__option${value === c.code ? " is-selected" : ""}`}
                    onClick={() => pick(c.code)}
                    role="option"
                    aria-selected={value === c.code}
                  >
                    <span>{c.name}</span>
                    <span className="cx-country-select__code">{c.code}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      {required && !value ? (
        <input
          tabIndex={-1}
          required
          value=""
          onChange={() => {}}
          style={{ opacity: 0, height: 0, position: "absolute", pointerEvents: "none" }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
