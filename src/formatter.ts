const lineBreakTags: string[] = ["<br>", "<br/>"];
const lineBreak: string = "<br/>";
const totalVerticalOffset: number = 5;

export function chiselContent(content: string): string {
  const lines = content.split(/\r?\n/);
  let res: string = "";

  let isCodeBlock: Boolean = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (lineBreakTags.includes(trimmed) || trimmed === "") continue;
    if (trimmed.startsWith('```')){
        isCodeBlock = !isCodeBlock;
    }

    if(isCodeBlock){
        res += trimmed;
    }
    else{
        const headingMatch = trimmed.match(/^(#{1,4})\s/);
        if (headingMatch) {
            const level = headingMatch[1].length; // number of '#'
            const neededLineBreaks = totalVerticalOffset - level;

            let brs = Array(neededLineBreaks).fill(lineBreak).join("\n");
            res += brs + '\n\n';
            res += trimmed;
        } 
        else {
            res += trimmed;
        }
        res += "\n";
    }
    res += "\n";
  }

  return res;
}
