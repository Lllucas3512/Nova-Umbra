import React from "react";
import { PROCESS_STEPS } from "@/data/content";

export function ProcessSection() {
  return (
    <section id="processo" className="process section veil">
      <p className="eyebrow">03 — Método com direção</p>
      <div className="project-heading">
        <h2>
          Do primeiro pixel
          <br />
          <span>à publicação.</span>
        </h2>
        <p>
          Você participa das decisões.
          <br />
          Nós cuidamos de conectar cada etapa.
        </p>
      </div>
      <div className="process-track">
        <div className="process-line">
          <span className="process-progress" />
        </div>
        {PROCESS_STEPS.map(([title, description], index) => (
          <div key={title} className="process-step">
            <span className="step-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

