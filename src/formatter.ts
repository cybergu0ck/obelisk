import { readFile, writeFile } from "node:fs/promises";

const lineBreakTags: string[] = ["<br>", "<br/>"];
const lineBreak: string = "<br/>";
const totalVerticalOffset: number = 5;

function formatContent(content: string): string {
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

async function readAndFormatMarkdownFile(filePath: string): Promise<void> {
  try {
    const content: string = await readFile(filePath, "utf-8");
    const formattedData: string = formatContent(content);
    await writeFile(filePath, formattedData, "utf-8");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}

readAndFormatMarkdownFile(
  "/home/cybergu0ck/pc/projects/custom-markdown-formatter/test.md",
);
