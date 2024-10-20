import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import remarkGfm from 'remark-gfm';

import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const InfoModal = ({ file }: { file: string }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(`/docs/${file}.md`)
      .then(response => response.text())
      .then(text => setMarkdown(text));
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>도움말</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[900px] max-w-[900px] overflow-y-scroll px-12'>
        <DialogHeader>
          <DialogTitle className='mb-4'>도움말</DialogTitle>
          <DialogDescription>
            <div className='markdown-content'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');

                    return match ? (
                      <SyntaxHighlighter
                        //@ts-expect-error - `dracula` is not a valid prop
                        style={dracula as SyntaxHighlighterProps['style']}
                        language={match[1]}
                        PreTag='div'
                        {...props}
                      >
                        {String(children)}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className || ''} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className='text-2xl font-bold'>{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-xl font-semibold'>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='mt-2 text-lg font-medium'>{children}</h3>
                  ),
                  p: ({ children }) => <p className=''>{children}</p>,
                  ul: ({ children }) => (
                    <ul className='list-disc pl-5'>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='list-decimal pl-5'>{children}</ol>
                  ),
                  li: ({ children }) => <li>{children}</li>,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
