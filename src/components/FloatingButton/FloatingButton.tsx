import { useState } from "react";
import "./FloatingButton.scss";

function FloatingButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <div className="floating-button floating-button--expanded">
        <div className="floating-button__card">
          <button
            className="floating-button__close"
            onClick={() => setIsExpanded(false)}
          >
            ×
          </button>
          <p className="floating-button__text">
            Let us know your postal code so we can get you best cleaning
            professionals in your area.
          </p>
          <div className="floating-button__form">
            <input
              type="text"
              placeholder="Your postal code or city"
              className="floating-button__input"
            />
            <button className="floating-button__submit">Lets go!</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="floating-button">
      <button
        className="floating-button__trigger"
        onClick={() => setIsExpanded(true)}
      >
        <span>Check availabilities</span>
        <img src="/calendar-schedule-clock-time.svg" alt="" width="18" height="18" />
      </button>
    </div>
  );
}

export default FloatingButton;
