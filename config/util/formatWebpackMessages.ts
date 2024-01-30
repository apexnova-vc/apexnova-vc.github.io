import chalk from "chalk";

const friendlySyntaxErrorLabel = "Syntax error:";

function isLikelyASyntaxError(message: string): boolean {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// Cleans up webpack error messages.
function formatMessage(message: any): string {
  let lines: string[] = [];

  if (typeof message === "string") {
    lines = message.split("\n");
  } else if ("message" in message) {
    lines = message["message"].split("\n");
  } else if (Array.isArray(message)) {
    message.forEach((msg) => {
      if ("message" in msg) {
        lines = msg["message"].split("\n");
      }
    });
  }

  // Strip webpack-added headers off errors/warnings
  lines = lines.filter((line) => !/Module [A-z ]+\(from/.test(line));

  // Transform parsing error into syntax error
  lines = lines.map((line) => {
    const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
      line,
    );
    if (!parsingError) {
      return line;
    }
    const [, errorLine, errorColumn, errorMessage] = parsingError;
    return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
  });

  message = lines.join("\n");
  message = message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
  );
  message = message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$2'.`,
  );
  message = message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$2' does not contain a default export (imported as '$1').`,
  );
  message = message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`,
  );
  lines = message.split("\n");

  // Remove leading newline
  if (lines.length > 2 && lines[1].trim() === "") {
    lines.splice(1, 1);
  }

  // Clean up file name
  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, "$1");

  // ... rest of the original function

  // Reassemble the message
  message = lines.join("\n");
  return message.trim();
}

function formatWebpackMessages(json: { errors: any[]; warnings: any[] }): {
  errors: string[];
  warnings: string[];
} {
  const formattedErrors = json.errors.map(formatMessage);
  const formattedWarnings = json.warnings.map(formatMessage);
  const result = { errors: formattedErrors, warnings: formattedWarnings };
  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }
  return result;
}

export { formatWebpackMessages };
