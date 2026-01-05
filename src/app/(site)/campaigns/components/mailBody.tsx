'use client';

import React, { useState } from 'react';
import { imageToBase64 } from '@/lib/utils';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';

interface Props {
    subject: string;
    setSubject: any;
    message: string;
    setMessage: any;
    from: "marketing" | "info" | "";
    setFrom: any;
    base64Files: any[];
    setBase64Files: any;
    bccList: string[];
    setBccList: any;
    files: File[];
    setFiles: any;
}

const MailBody = ({
    subject,
    setSubject,
    message,
    setMessage,
    from,
    setFrom,
    base64Files,
    setBase64Files,
    bccList,
    setBccList,
    files,
    setFiles
}: Props) => {
    const [error, setError] = useState(false);
    const [tempValue, setTempValue] = useState<string>("");

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || []);
        const newFiles = [...files, ...uploadedFiles];
        setFiles(newFiles);

        const newBase64Files = await Promise.all(
            uploadedFiles.map((file: File) => imageToBase64(file))
        );

        setBase64Files([...base64Files, ...newBase64Files]);
    };

    const removeFiles = (indexToRemove: number) => {
        const updatedBase64 = [...base64Files];
        const updatedFiles = [...files];
        updatedBase64.splice(indexToRemove, 1);
        updatedFiles.splice(indexToRemove, 1);
        setBase64Files(updatedBase64);
        setFiles(updatedFiles);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (e.key === "Enter") {
            e.preventDefault();
            if (!emailRegex.test(tempValue)) {
                setError(true);
            } else {
                setBccList([...bccList, tempValue]);
                setError(false);
                setTempValue("");
            }
        }
    };

    const handleDelete = (emailToDelete: string) => {
        setBccList(bccList.filter((item) => item !== emailToDelete));
    };

    return (
        <div className="h-[665px] overflow-y-auto bg-white dark:bg-gray-900 p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">From</label>
                <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                >
                    <option value="free_taxi">info@freetaxi.al</option>
                    <option value="info">info@pluggo.al</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">BCC</label>
                <div className="p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <input
                        type="email"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter email and press Enter"
                        className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent py-1 focus:outline-none text-sm"
                    />
                    {error && (
                        <p className="text-red-600 text-xs mt-1">Please enter a valid email address.</p>
                    )}
                    <div className="flex flex-wrap mt-2 gap-2">
                        {bccList.map((email, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                            >
                                {email}
                                <button onClick={() => handleDelete(email)} className="text-red-500 hover:text-red-700 text-xs font-bold">x</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Attachments</label>
                <div className="p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                {files?.length > 0 && files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            {file.name}, {file.type}
                        </p>
                        <button
                            onClick={() => removeFiles(index)}
                            className="text-red-600 text-sm hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Message</label>
                <RichTextEditor value={message} setValue={setMessage} />
            </div>
        </div>
    );
};

export default MailBody;
