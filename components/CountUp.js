'use client';
import React, { useEffect, useRef, useState } from "react";

export default function CountUp({
  end,
  duration = 1200,
  decimals = 0,
  className = "",
  startOnVisible = true,
  formatType = "number",
  currency = "EUR",
  locale = "fr-FR"
}) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnVisible);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const elRef = useRef(null);

  useEffect(() => {
    if (startOnVisible && !hasStarted) {
      if (!elRef.current) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasStarted(true);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(elRef.current);
      return () => obs.disconnect();
    }
  }, [startOnVisible, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    startRef.current = null;

    const step = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const current = end * easeOutCubic(progress);
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, decimals, hasStarted]);

  // Built-in formatters without external function
  const formatValue = (val) => {
    switch (formatType) {
      case "currency":
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency
        }).format(val);
      case "percent":
        return new Intl.NumberFormat(locale, {
          style: 'percent',
          minimumFractionDigits: decimals
        }).format(val / 100);
      case "number":
      default:
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(val);
    }
  };

  const displayed = formatValue(value);

  return (
    <span ref={elRef} className={`inline-block ${className}`}>
      {displayed}
    </span>
  );
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}