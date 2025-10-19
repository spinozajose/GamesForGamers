// src/components/ScrollProgress.jsx
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  // Hook para medir progreso del scroll
  const { scrollYProgress } = useScroll();

  // Suavizar el movimiento del indicador
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,                  // el ancho se escala según el progreso del scroll
        transformOrigin: "0%",   // comienza desde la izquierda
      }}
      className="scroll-progress"
    />
  );
}
