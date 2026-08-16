const lineBreakTags: string[] = ["<br>", "<br/>"];
const lineBreak: string = "<br/>";
const totalVerticalOffset: number = 5;

export function chiselContent(content: string): string {
  const lines = content.split(/\r?\n/);
  const out: string[] = [];

  let isCodeBlock = false;
  let prevLine = "";

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      isCodeBlock = !isCodeBlock;
    }

    const trimmed = line.trim();
    const isBulletPoint = trimmed.startsWith("-") || trimmed.startsWith("*");
    const isImage = trimmed.startsWith("!");

    if (isCodeBlock || isBulletPoint || isImage || index === 0) {
      out.push(line);
      prevLine = line;
      return;
    }

    if (lineBreakTags.includes(trimmed) || trimmed === "") {
      out.push("");
      prevLine = line;
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const neededLineBreaks = Math.max(0, totalVerticalOffset - level);
      const brs = Array(neededLineBreaks).fill(lineBreak).join("\n");
      out.push(`${brs}\n\n${trimmed}`);
    } else {
      const needsLeadingBreak =
        prevLine.trim().startsWith("-") || prevLine.trim().startsWith("!");
      out.push(needsLeadingBreak ? `\n${trimmed}` : trimmed);
    }

    prevLine = line;
  });

  return out.join("\n") + "\n";
}