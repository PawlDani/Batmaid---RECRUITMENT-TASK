# Project Planning

## What I need to build

A floating button that appears when scrolling down the page. It's meant to get users to book a cleaning.

Looking at the Figma:

- Button shows up after scrolling 90% of viewport
- Starts as a small "Check availabilities" pill with calendar icon
- Clicking it expands into a card where user can enter their postal code
- As they type, shows matching locations from the provided data
- When they pick one, button goes away and we log the selection to console

## States according to instructions + figma design

- hidden (before scroll)
- collapsed (the pill button)
- expanded (the card with input)
- showing dropdown (when typing)

## Tech choices

- Vite + React + TS
- Styling: SCSS Easier to maintain, tailwind overkill for this task.
- State management: React Context. Anything else like Zustand or Redux would be overkill here.

## The data

- JSON file with ~100 Swiss locations. Each has:
  - zip
  - city
  - hideCityName flag (all false)

Will mock a fetch call with small delay to make it feel real.

## Animations

Task says animations are important for UX. Need to do:

- button sliding in on scroll
- expand/collapse of the card
- dropdown appearing
- button disappearing when done

## Mobile

No mobile designs given, so probably:

- button full width at bottom
- bigger touch targets
- card takes more space

## Plan

1. Setup project (vite, ts, scss)
2. Basic page with enough content to scroll
3. The floating button (just the collapsed pill first)
4. Expand/collapse behavior
5. Input + autocomplete dropdown
6. Hook up the mock API
7. Scroll detection logic
8. Make it work on mobile
9. Polish (loading states, empty state, etc)

Will commit after each step.
