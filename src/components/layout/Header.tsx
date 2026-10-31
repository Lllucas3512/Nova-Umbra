"use client";

import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onOpenQuote: () => void;
}

export function Header({
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenQuote,
}: HeaderProps) {
  return (
    <header className="navigation">
      <a
        href="#inicio"
        className="brand"
        aria-label="Umbra Digital Studio — início"
      >
        <img
          src="/brand/umbra-logo-transparent.png"
          width={145}
          height={49}
          alt="Umbra Digital Studio"
        />
      </a>
      <nav
        aria-label="Navegação principal"
        className={menuOpen ? "nav-links is-open" : "nav-links"}
      >
        {NAV_LINKS.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={onCloseMenu}>
            {label}
          </a>
        ))}
      </nav>
      <button type="button" className="nav-quote" onClick={onOpenQuote}>
        Vamos conversar <ArrowUpRight size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="menu-button"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        {menuOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </button>
    </header>
  );
}

