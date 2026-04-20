import React, { useRef, useState, useEffect } from "react";

const stats = [
  { value: 8, suffix: "+", label: "Years Crafting Unity Worlds" },
  { value: 120, suffix: "+", label: "Playable Builds Delivered" },
  { value: 35, suffix: "%", label: "Avg FPS Boost After Optimization" },
  { value: 6, suffix: "", label: "Platforms Shipped To" },
];

const AnimatedNumber = ({ target, suffix, visible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = duration / (target / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, visible]);

  return (
    <span className="text-3xl sm:text-4xl font-display font-bold gradient-text-accent tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`text-center p-5 glass rounded-xl ${visible ? "reveal is-visible" : "reveal"}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <AnimatedNumber target={stat.value} suffix={stat.suffix} visible={visible} />
          <p className="mt-2 text-xs text-white/40 leading-snug">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
