import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const count = Math.max(20, Math.round((W * H) / 100000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.2 + 0.05
      });
    }

    let t = 0;
    const draw = () => {
      ctx.fillStyle = '#f8fafc'; // Matches --bg-main
      ctx.fillRect(0, 0, W, H);

      // Draw Subtle Grid
      const gap = 100;
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.03)';
      ctx.lineWidth = 1;

      for (let x = (t * 0.1) % gap; x < W; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = (t * 0.1) % gap; y < H; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with faint lines
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.05 * (1 - dist / 150)})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      t += 1;
      requestAnimationFrame(draw);
    };

    const animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default CyberBackground;
