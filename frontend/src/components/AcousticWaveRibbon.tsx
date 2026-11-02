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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const speed = isCalling ? 0.02 : 0.008;
      time += speed;

      const centerY = height * 0.52;
      const baseAmp = height * 0.26;
      const callBoost = isCalling ? 1.25 : 1.0;

      // Function to calculate parametric wave points
      const getWavePoint = (
        normX: number,
        layerOffset: number,
        t: number,
        ampScale = 1.0
      ) => {
        const freq1 = 2.4;
        const freq2 = 4.6;
        const freq3 = 1.2;

        const w1 = Math.sin(normX * Math.PI * freq1 - t + layerOffset);
        const w2 = Math.cos(normX * Math.PI * freq2 + t * 0.7 - layerOffset) * 0.32;
        const w3 = Math.sin(normX * Math.PI * freq3 - t * 0.4) * 0.2;

        // Graceful taper at screen edges
        const envelope = Math.sin(normX * Math.PI) * 0.35 + 0.65;
        const waveHeight = (w1 + w2 + w3) * baseAmp * ampScale * callBoost * envelope;
        const y = centerY + waveHeight;

        const twist = Math.sin(normX * Math.PI * 3.2 - t * 0.8 + layerOffset);
        const ribbonWidth = (32 + Math.cos(normX * Math.PI * 4 - t) * 14 + twist * 22) * (height / 280);

        return {
          x: normX * width,
          y,
          width: Math.max(16, ribbonWidth),
          twist,
        };
      };

      const steps = 140;

      // 1. Soft Ambient Ground Glow in Rose-Plum
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const nx = i / 60;
        const pt = getWavePoint(nx, 0, time, 0.95);
        if (i === 0) ctx.moveTo(pt.x, pt.y + pt.width * 0.6 + 16);
        else ctx.lineTo(pt.x, pt.y + pt.width * 0.6 + 16);
      }
      ctx.strokeStyle = "rgba(217, 139, 174, 0.16)";
      ctx.lineWidth = 36;
      ctx.filter = "blur(18px)";
      ctx.stroke();
      ctx.restore();

      // 2. Secondary Under-Ribbon (Lavender to Soft Mint Iridescence)
      ctx.save();
      const underGrad = ctx.createLinearGradient(0, centerY - baseAmp, width, centerY + baseAmp);
      underGrad.addColorStop(0.0, "rgba(234, 229, 250, 0.3)");   // Pale lavender
      underGrad.addColorStop(0.3, "rgba(216, 237, 234, 0.4)");   // Soft mint
      underGrad.addColorStop(0.65, "rgba(248, 220, 232, 0.45)"); // Soft pink
      underGrad.addColorStop(0.85, "rgba(101, 184, 181, 0.3)");  // Muted teal
      underGrad.addColorStop(1.0, "rgba(239, 166, 197, 0.35)");  // Primary pink

      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0.5, time * 0.85, 0.88);
        const yTop = pt.y - pt.width * 0.45;
        if (i === 0) ctx.moveTo(pt.x, yTop);
        else ctx.lineTo(pt.x, yTop);
      }
      for (let i = steps; i >= 0; i--) {
        const nx = i / steps;
        const pt = getWavePoint(nx, 0.5, time * 0.85, 0.88);
        const yBottom = pt.y + pt.width * 0.45;
        ctx.lineTo(pt.x, yBottom);
      }
      ctx.closePath();
      ctx.fillStyle = underGrad;
      ctx.fill();
      ctx.restore();

      // 3. Primary Silk Acoustic Wave Ribbon (Pink, Rose, Mint, Lavender)
      const mainGrad = ctx.createLinearGradient(0, centerY - baseAmp, width, centerY + baseAmp);
      mainGrad.addColorStop(0.0, "rgba(217, 139, 174, 0.8)");   // Rose accent
      mainGrad.addColorStop(0.2, "rgba(239, 166, 197, 0.88)");  // Primary pink
      mainGrad.addColorStop(0.4, "rgba(216, 237, 234, 0.85)");  // Soft mint accent
      mainGrad.addColorStop(0.58, "rgba(234, 229, 250, 0.88)"); // Pale lavender
      mainGrad.addColorStop(0.76, "rgba(185, 104, 145, 0.85)"); // Deep rose
      mainGrad.addColorStop(0.9, "rgba(239, 166, 197, 0.85)");  // Primary pink
      mainGrad.addColorStop(1.0, "rgba(101, 184, 181, 0.8)");   // Muted teal

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
      ctx.shadowColor = "rgba(185, 104, 145, 0.2)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;
      ctx.fill();
      ctx.restore();

      // 4. Longitudinal Silk Fibres along ribbon length
      ctx.save();
      const numLongLines = 7;
      for (let j = 0; j < numLongLines; j++) {
        const lineOffsetNorm = (j / (numLongLines - 1) - 0.5) * 0.85;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const nx = i / steps;
          const pt = getWavePoint(nx, 0, time, 1.0);
          const yPos = pt.y + pt.width * lineOffsetNorm;
          if (i === 0) ctx.moveTo(pt.x, yPos);
          else ctx.lineTo(pt.x, yPos);
        }
        ctx.strokeStyle = j === 3 ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = j === 3 ? 1.5 : 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Fine Transverse Acoustic Rib Lines (Silk wireframe striations)
      ctx.save();
      const numRibs = Math.floor(width / 8);
      for (let i = 0; i < numRibs; i++) {
        const nx = i / numRibs;
        const pt = getWavePoint(nx, 0, time, 1.0);
        const halfW = pt.width * 0.5;

        const topY = pt.y - halfW;
        const botY = pt.y + halfW;
        const midY = pt.y;
        const curveOffset = pt.twist * 14;

        ctx.beginPath();
        ctx.moveTo(pt.x, topY);
        ctx.quadraticCurveTo(pt.x + curveOffset, midY, pt.x, botY);

        const alpha = 0.22 + Math.sin(nx * Math.PI * 6 - time * 2) * 0.12;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.08, alpha)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
      ctx.restore();

      // 6. Specular Highlight Ridge along top crest (Ivory / Pearl sheen)
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
      ridgeGrad.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      ridgeGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.95)");
      ridgeGrad.addColorStop(0.65, "rgba(252, 238, 243, 0.95)");
      ridgeGrad.addColorStop(1, "rgba(255, 255, 255, 0.3)");

      ctx.strokeStyle = ridgeGrad;
      ctx.lineWidth = 2.0;
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
