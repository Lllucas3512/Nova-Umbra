import React, { forwardRef } from "react";

export const EclipseOrb = forwardRef<HTMLDivElement>(function EclipseOrb(
  _props,
  ref
) {
  return (
    <div className="orb-layer" aria-hidden="true">
      <div ref={ref} className="eclipse-position">
        <div className="eclipse">
          <span className="eclipse-light" />
          <span className="eclipse-core" />
        </div>
      </div>
    </div>
  );
});

