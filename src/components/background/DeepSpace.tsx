import React from "react";

export function DeepSpace() {
  return (
    <>
      <div className="deep-space" aria-hidden="true">
        <span className="distant-orb distant-orb-one" />
        <span className="distant-orb distant-orb-two" />
        <i className="bright-star star-one" />
        <i className="bright-star star-two" />
        <i className="bright-star star-three" />
      </div>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
    </>
  );
}

