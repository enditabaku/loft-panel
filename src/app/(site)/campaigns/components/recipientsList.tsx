import React, { useState, useRef } from 'react';
import { CircleMinusIcon } from '@/assets/icons';

interface Props {
    otherRecipients: any[];
    setOtherRecipients: any;
}

const RecipientsList = (props: Props) => {
    const [error, setError] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function removeOtherRecipient(otherToremove: string) {
        let tempOthers = [...props.otherRecipients]
        const exists = tempOthers.some(item => item === otherToremove);

        if (exists) {
            // Remove the object if it exists
            tempOthers = tempOthers.filter(item => item !== otherToremove);
        }
        props.setOtherRecipients(tempOthers)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            const value = e.target.value.trim();
            if (!emailRegex.test(value)) {
                setError(true);
            } else {
                props.setOtherRecipients([...props.otherRecipients, value]);
                setError(false);
                e.target.value = ''; // clear input
            }
        }
    };

    const parseCSV = (csvText: string) => {
        const rows = csvText.split('\n').map((row) => row.trim()).filter(Boolean);
        const headers = rows[0].split(',').map((h) => h.trim());
        return rows.slice(1).map((row) => {
            const values = row.split(',').map((v) => v.trim());
            return headers.reduce((acc, header, i) => ({ ...acc, [header]: values[i] || '' }), {});
        });
    };

    const readUploadFile = (e: any) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = (ev: any) => {
                const text = ev.target.result;
                const json = parseCSV(text);
                if (json) {
                    const recip = [...props.otherRecipients];
                    const emails = Object.values(json).map((obj: any) => obj.email);
                    recip.push(...emails);
                    props.setOtherRecipients(recip)
                }
            };

            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };

    return (
        <div className="bg-white border border-gray-200 h-[665px] overflow-y-auto p-6">
            <h2 className="text-md font-semibold mb-4">Recipients List</h2>

            <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Add other emails</h3>
                <input
                    type="email"
                    onKeyDown={handleKeyDown}
                    className={`w-full p-2 text-sm border rounded ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter email and press Enter"
                />
                {error && <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>}
            </div>

            <div className="flex flex-wrap justify-end items-center gap-4 mb-4">
                {/* TODO: BULK IMPORT */}
                <button
                    onClick={handleButtonClick}
                    className="flex items-center gap-2 px-4 py-1 border border-green-600 text-green-700 rounded hover:bg-green-50"
                >
                    <span className="text-sm">Bulk import (.csv file)</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={readUploadFile}
                    className="hidden"
                    accept=".csv"
                />
                {props.otherRecipients.length > 0 && (
                    <button
                        onClick={() => {
                            props.setOtherRecipients([]);
                            setUploadedFile(null);
                        }}
                        className="flex items-center gap-2 px-4 py-1 border border-red-600 text-red-700 rounded hover:bg-red-50"
                    >
                        {/* <IconTrashX size={20} /> */}
                        <span className="text-sm">Remove All Others</span>
                    </button>
                )}
            </div>

            {uploadedFile && (
                <p className="text-sm text-gray-500 mb-4">{uploadedFile.name}</p>
            )}
            {props.otherRecipients.length > 0 &&
                props.otherRecipients.map((email, index) => (
                    <div key={index} className="flex items-center mb-3">
                        <div className={`flex-1 px-3 py-1 text-sm border ${emailRegex.test(email) ? 'border-blue-500 text-blue-800' : 'border-red-500'} rounded truncate`}>
                            {email}
                        </div>
                        <button
                            onClick={() => removeOtherRecipient(email)}
                            className="ml-2 text-red-600"
                        >
                            <CircleMinusIcon />
                        </button>
                    </div>
                ))}

            <>
                {props?.otherRecipients?.length <= 0 && (
                    <div className="flex flex-col items-center mt-8">
                        <p className="text-sm text-gray-500 mt-2">
                            No recepients were added
                        </p>
                    </div>
                )}
            </>
        </div>
    );
};

export default RecipientsList;
