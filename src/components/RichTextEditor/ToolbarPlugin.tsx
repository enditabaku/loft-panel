'use client';
import React, { useRef } from 'react'
import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    $isTextNode,
} from 'lexical';
import { $patchStyleText } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

export function ToolbarPlugin() {
    const pickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [editor] = useLexicalComposerContext();
    const [bold, setBold] = useState<boolean>(false);
    const [italic, setItalic] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#000000');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);


    const applyColor = (colorResult: ColorResult) => {
        const selectedColor = colorResult.hex;
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { color: selectedColor });
            }
        });

        setColor(selectedColor);
    };

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    setBold(selection.hasFormat('bold'));
                    setItalic(selection.hasFormat('italic'));

                    const nodes = selection.getNodes();
                    for (const node of nodes) {
                        if ($isTextNode(node)) {
                            const style = node.getStyle();
                            const match = style.match(/color:\s*(#[0-9a-fA-F]{3,6})/);
                            if (match) {
                                setColor(match[1]);
                                break;
                            }
                        }
                    }
                }
            });
        });
    }, [editor]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);
    return (
        <div className="flex items-center gap-2 mb-2 relative">
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                className={`px-2 py-1 rounded ${bold ? 'bg-black text-white' : 'border'}`}
            >
                <b>B</b>
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                className={`px-2 py-1 rounded ${italic ? 'bg-black text-white' : 'border'}`}
            >
                <i>I</i>
            </button>
            <button ref={buttonRef} onClick={() => setShowColorPicker(!showColorPicker)}>
                🎨 Color
            </button>

            <div className="absolute top-10 left-10" ref={pickerRef}>
                {showColorPicker && (
                    <SketchPicker color={color} onChange={applyColor} />
                )}
            </div>
        </div>
    );
}
