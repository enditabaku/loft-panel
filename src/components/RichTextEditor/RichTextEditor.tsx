'use client';

import {
  LexicalComposer,
  type InitialConfigType,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ToolbarPlugin } from './ToolbarPlugin';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useState } from 'react';

const theme = {
  // Optionally define your own theme styles
};

const initialConfig: InitialConfigType = {
  namespace: 'MyEditor',
  theme,
  onError: (error) => console.error(error),
  editorState: null,
};

export default function RichTextEditor({value, setValue}: any) {
  
  return (
    <div className="p-4 border border-gray-300 rounded">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] border mt-2 p-2 rounded outline-none" />
          }
          placeholder={<div className="text-gray-400">Enter text...</div>}
          ErrorBoundary={({ children }) => <>{children}</>}
        />

        <HistoryPlugin />

        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              const htmlString = $generateHtmlFromNodes(editor, null);
              setValue(htmlString);
            });
          }}
        />
      </LexicalComposer>
    </div>
  );
}
