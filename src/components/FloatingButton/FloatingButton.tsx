import "./FloatingButton.scss";

function FloatingButton() {
  return (
    <div className="floating-button">
      <button className="floating-button__trigger">
        <span>Check availabilities</span>
        <img src="/calendar-schedule-clock-time.svg" alt="" width="18" height="18" />
      </button>
    </div>
  );
}

export default FloatingButton;
