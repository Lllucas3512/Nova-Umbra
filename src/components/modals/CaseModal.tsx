"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectItem } from "@/data/content";

interface CaseModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuote: () => void;
}

export function CaseModal({
  project,
  onClose,
  onRequestQuote,
}: CaseModalProps) {
  return (
    <Dialog
      open={project !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="case-modal">
        {project !== null && (
          <>
            <div className="case-modal-header">
              <p className="eyebrow">
                {project.indexLabel} — {project.category}
              </p>
              <DialogTitle>{project.name}</DialogTitle>
              <p className="case-field">{project.field}</p>
            </div>

            <div className="case-modal-media">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                className="case-modal-img"
                priority
              />
            </div>

            <DialogDescription>{project.description}</DialogDescription>

            <div className="case-modal-footer">
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  onClose();
                  onRequestQuote();
                }}
              >
                Quero conversar sobre meu projeto{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

