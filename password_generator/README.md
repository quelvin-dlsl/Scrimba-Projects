# Random Password Generator

A secure password generator that creates two random 15-character passwords with a single click. Built with a modern, clean interface emphasizing security and ease of use.

## Features

- **Instant Generation:** Creates two unique passwords simultaneously
- **Strong Security:** 15-character passwords with uppercase, lowercase, numbers, and symbols
- **Large Character Pool:** 
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special symbols (~!@#$%^&*()_-+={}[]|:;<>,.?/)
- **Clean Display:** Passwords shown in easy-to-read format
- **One-Click Operation:** Simple button press generates fresh passwords
- **Modern UI:** Dark theme with vibrant green accents

## Technologies Used

- **HTML5** - Structure and layout
- **CSS3** - Modern dark theme styling with custom fonts
- **JavaScript** - Random password generation logic
- **Google Fonts** - Karla and Inter font families

## How to Use

1. Click the **"Generate Passwords"** button
2. Two unique 15-character passwords appear instantly
3. Copy either password to use for your account
4. Click again to generate new passwords anytime

## What I Learned

- Using `Math.random()` and `Math.floor()` for random selection
- Building passwords by iterating through character arrays
- String concatenation with the `+=` operator
- Working with multiple character sets (letters, numbers, symbols)
- Creating arrays with different character combinations for flexibility
- DOM manipulation with `textContent`
- Implementing hover states for better user feedback
- Color psychology in UI design (green for security/trust)

## Security Features

- **15-character length** for strong password protection
- **Mixed character types** making passwords harder to crack
- **Truly random selection** from 88 possible characters
- **No password storage** - generated on-the-fly each time

## Running the Project

1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `index.css`
   - `index.js`
3. Open `index.html` in your web browser

No dependencies required!

## Design Highlights

- **Color Scheme:** Dark background (#1F2937) with vibrant green accents (#10B981)
- **Typography:** Karla for headings, Inter for body text
- **Visual Hierarchy:** Clear distinction between title, CTA, and generated passwords
- **User Feedback:** Button hover effect for interactivity

## Technical Details

**Character Pool Size:** 88 total characters
- 26 uppercase + 26 lowercase + 10 numbers + 26 symbols

**Password Strength:** 15 characters from 88 possibilities = 88^15 possible combinations

**Code includes prepared arrays for different combinations:**
- Characters only
- Characters + numbers
- Characters + symbols
- Numbers + symbols
- All characters combined (currently used)

## Future Enhancements

- Add password length selector (8-32 characters)
- Include checkboxes to customize character types
- Add "Copy to Clipboard" functionality
- Show password strength meter
- Generate more than 2 passwords at once
- Add password history (with option to clear)
- Include "exclude similar characters" option (0/O, 1/l/I)
- Add dark/light theme toggle
