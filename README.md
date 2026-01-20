Calculator Project

📌 Description
This project is a simple calculator that performs basic arithmetic operations on numbers:

- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)

The calculator works similarly to a real calculator: all user input is displayed on the screen, and the result is shown after pressing the "=" button.
It also supports decimal numbers, changing the sign of a number (+/-), and deleting or clearing input.

⚡ Features
- Basic arithmetic operations: +, -, *, /
- Decimal numbers with .
- Change sign (+/-) for current input
- Delete last character (<)
- Clear all input (AC)
- Tab focus is disabled to prevent buttons from moving when using the Tab key

Keyboard support:
- Numbers 0-9
- Operators + - * /
- Enter or = → equals
- Backspace → delete last input
- Escape → clear all

Prevents invalid input:
- Cannot divide by zero → displays error
- Cannot input multiple leading zeros (00)
- After = you can continue inputting numbers or decimals
- After an error,  a new input can be started using a number, a decimal point, or AC.
  Other actions (operators, sign change, delete) are disabled in this state.

+ The main display uses adaptive font sizing based on the current input or result length to ensure proper visibility.

🛠 Technologies Used
- HTML
- CSS
- JavaScript
