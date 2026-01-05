"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import type ReactQuillType from "react-quill-new";
import Delta from "quill-delta"; // 👈 import Delta

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function RichTextEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) {
  const quillRef = useRef<ReactQuillType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current.getEditor();
    if (!quill) return;

    // Add clipboard matcher for pasted images
    quill.clipboard.addMatcher("IMG", (node: any, delta: any) => {
      const alt = prompt("Enter alt text for this image:") || "";

      const updatedOps = delta.ops.map((op: any) => {
        if (op.insert?.image) {
          return {
            insert: { image: op.insert.image },
            attributes: { alt },
          };
        }
        return op;
      });

      return new Delta(updatedOps); // 👈 wrap in Delta
    });
  }, [mounted]);

  if (!mounted) return null;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <ReactQuill
      // @ts-expect-error temp fix
      ref={quillRef} // required to access getEditor()
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      placeholder="Write your content here..."
    />
  );
}
