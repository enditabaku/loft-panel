'use client'
import React, { useState } from 'react';
import RecipientsList from './components/recipientsList';
import MailBody from './components/mailBody';
import CampaignsService from '@/services/campaign';
import toast from 'react-hot-toast';

function TabPanel({ children, value, index }: any) {
    return value === index ? <div>{children}</div> : null;
}

const Campaigns = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [otherRecipients, setOtherRecipients] = useState<any[]>([]);

    const [from, setFrom] = useState<"info" | "marketing" | "">("info");
    const [bccList, setBccList] = useState([]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [base64Files, setBase64Files] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);


    const recipientsEmails = () => {
        const emails: string[] = [];
        otherRecipients?.forEach((oth: string) => emails.push(oth));
        return emails;
    };

    const clearFields = () => {
        setOtherRecipients([]);
        setFrom("info");
        setBccList([]);
        setSubject("");
        setMessage("");
        setBase64Files([]);
        setFiles([]);
    };

    const sendMail = async () => {
        setIsLoading(true);
        try {
            const body: any = {
                from,
                to: recipientsEmails(),
                subject,
                body: message,
                campaign_for: "general",
                attachments: base64Files,
                bcc: bccList
            };
            if (!body.bccList?.length) delete body.bccList;

            const result: any =  await CampaignsService.sendemail(body);
            if (result?.data?.success) {
                // success
                toast.success("Email sent successfully!")
                clearFields();
            } else {
                toast.error(result?.data?.message ?? "Something went wrong! Please check all fields and try again!")
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "Something went wrong! Please check all fields and try again!")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Middle Recipients List */}
                <div className="w-full md:w-5/12">
                    <RecipientsList
                        otherRecipients={otherRecipients}
                        setOtherRecipients={setOtherRecipients}
                    />
                </div>
                {/* Right Mail Body */}
                <div className="w-full md:w-7/12">
                    <MailBody
                        from={from}
                        setFrom={setFrom}
                        files={files}
                        setFiles={setFiles}
                        bccList={bccList}
                        setBccList={setBccList}
                        subject={subject}
                        setSubject={setSubject}
                        message={message}
                        setMessage={setMessage}
                        base64Files={base64Files}
                        setBase64Files={setBase64Files}
                    />
                </div>
            </div>
            <div className="text-right">
                <button
                    onClick={sendMail} //sendMail
                    disabled={isLoading}
                    className="bg-dark text-white px-6 py-2 hover:bg-lime-700 disabled:opacity-50"
                >
                    Send Mail
                </button>
            </div>
        </div>
    );
};

Campaigns.Layout = "authGuard";
export default Campaigns;
