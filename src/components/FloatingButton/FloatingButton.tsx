import { useState, useEffect } from "react";
import "./FloatingButton.scss";
import { useLocations } from "../../context/LocationContext";
import type { Location } from "../../services/locationService";

function FloatingButton() {
  const { locations, isLoading } = useLocations();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [error, setError] = useState("");

  // Reset to pill after hide animation completes
  useEffect(() => {
    if (!isVisible && isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isExpanded]);

  useEffect(() => {
    const checkVisibility = () => {
      if (isDismissed) return;
      
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.9;
      const shouldBeVisible = scrollPosition >= threshold;

      if (shouldBeVisible && !isVisible) {
        setIsVisible(true);
      } else if (!shouldBeVisible && isVisible) {
        setShowDropdown(false);
        setIsVisible(false);
      }
    };

    // Check on mount
    checkVisibility();

    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  }, [isVisible, isDismissed]);

  const filteredLocations = query.length > 0
    ? locations.filter(
        (loc) =>
          loc.zip.startsWith(query) ||
          loc.city.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(e.target.value.length > 0);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (query.trim().length === 0) {
      setError("Please enter a postal code or city");
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setShowDropdown(false);
  };

  const handleSelect = (location: Location) => {
    console.log("Selected location:", location);
    setShowDropdown(false);
    setIsExpanded(false);
    setIsDismissed(true);
    setIsVisible(false);
    setQuery("");
  };

  // Always render, let CSS handle visibility
  return (
    <div 
      className={`floating-button ${isExpanded ? "floating-button--expanded" : ""} ${isVisible ? "floating-button--visible" : ""}`}
    >
      {/* Collapsed content */}
      <div className="floating-button__collapsed">
        <span>Check availabilities</span>
        <img src="/calendar-schedule-clock-time.svg" alt="" width="18" height="18" />
      </div>

      {/* Expanded content */}
      <div className="floating-button__expanded">
        <button className="floating-button__close" onClick={handleClose}>
          <img src="/Close.svg" alt="Close" width="16" height="16" />
        </button>
        <p className="floating-button__text">
          Let us know your postal code so we can get you best cleaning
          professionals in your area.
        </p>
        <div className="floating-button__form">
          <div className="floating-button__input-wrapper">
            <input
              type="text"
              placeholder={error ? "" : "Your postal code or city"}
              className="floating-button__input"
              value={query}
              onChange={handleInputChange}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => query.length > 0 && setShowDropdown(true)}
            />
            {isLoading && query.length > 0 && <span className="floating-button__spinner" />}
            {showDropdown && !isLoading && (
              <ul className="floating-button__dropdown">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <li
                      key={loc.zip}
                      className="floating-button__dropdown-item"
                      onClick={() => handleSelect(loc)}
                    >
                      {loc.zip} {!loc.hideCityName && loc.city}
                    </li>
                  ))
                ) : (
                  <li className="floating-button__dropdown-empty">
                    No locations found
                  </li>
                )}
              </ul>
            )}
            {error && <span className="floating-button__error">{error}</span>}
          </div>
          <button className="floating-button__submit" onClick={handleSubmit}>Lets go!</button>
        </div>
      </div>

      {/* Click area for collapsed state */}
      {!isExpanded && (
        <button 
          className="floating-button__trigger" 
          onClick={() => setIsExpanded(true)}
          aria-label="Check availabilities"
        />
      )}
    </div>
  );
}

export default FloatingButton;
