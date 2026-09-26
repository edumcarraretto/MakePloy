const fs = require('fs');
let file = fs.readFileSync('c:/Users/edumc/dev/Crivalid/src/components/creation/VisualToCodePreview.tsx', 'utf8');

// Replace highlightCode
const oldHighlight = `function highlightCode(code: string) {
  let res = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res = res.replace(/\\b(export|default|function|return|import|from)\\b/g, '<span class="text-pink-400">$1</span>');
  res = res.replace(/"([^"]*)"/g, '<span class="text-green-300">"$1"</span>');
  res = res.replace(/&lt;([A-Z]\\w+)/g, '&lt;<span class="text-amber-200">$1</span>');
  res = res.replace(/&lt;\\/([A-Z]\\w+)&gt;/g, '&lt;/<span class="text-amber-200">$1</span>&gt;');
  res = res.replace(/&lt;([a-z]+)/g, '&lt;<span class="text-blue-300">$1</span>');
  res = res.replace(/&lt;\\/([a-z]+)&gt;/g, '&lt;/<span class="text-blue-300">$1</span>&gt;');
  res = res.replace(/ ([a-zA-Z]+)=/g, ' <span class="text-sky-300">$1</span>=');
  res = res.replace(/(function )([A-Z]\\w+)/g, '$1<span class="text-amber-200">$2</span>');
  return res;
}`;

const newHighlight = `function highlightCode(code: string) {
  let res = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res = res.replace(/"([^"]*)"/g, '___STR_$1___');
  res = res.replace(/\\b(export|default|function|return|import|from)\\b/g, '___KW_$1___');
  res = res.replace(/&lt;([A-Z]\\w+)/g, '&lt;___COMP_$1___');
  res = res.replace(/&lt;\\/([A-Z]\\w+)&gt;/g, '&lt;/___COMP_$1___&gt;');
  res = res.replace(/&lt;([a-z]+)/g, '&lt;___TAG_$1___');
  res = res.replace(/&lt;\\/([a-z]+)&gt;/g, '&lt;/___TAG_$1___&gt;');
  res = res.replace(/ ([a-zA-Z]+)=/g, ' ___PROP_$1___=');
  res = res.replace(/___KW_function___ ([A-Z]\\w+)/g, '___KW_function___ ___COMP_$1___');
  
  res = res.replace(/___STR_(.*?)___/g, '<span class="text-green-300">"$1"</span>');
  res = res.replace(/___KW_([a-z]+)___/g, '<span class="text-pink-400">$1</span>');
  res = res.replace(/___COMP_([A-Za-z0-9]+)___/g, '<span class="text-amber-200">$1</span>');
  res = res.replace(/___TAG_([a-z]+)___/g, '<span class="text-blue-300">$1</span>');
  res = res.replace(/___PROP_([a-zA-Z]+)___/g, '<span class="text-sky-300">$1</span>');
  
  return res;
}`;

// Normalize line endings to avoid \r\n vs \n mismatch
const normalizedFile = file.replace(/\r\n/g, '\n');
file = normalizedFile.replace(oldHighlight.replace(/\r\n/g, '\n'), newHighlight);

// Replace mapping for typing effect
const oldMapping = `{allLines.map((el) => {
               if (el.index >= stage) return null;
               return el.lines.map(line => (
                 <div key={line.number} className="flex gap-2 px-2 hover:bg-white/5">
                   <span className="w-4 shrink-0 text-right text-neutral-600 select-none">{line.number}</span>
                   <span className="min-w-0 whitespace-pre-wrap break-words text-neutral-300" dangerouslySetInnerHTML={{ __html: highlightCode(line.text) }} />
                 </div>
               ))
             })}`;

const newMapping = `{allLines.map((el) => {
               if (el.index >= stage) return null;
               const isNew = el.index === stage - 1;
               return el.lines.map((line, idx) => (
                 <div key={line.number} className="flex gap-2 px-2 hover:bg-white/5">
                   <span className="w-4 shrink-0 text-right text-neutral-600 select-none">{line.number}</span>
                   <motion.div
                     initial={isNew ? { clipPath: "inset(0 100% 0 0)" } : { clipPath: "inset(0 0% 0 0)" }}
                     animate={{ clipPath: "inset(0 0% 0 0)" }}
                     transition={{ duration: 0.6, delay: isNew ? idx * 0.15 : 0, ease: "linear" }}
                     className="min-w-0 whitespace-pre-wrap break-words text-neutral-300"
                     dangerouslySetInnerHTML={{ __html: highlightCode(line.text) }}
                   />
                 </div>
               ))
             })}`;

file = file.replace(oldMapping.replace(/\r\n/g, '\n'), newMapping);

fs.writeFileSync('c:/Users/edumc/dev/Crivalid/src/components/creation/VisualToCodePreview.tsx', file);
console.log('Update complete');
