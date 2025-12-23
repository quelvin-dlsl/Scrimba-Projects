# Basketball Scoreboard

A dynamic basketball scoreboard application that tracks scores for home and guest teams across four quarters with an interactive buttons

## 🎯 Features

- **Score Tracking:** Track points for both HOME and GUEST teams
- **Multiple Point Values:** Add 1, 2, or 3 points per score (free throws, field goals, and three-pointers)
- **Quarter Management:** Switch between quarters 1-4 with quick-select buttons
- **Reset Functionality:** Clear all scores and reset to quarter 1 with one click
- **Custom Typography:** Uses custom "Timer" font for authentic scoreboard appearance

## Technologies Used

- **HTML5** - Structure and layout
- **CSS3** - Styling with custom fonts and responsive design
- **JavaScript (ES6)** - Score tracking logic and DOM manipulation

## How to Use

1. Click the **+1**, **+2**, or **+3** buttons under HOME or GUEST to add points
2. Use the quarter selector buttons (1, 2, 3, 4) to change the current quarter
3. Click **RESET** to clear all scores and return to quarter 1

## What I Learned

- DOM manipulation using `getElementById()` and `textContent`
- Event handling with `onclick` attributes
- Managing application state with JavaScript variables
- Custom font integration using `@font-face`
- Creating a cohesive UI with color schemes and custom styling
- Building interactive buttons with hover effects

##  Running the Project

1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `index.css`
   - `index.js`
   - `CursedTimerUlil-Aznm.ttf` (custom font file)
3. Open `index.html` in your web browser

No build process or dependencies required!

## Design Highlights

- **Color Palette:** Dark blue background (#1B244A) with bright accents
- **Score Display:** Large, bold numbers on black backgrounds for visibility
- **Interactive Elements:** Buttons with hover effects for better UX
- **Layout:** Flexbox-based responsive design

## File Structure

```
basketball-scoreboard/
├── index.html          # Main HTML structure
├── index.css           # Styling and layout
├── index.js            # Score tracking logic
└── CursedTimerUlil-Aznm.ttf  # Custom font file
```

##  Future Enhancements

- Add a timer/countdown clock for game periods
- Include fouls tracking for each team
- Add sound effects for score updates
- Implement local storage to persist scores
- Add a game history or stats tracker

## License

This project is part of my Scrimba learning journey and is available for educational purposes.
