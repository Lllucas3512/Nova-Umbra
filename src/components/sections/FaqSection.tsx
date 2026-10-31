"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, WHATSAPP_URL } from "@/data/content";

export function FaqSection() {
  return (
    <section id="faq" className="faq section veil">
      <div>
        <p className="eyebrow">05 — FAQ</p>
        <h2>
          Perguntas
          <br />
          <span>frequentes.</span>
        </h2>
        <p className="faq-help">Ainda tem alguma dúvida?</p>
        <a
          className="text-link"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale com a gente <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <Accordion type="single" collapsible className="faq-list">
        {FAQ_ITEMS.map(([question, answer], index) => (
          <AccordionItem key={question} value={`q${index}`}>
            <AccordionTrigger>
              <span>{question}</span>
              <span className="faq-sign" aria-hidden="true" />
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

