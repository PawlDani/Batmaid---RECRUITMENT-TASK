import { useState, useEffect } from "react";
import "./FloatingButton.scss";
import locationsData from "../../data/locations.json";

interface Location {
  zip: string;
  city: string;
  hideCityName: boolean;
}

const locations: Location[] = locationsData;

function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.9;

      setIsVisible(scrollPosition >= threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  };

  const handleClose = () => {
    setIsExpanded(false);
    setQuery("");
    setShowDropdown(false);
  };

  const handleSelect = (location: Location) => {
    console.log("Selected location:", location);
    setShowDropdown(false);
    setIsExpanded(false);
    setIsVisible(false);
    setQuery("");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`floating-button ${isExpanded ? "floating-button--expanded" : ""}`}>
      {/* Collapsed content */}
      <div className="floating-button__collapsed">
        <span>Check availabilities</span>
        <img src="/calendar-schedule-clock-time.svg" alt="" width="18" height="18" />
      </div>

      {/* Expanded content */}
      <div className="floating-button__expanded">
        <button className="floating-button__close" onClick={handleClose}>
          ×
        </button>
        <p className="floating-button__text">
          Let us know your postal code so we can get you best cleaning
          professionals in your area.
        </p>
        <div className="floating-button__form">
          <div className="floating-button__input-wrapper">
            <input
              type="text"
              placeholder="Your postal code or city"
              className="floating-button__input"
              value={query}
              onChange={handleInputChange}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => query.length > 0 && setShowDropdown(true)}
            />
            {showDropdown && filteredLocations.length > 0 && (
              <ul className="floating-button__dropdown">
                {filteredLocations.map((loc) => (
                  <li
                    key={loc.zip}
                    className="floating-button__dropdown-item"
                    onClick={() => handleSelect(loc)}
                  >
                    {loc.zip} {!loc.hideCityName && loc.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="floating-button__submit">Lets go!</button>
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
