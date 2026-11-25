import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

interface Token {
  type: 'text' | 'inline' | 'display';
  content: string;
}

function tokenizeMath(input: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        content: input.slice(lastIndex, match.index),
      });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: 'display', content: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'inline', content: match[2] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', content: input.slice(lastIndex) });
  }

  return tokens;
}

function renderLatexHtml(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    return latex;
  }
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const tokens = useMemo(() => tokenizeMath(text), [text]);

  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        if (token.type === 'text') {
          return (
            <React.Fragment key={idx}>
              {token.content.split('\n').map((line, lineIdx, arr) => (
                <React.Fragment key={lineIdx}>
                  {line}
                  {lineIdx < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        }

        if (token.type === 'display') {
          const html = renderLatexHtml(token.content, true);
          return (
            <span
              key={idx}
              className="block w-full overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        const html = renderLatexHtml(token.content, false);
        return (
          <span
            key={idx}
            className="inline-block align-middle max-w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
};
