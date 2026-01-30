# Device Catalog Application

A responsive React + TypeScript application that displays a catalog of devices with search, filtering, sorting, favorites, and a detail modal. Data is loaded from mock JSON endpoints and the UI includes loading, error, and empty states.

---

## Features

### Data Loading

- Fetches devices and categories from mock JSON files.
- Uses `Promise.allSettled` to handle partial failures.
- Displays loading, error, and empty states.

### Search & Filtering

- Search bar filters devices by name.
- Category buttons filter by category and are fully toggleable.

### Sorting

- Dropdown supports sorting by:
  - Price
  - Rating
  - Name
  - Category

### Favorites

- Favorite/unfavorite devices with a heart icon.
- Favorites persist using `localStorage`.

### Device Detail Modal

- Opens on hover after a short delay.
- Shows device details and favorite button.
- Supports closing via backdrop click or Escape key.

### Accessibility & Responsiveness

- Semantic HTML and ARIA attributes.
- Keyboard‑friendly modal.
- Responsive grid layout and centered control bar.

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite (or CRA depending on setup)
- localStorage for persistence

---

## Running the Project

```
npm install
npm run dev
```

Build and preview:

```
npm run build
npm run preview
```

---

## Project Structure

```
src/
  test/
  components/
  assets/
  App.tsx
public/
  devices.json
  categories.json
```

---

## Design Notes

- `Promise.allSettled` allows one dataset to load even if the other fails.
- Sorting is centralized through a single `sortBy` state.
- Modal includes keyboard support and focus handling, hover over a card for 3 seconds and view the modal.
- Tailwind ensures consistent spacing and layout.

---

## Future Improvements

- Seperate page for favorited items
- Light mode toggle
- Additional modal animations
