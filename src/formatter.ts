const lineBreakTags: string[] = ["<br>", "<br/>"];
const lineBreak: string = "<br/>";
const totalVerticalOffset: number = 5;

export function chiselContent(content: string): string {
  const lines = content.split(/\r?\n/);
  let res: string = "";

  let isCodeBlock: Boolean = false;
  let prevLine: String = "";

  for (const line of lines) {
    if (line.startsWith('```')){
        isCodeBlock = !isCodeBlock;
    }

    const trimmed = line.trim();
    let isBulletPoint = false;
    let isImage = false;
    if(trimmed.startsWith('-') || trimmed.startsWith('*')){
        isBulletPoint = true;
    }
    else if(trimmed.startsWith('!'))
    {
        isImage = true;
    }


    if(isCodeBlock){
        res += line;
        res += "\n";
    }
    else if(isBulletPoint){
        res += line;
        res += "\n";
    }
    else if(isImage){
        res += line;
        res += "\n";
    }
    else{
        if (lineBreakTags.includes(trimmed) || trimmed === ""){
            res += "\n";
            prevLine = line;
            continue;
        }

        const headingMatch = trimmed.match(/^(#{1,4})\s/);
        if (headingMatch) {
            const level = headingMatch[1].length; // number of '#'
            const neededLineBreaks = totalVerticalOffset - level;

            let brs = Array(neededLineBreaks).fill(lineBreak).join("\n");
            res += brs + '\n\n';
            res += trimmed;
        } 
        else {
            if(prevLine.trim().startsWith('-')){
                res += '\n';
            }
            if(prevLine.trim().startsWith('!')){
                res += '\n';
            }
            res += trimmed;
        }
        res += "\n";
    }
    
    prevLine = line;
  }

  return res;
}
