// Function to perform the calculation and display results in a table
function calculator() {
    // Create the table structure and insert it into the page
    let tableContent = "<table border='1'>";
    tableContent += "<tr><th>x</th><th>Operator</th><th>y</th><th>Result</th></tr>";

    // Array to store valid results for further analysis
    let validResults = [];

    // Variable to track the number of cells to alternate colors
    let cellCount = 0;

    while (true) {
        // Prompt user for first number (x)
        let x = prompt("Enter the first number (x):");

        // Exit the loop if the user clicks "Cancel"
        if (x === null) break;

        // Parse the input to a number
        x = parseFloat(x);

        // Prompt user for second number (y)
        let y = prompt("Enter the second number (y):");

        // Exit the loop if the user clicks "Cancel"
        if (y === null) break;

        // Parse the input to a number
        y = parseFloat(y);

        // Initialize the result variable
        let result;

        // Check if x or y are valid numbers
        if (isNaN(x) || isNaN(y)) {
            result = "Error: Wrong input number.";
            tableContent += `<tr>
                                <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${isNaN(x) ? 'invalid value' : x}</td>
                                <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">-</td>
                                <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${isNaN(y) ? 'invalid value' : y}</td>
                                <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${result}</td>
                             </tr>`;
            // Continue to allow the user to enter new inputs without breaking the loop
            continue;
        }

        // Prompt user for an operator
        let operator = prompt("Enter an operator (+, -, *, /, %):");

        // Exit the loop if the user clicks "Cancel"
        if (operator === null) break;

        // Perform the calculation based on the operator or display error for invalid operator
        switch (operator) {
            case '+':
                result = x + y;
                break;
            case '-':
                result = x - y;
                break;
            case '*':
                result = x * y;
                break;
            case '/':
                result = y !== 0 ? x / y : "Error: Division by zero";
                break;
            case '%':
                result = x % y;
                break;
            default:
                result = "Error: Invalid operator.";
                tableContent += `<tr>
                                    <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${x}</td>
                                    <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${operator}</td>
                                    <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${y}</td>
                                    <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${result}</td>
                                 </tr>`;
                // Continue without breaking the loop so user can try again
                continue;
        }

        // Add the row to the table with alternating cell colors
        tableContent += `<tr>
                            <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${x}</td>
                            <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${operator}</td>
                            <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${y}</td>
                            <td style="background-color:${cellCount++ % 2 === 0 ? 'blue' : 'yellow'};">${result}</td>
                         </tr>`;

        // Store valid results for future statistics calculation
        if (typeof result === 'number') {
            validResults.push(result);
        }

        // Ask if the user wants to perform another calculation
        let continueCalc = confirm("Do you have another problem to solve?");

        // Exit the loop if the user clicks "Cancel"
        if (!continueCalc) break;
    }

    // Close the table and display it on the page
    tableContent += "</table>";
    document.getElementById("tableContainer").innerHTML = tableContent;

    // If there are valid results, calculate and display statistics
    if (validResults.length > 0) {
        displayStatistics(validResults);
    }
}

// Function to calculate and display statistics for valid results
function displayStatistics(results) {
    // Calculate minimum, maximum, total, and average
    let min = Math.min(...results);
    let max = Math.max(...results);
    let total = results.reduce((acc, val) => acc + val, 0);
    let avg = total / results.length;

    // Create the statistics table
    let statsContent = "<table border='1'>";
    statsContent += "<tr><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>";
    statsContent += `<tr>
                        <td style="background-color:blue;">${min}</td>
                        <td style="background-color:yellow;">${max}</td>
                        <td style="background-color:blue;">${avg.toFixed(2)}</td>
                        <td style="background-color:yellow;">${total}</td>
                     </tr>`;
    statsContent += "</table>";

    // Display the statistics table
    document.getElementById("statsContainer").innerHTML = statsContent;
}

// Run the calculator function when the script is loaded
calculator();
