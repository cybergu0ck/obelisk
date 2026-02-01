const lineBreakTags: string[] = ["<br>", "<br/>"];
const lineBreak: string = "<br/>";
const totalVerticalOffset: number = 5;

export function chiselContent(content: string): string {
  const lines = content.split(/\r?\n/);
  const resArray: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (lineBreakTags.includes(trimmed) || trimmed === "") continue;

    const headingMatch = trimmed.match(/^(#{1,4})\s/);

    if (headingMatch) {
      const level = headingMatch[1].length; // number of '#'
      const neededLineBreaks = totalVerticalOffset - level;

      let brs = Array(neededLineBreaks).fill(lineBreak).join("\n");
      resArray.push(brs);
      resArray.push(trimmed);
    } else {
      resArray.push(trimmed);
    }
  }

  return resArray.join("\n\n") + "\n";
}
