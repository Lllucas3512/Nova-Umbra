"use client";

import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  buildWhatsAppQuoteMessage,
  QUOTE_OBJECTIVES,
  QUOTE_SERVICES,
  WHATSAPP_URL,
} from "@/data/content";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: number;
  onStepChange: (step: number) => void;
  service: string;
  onServiceChange: (service: string) => void;
  objective: string;
  onObjectiveChange: (objective: string) => void;
  details: string;
  onDetailsChange: (details: string) => void;
}

export function QuoteModal({
  open,
  onOpenChange,
  step,
  onStepChange,
  service,
  onServiceChange,
  objective,
  onObjectiveChange,
  details,
  onDetailsChange,
}: QuoteModalProps) {
  const message = buildWhatsAppQuoteMessage(service, objective, details);
  const currentSelection = step === 1 ? service : objective;
  const options = step === 1 ? QUOTE_SERVICES : QUOTE_OBJECTIVES;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="quote-modal">
        <div className="modal-meta">
          <span>Vamos criar algo seu.</span>
          <span>0{step} / 03</span>
        </div>

        <div className="modal-progress">
          {[1, 2, 3].map((idx) => (
            <span key={idx} className={idx <= step ? "filled" : ""} />
          ))}
        </div>

        <DialogTitle>
          {step === 1
            ? "O que você precisa?"
            : step === 2
            ? "Qual é o principal objetivo?"
            : "Conte um pouco sobre o projeto."}
        </DialogTitle>

        <DialogDescription>
          {step === 3
            ? "Este campo é opcional. Se preferir, conversamos sobre os detalhes pelo WhatsApp."
            : "Escolha a opção que mais se aproxima da sua ideia."}
        </DialogDescription>

        {step < 3 ? (
          <RadioGroup
            className="quote-options"
            value={currentSelection}
            onValueChange={step === 1 ? onServiceChange : onObjectiveChange}
            aria-label={
              step === 1 ? "Tipo de projeto" : "Objetivo do projeto"
            }
          >
            {options.map((option, idx) => (
              <label
                key={option}
                htmlFor={`choice-${step}-${idx}`}
                className={currentSelection === option ? "selected" : ""}
              >
                <RadioGroupItem
                  id={`choice-${step}-${idx}`}
                  value={option}
                />
                <span>{option}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </label>
            ))}
          </RadioGroup>
        ) : (
          <textarea
            aria-label="Sobre o projeto (opcional)"
            value={details}
            onChange={(e) => onDetailsChange(e.target.value)}
            placeholder="O que você tem em mente?"
            maxLength={2500}
            rows={5}
          />
        )}

        <div className="modal-actions">
          {step > 1 ? (
            <button
              type="button"
              className="text-link"
              onClick={() => onStepChange(step - 1)}
            >
              <ArrowLeft size={16} aria-hidden="true" /> Voltar
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              className="button primary"
              disabled={!currentSelection}
              onClick={() => onStepChange(step + 1)}
            >
              Continuar <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <a
              className="button primary"
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar no WhatsApp{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>

        <a
          className="direct-contact"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefiro conversar direto no WhatsApp
        </a>
      </DialogContent>
    </Dialog>
  );
}

