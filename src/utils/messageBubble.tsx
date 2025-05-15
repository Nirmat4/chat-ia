import React, { useContext } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import FitbitRoundedIcon from '@mui/icons-material/FitbitRounded';
import Options from "./options";
import { Context } from '@/app/context/context';

interface Message {
  id: string;
  role: string;
  content: string;
  date: Date;
}

export const MemoizedMessageBubble = React.memo(function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const { send }=useContext(Context)

  // Definimos componentes de ReactMarkdown con tipo extendido para <think>
  const mdComponents: Components & { think?: React.FC<any> } = {
    p: ({ node, ...props }) => <p className="m-0 leading-normal" {...props} />,
    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="p-1 px-4 list-decimal list-inside" {...props} />,
    ul: ({ node, ...props }) => <ul className="p-1 px-4 list-disc list-inside" {...props} />,
    li: ({ node, ...props }) => <li className="my-2" {...props} />,
    span: ({ node, ...props }) => <span className="m-0" {...props} />,
    hr: ({ node, ...props }) => <hr className="my-2 mt-4 opacity-20" {...props} />
  };

  const segments = React.useMemo(() => {
    const text = message.content;
    const startTag = '<think>';
    const endTag = '</think>';
    const startIdx = text.indexOf(startTag);
    const endIdx = text.indexOf(endTag);
    const parts: { type: 'text' | 'think'; content: string }[] = [];

    if (startIdx === -1) {
      parts.push({ type: 'text', content: text });
    } else {
      if (startIdx > 0) {
        parts.push({ type: 'text', content: text.slice(0, startIdx) });
      }
      if (endIdx === -1) {
        const inner = text.slice(startIdx + startTag.length);
        parts.push({ type: 'think', content: inner });
      } else {
        const inner = text.slice(startIdx + startTag.length, endIdx);
        parts.push({ type: 'think', content: inner });
        if (endIdx + endTag.length < text.length) {
          parts.push({ type: 'text', content: text.slice(endIdx + endTag.length) });
        }
      }
    }
    return parts;
  }, [message.content]);

  return (
    <div className={`flex m-1 items-start justify-${isUser ? 'end' : 'start'}`}>
      <div className={`p-2 m-2 ${isUser ? 'bg-card backdrop-blur-sm rounded-xl max-w-[80%] justify-end px-4' : ''}`}>
        {message.role === 'assistant'
          ? segments.map((seg, idx) =>
              seg.type === 'think' ? (
                <div key={idx}>
                  <div className="bg-card rounded-lg backdrop-blur-sm w-[100px] mb-2 p-1 flex flex-row justify-around items-center">
                    <FitbitRoundedIcon style={{fontSize: 16}}/>
                    <p className="font-sans">Thought</p>
                  </div>
                  <div className="bg-card p-4 border-l-[#99a1af30] border-l-4 rounded-r-lg mb-2 text-gray-700 backdrop-blur-sm">
                    {seg.content.split('\n').map((line, i) => (
                      <p key={i} className="m-0 whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={idx}>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={mdComponents}
                  >
                    {seg.content}
                  </ReactMarkdown>
                  {send?<></>:<Options/>}
                </div>
              )
            )
          : <p>{message.content}</p>
        }
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.message.id === nextProps.message.id &&
         prevProps.message.content === nextProps.message.content &&
         prevProps.message.role === nextProps.message.role;
});
