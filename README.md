# private_text
# One-Time Message Generator

This project is a simple web application that allows users to create one-time readable messages. Users can input a message, optionally protect it with a password, and generate a unique link. When someone visits this link, they can view the message only once. If the message is password-protected, they need to enter the correct password to view it.

## Features

- Create one-time readable messages
- Optional password protection
- Word limit on messages (300 words)
- Client-side only (uses browser's localStorage)

## How It Works

### HTML Structure

- `<div id="message-form">`: Contains the form for creating messages.
- `<div id="message-display">`: Displays the one-time message.

### JavaScript Functions

1. `generateUniqueId()`
   - Purpose: Generates a unique identifier for each message.
   - How: Uses `Math.random()` and converts it to a base-36 string, ensuring uniqueness.

2. `generateLink()`
   - Purpose: Creates a unique link for the message and stores the message data.
   - Flow:
     1. Get message text and check if it's empty.
     2. Check if password protection is enabled and get the password.
     3. Generate a unique ID.
     4. Store message data (text, viewed status, password) in `localStorage`.
     5. Display the unique link to the user.
     6. Clear input fields.

3. `showMessage()`
   - Purpose: Displays the message when a user visits the unique link.
   - Flow:
     1. Extract message ID from URL query parameter.
     2. Retrieve message data from `localStorage`.
     3. If the message is already viewed, show "already viewed" message.
     4. If password-protected, prompt for password and validate.
     5. If all checks pass, display the message and mark as viewed.

4. `togglePasswordInput()`
   - Purpose: Shows or hides the password input field based on the checkbox state.

5. Event Listeners
   - `window.onload = showMessage;`: Checks for a message to display when the page loads.

### Additional JavaScript Functions

1. `checkInput(inputField)`
   - Purpose: Limits the message to 300 words and updates a word counter.
   - Flow:
     1. Split the input text into an array of words.
     2. Update the word counter display.
     3. If word count exceeds 300, truncate the input.
     4. Handle edge case of empty input.

2. `isEmptyStringArray(arr)`
   - Purpose: Checks if the word array is effectively empty (contains only an empty string).
   - Used by: `checkInput()` to handle the case when the textarea is empty or contains only spaces.

3. Event Listener for Password Checkbox
   - Purpose: Shows or hides the password input field based on the checkbox state.
   - Flow:
     1. Listen for changes on the checkbox.
     2. If checked, show the password input; otherwise, hide it.
     3. Initially hide the password input if the checkbox is not checked.

## Application Flow

1. User enters a message (limited to 300 words).
2. (Optional) User checks "Protect with password" and enters a password.
3. User clicks "Generate Link".
4. Application generates a unique ID and link, stores message data in `localStorage`.
5. User shares the link.
6. Recipient opens the link:
   - If no password, the message is displayed.
   - If password-protected, user is prompted for the password.
7. After viewing, the message is marked as "viewed" and cannot be viewed again.

## Technical Considerations

- **Client-Side Only**: Uses `localStorage`, so messages are stored in the user's browser. This means:
  - No server-side persistence.
  - Messages are lost if browser data is cleared.
  - Security concerns for sensitive data.

- **Scalability**: 
  - `localStorage` has size limits.
  - No way to truly delete old messages.

## Conclusion

This project is great for learning and prototyping. It demonstrates:
- DOM manipulation
- Event handling
- Use of `localStorage`
- Basic string manipulation and validation
