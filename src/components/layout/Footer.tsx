"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenQuote: () => void;
}

export function Footer({ onOpenQuote }: FooterProps) {
  return (
    <footer id="contato" className="section">
      <p className="eyebrow">Sua próxima fase começa aqui</p>
      <h2>
        Vamos dar forma
        <br />
        <span>à sua ideia?</span>
      </h2>
      <button type="button" className="button primary" onClick={onOpenQuote}>
        Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <div className="footer-bottom">
        <a className="brand" href="#inicio">
          <img
            src="/brand/umbra-logo-transparent.png"
            width={145}
            height={49}
            alt="Umbra Digital Studio"
          />
        </a>
        <p>© 2026 Umbra Digital Studio</p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  );
}

