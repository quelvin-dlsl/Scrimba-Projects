# Metric/Imperial Unit Converter

A clean and intuitive unit conversion tool that instantly converts between metric and imperial units for length, volume, and mass measurements.

## Features

- **Bidirectional Conversion:** Converts both ways (metric ↔ imperial) simultaneously
- **Three Conversion Types:**
  - Length: Meters ↔ Feet
  - Volume: Liters ↔ Gallons
  - Mass: Kilograms ↔ Pounds
- **Precise Calculations:** Results displayed to 3 decimal places for accuracy
- **Real-time Updates:** Instant conversion on button click
- **Clean UI:** Modern, card-based design with purple gradient theme

## Technologies Used

- **HTML5** - Structure and input handling
- **CSS3** - Modern styling with custom color scheme and Google Fonts
- **JavaScript** - Conversion logic and event handling
- **Google Fonts** - Inter font family for clean typography

## How to Use

1. Enter any number in the input field
2. Click the **Convert** button
3. View all three conversions instantly:
   - See both directions of conversion for each unit type
   - Results are precise to 3 decimal places

## What I Learned

- Event handling with `addEventListener()` for better practice over inline handlers
- Template literals for dynamic HTML generation
- Using `toFixed()` for decimal precision control
- Working with conversion formulas and constants
- DOM manipulation with `innerHTML`
- Integrating Google Fonts via CDN
- Creating a cohesive color scheme and visual hierarchy

## Conversion Formulas

```javascript
Length:  1 meter = 3.281 feet
Volume:  1 liter = 0.264 gallon
Mass:    1 kilogram = 2.204 pounds
```

##  Running the Project

1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `index.css`
   - `index.js`
3. Open `index.html` in your web browser

No dependencies or build tools required!

## Design Highlights

- **Color Palette:** Purple gradient header (#6943FF) with dark gray body (#1F2937)
- **Typography:** Inter font for modern, readable interface
- **Layout:** Centered card design with distinct sections for each conversion type
- **Interactive Elements:** Hover effects on buttons for better UX

## Future Enhancements

- Add more unit types (temperature, area, speed, etc.)
- Implement conversion history
- Add keyboard support (Enter key to convert)
- Include unit selector dropdowns for more flexibility
- Add copy-to-clipboard functionality for results
- Create a reset/clear button
- Add input validation for non-numeric entries
