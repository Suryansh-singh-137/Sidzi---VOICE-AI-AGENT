"use client";

import React, { useEffect, useRef } from "react";

interface AcousticWaveRibbonProps {
  isCalling?: boolean;
  className?: string;
}

export default function AcousticWaveRibbon({
  isCalling = false,
  className = "",
}: AcousticWaveRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Speed adjusts slightly when active call
      const speed = isCalling ? 0.022 : 0.009;
      time += speed;

      // Base midline and amplitude
      const centerY = height * 0.48;
      const baseAmp = height * 0.28;
      const callBoost = isCalling ? 1.25 : 1.0;

      // We render a composite of 3 twisting parametric ribbons with transverse cross-strands
      // to recreate the iridescent silk / 3D acoustic waveform seen in the reference.

      // Function to calculate curve parameters at normalized x (0 to 1)
      const getWavePoint = (
        normX: number,
        layerOffset: number,
        t: number,
        ampScale = 1.0
      ) => {
        // Multi-harmonic sinusoidal wave creating the natural undulating crests and troughs
        const freq1 = 2.4;
        const freq2 = 4.8;
        const freq3 = 1.2;

        const w1 = Math.sin(normX * Math.PI * freq1 - t + layerOffset);
        const w2 = Math.cos(normX * Math.PI * freq2 + t * 0.7 - layerOffset) * 0.35;
        const w3 = Math.sin(normX * Math.PI * freq3 - t * 0.4) * 0.2;

        // Envelope so wave tapers gracefully at screen edges
        const envelope = Math.sin(normX * Math.PI) * 0.3 + 0.7;

        const waveHeight = (w1 + w2 + w3) * baseAmp * ampScale * callBoost * envelope;
        const y = centerY + waveHeight;

        // Depth perspective / twist calculation
        const twist = Math.sin(normX * Math.PI * 3.2 - t * 0.8 + layerOffset);
        const ribbonWidth = (28 + Math.cos(normX * Math.PI * 4 - t) * 14 + twist * 20) * (height / 280);

        return {
          x: normX * width,
          y,
          width: Math.max(14, ribbonWidth),
          twist,
        };
      };

      // 1. Soft Ambient Ground Glow Shadow under the wave
      ctx.save();
      ctx.beginPath();
      const shadowSteps = 60;
      for (let i = 0; i <= shadowSteps; i++) {
        const nx = i / shadowSteps;
        const pt = getWavePoint(nx, 0, time, 0.95);
        if (i === 0) ctx.moveTo(pt.x, pt.y + pt.width * 0.6 + 18);
        else ctx.lineTo(pt.x, pt.y + pt.width * 0.6 + 18);
      }
      ctx.strokeStyle = "rgba(13, 148, 136, 0.12)";
      ctx.lineWidth = 36;
      ctx.filter = "blur(18px)";
      ctx.stroke();
      ctx.restore();

      // 2. Secondary Under-Ribbon (Soft iridescent depth)
      ctx.save();
      const underGrad = ctx.createLinearGradient(0, centerY - baseAmp, width, centerY + baseAmp);
      underGrad.addColorStop(0.0, "rgba(20, 184, 166, 0.15)");
      underGrad.addColorStop(0.3, "rgba(6, 182, 212, 0.3)");
      underGrad.addColorStop(0.65, "rgba(192, 132, 252, 0.35)");
      underGrad.addColorStop(0.85, "rgba(45, 212, 191, 0.25)");
      underGrad.addColorStop(1.0, "rgba(13, 148, 136, 0.15)");

      ctx.beginPath();
      const steps = 140;
      // Top edge of under-ribbon
      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0.5, time * 0.8, 0.85);
        const yTop = pt.y - pt.width * 0.45;
        if (i === 0) ctx.moveTo(pt.x, yTop);
        else ctx.lineTo(pt.x, yTop);
      }
      // Bottom edge
      for (let i = steps; i >= 0; i--) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0.5, time * 0.8, 0.85);
        const yBottom = pt.y + pt.width * 0.45;
        ctx.lineTo(pt.x, yBottom);
      }
      ctx.closePath();
      ctx.fillStyle = underGrad;
      ctx.fill();
      ctx.restore();

      // 3. Main Primary Silk Acoustic Ribbon
      // Create rich multi-stop gradient matching the turquoise / aqua / lavender palette
      const mainGrad = ctx.createLinearGradient(0, centerY - baseAmp, width, centerY + baseAmp);
      mainGrad.addColorStop(0.0, "rgba(13, 148, 136, 0.75)");  // Deep teal
      mainGrad.addColorStop(0.18, "rgba(20, 184, 166, 0.85)"); // Vibrant teal
      mainGrad.addColorStop(0.35, "rgba(6, 182, 212, 0.9)");   // Luminous cyan
      mainGrad.addColorStop(0.52, "rgba(45, 212, 191, 0.88)"); // Aquamarine
      mainGrad.addColorStop(0.68, "rgba(192, 132, 252, 0.75)");// Soft lavender highlight crest
      mainGrad.addColorStop(0.82, "rgba(14, 165, 233, 0.85)"); // Sky blue reflection
      mainGrad.addColorStop(1.0, "rgba(20, 184, 166, 0.75)");  // Seafoam finish

      // Fill main body
      ctx.save();
      ctx.beginPath();
      const ptsTop: { x: number; y: number }[] = [];
      const ptsBottom: { x: number; y: number }[] = [];

      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0, time, 1.0);
        const halfW = pt.width * 0.5;
        ptsTop.push({ x: pt.x, y: pt.y - halfW });
        ptsBottom.push({ x: pt.x, y: pt.y + halfW });
      }

      ctx.moveTo(ptsTop[0].x, ptsTop[0].y);
      for (let i = 1; i <= steps; i++) {
        ctx.lineTo(ptsTop[i].x, ptsTop[i].y);
      }
      for (let i = steps; i >= 0; i--) {
        ctx.lineTo(ptsBottom[i].x, ptsBottom[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = mainGrad;
      ctx.shadowColor = "rgba(13, 148, 136, 0.22)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 12;
      ctx.fill();
      ctx.restore();

      // 4. Fine Transverse Acoustic Striations / Silk Rib Lines
      // This is the signature texture from the reference: fine white curved strands crossing the ribbon
      ctx.save();
      const numRibs = Math.floor(width / 7.5); // Density of cross-lines
      for (let i = 0; i < numRibs; i++) {
        const nx = i / numRibs;
        const pt = getWavePoint(nx, 0, time, 1.0);
        const halfW = pt.width * 0.5;

        // Subtle perspective curve for each rib line
        const topY = pt.y - halfW;
        const botY = pt.y + halfW;
        const midY = pt.y;
        const curveOffset = pt.twist * 12;

        ctx.beginPath();
        ctx.moveTo(pt.x, topY);
        ctx.quadraticCurveTo(pt.x + curveOffset, midY, pt.x, botY);

        // Strand opacity modulated across ribbon width
        const alpha = 0.25 + Math.sin(nx * Math.PI * 8 - time * 2) * 0.12;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.08, alpha)})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Specular Highlight Ridge along top crest
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0, time, 1.0);
        const topY = pt.y - pt.width * 0.5;
        if (i === 0) ctx.moveTo(pt.x, topY);
        else ctx.lineTo(pt.x, topY);
      }
      const ridgeGrad = ctx.createLinearGradient(0, 0, width, 0);
      ridgeGrad.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      ridgeGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.85)");
      ridgeGrad.addColorStop(0.65, "rgba(245, 208, 254, 0.9)"); // iridescent violet specular
      ridgeGrad.addColorStop(0.85, "rgba(255, 255, 255, 0.8)");
      ridgeGrad.addColorStop(1, "rgba(255, 255, 255, 0.2)");

      ctx.strokeStyle = ridgeGrad;
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.restore();

      // 6. Tertiary delicate floating filament wire for extra depth and acoustic aesthetic
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const pt = getWavePoint(nx, -0.4, time * 1.15, 0.65);
        const y = pt.y - pt.width * 0.3;
        if (i === 0) ctx.moveTo(pt.x, y);
        else ctx.lineTo(pt.x, y);
      }
      ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCalling]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ minHeight: "260px" }}
      />
    </div>
  );
}

