document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("Display");
  const buttons = document.querySelectorAll("#Buttons li");

  let currentInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim();

      if (value === "C") {
        currentInput = "";
      } else if (value === "Delete") {
        // Handle clearing error states safely
        if (currentInput === "Error" || currentInput === "Infinity") {
          currentInput = "";
        } else {
          currentInput = currentInput.slice(0, -1);
        }
      } else if (value === "=") {
        try {
          // Translate visual elements to machine math operators
          let formattedInput = currentInput
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
          
          // Catch direct division-by-zero patterns before execution
          if (/\/0(?!\d|\.)/.test(formattedInput)) {
            currentInput = "Error";
          } else if (formattedInput) {
            let result = new Function(`return ${formattedInput}`)();
            
            // Check for edge-case mathematical evaluation Infinity limits
            if (!isFinite(result)) {
              currentInput = "Error";
            } else {
              // Convert result back to string and limit long decimals dynamically
              currentInput = String(Number(result.toFixed(8)));
            }
          }
        } catch (error) {
          currentInput = "Error";
        }
      } else {
        // Reset display cleanly if an operation follows an error state
        if (currentInput === "Error" || currentInput === "Infinity") {
          currentInput = "";
        }

        // Restrict bad syntax like double decimals in a single number track
        if (value === ".") {
          const parts = currentInput.split(/[\+\\−\×\÷]/);
          const currentNumberSegment = parts[parts.length - 1];
          if (currentNumberSegment.includes(".")) return;
        }

        currentInput += value;
      }

      // Render updated track back to user view panel
      display.textContent = currentInput || "0";
    });
  });
});
