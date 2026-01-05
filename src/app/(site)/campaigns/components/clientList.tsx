"use client"
import React, { useState, useRef, useEffect } from "react";
// assets
import { SearchIcon } from "@/assets/icons";
// components
// api

interface Props {
    clientRecipients: any[];
    setClientRecipients: any;
    allClientsSelected: boolean;
    setAllClientsSelected: any;
    recipients: any[];
    setRecipients: any;
}

const ClientsList = (props: Props) => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const searchRef = useRef<any>(null);

    const handleSearchChange = React.useCallback((localSearch: string) => {
        setSearch(localSearch);
    }, []);


    function addRecipient(client: any) {
        const allClients = [...props.clientRecipients];
        const allRec = [...props.recipients];
        if (!allRec.some(item => item.id === client.id)) {
            allClients.push(client);
            allRec.push(client);
            props.setClientRecipients(allClients);
            props.setRecipients(allRec);
        }
    }

    function checkExists(client: any) {
        return props.recipients.some(item => item.id === client.id);
    }

    function addAllClients() {
        props.setAllClientsSelected(true);
        const filteredArray = props.recipients.filter(
            item1 => !props.clientRecipients.some(item2 => item1.id === item2.id)
        );
        props.setClientRecipients([]);
        props.setRecipients(filteredArray);
    }

    function removeAllClients() {
        props.setAllClientsSelected(false);
        props.setClientRecipients([]);
    }

    return (
        <div className="bg-white  shadow p-4 h-[500px] overflow-y-auto">
            <div className="px-2">
                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">
                        {error}
                    </div>
                )}
                <h2 className="text-md font-semibold mb-4">Clients List: Click to add as recipient</h2>

               
                {props.allClientsSelected ? (
                    <button
                        className="w-full text-sm bg-red-100 border border-red-500 text-red-600 py-2 px-4 rounded hover:bg-red-200 mb-4"
                        onClick={removeAllClients}
                    >
                        Remove all clients from recipients list
                    </button>
                ) : (
                    <button
                        className="w-full text-sm bg-indigo-100 border border-indigo-500 text-indigo-600 py-1 px-4 rounded hover:bg-indigo-200 mb-4"
                        onClick={addAllClients}
                    >
                        Add all clients as recipients
                    </button>
                )}
                {/* <div className="relative z-20 w-full max-w-[414px]">
                    <input
                        type="text"
                        defaultValue={search || ""}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full  border text-sm border-stroke bg-transparent px-5 py-1.5 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                        placeholder="Search here..."
                        ref={searchRef}
                    />

                    <button className="absolute right-0 top-0 flex h-8.5 w-8.5 items-center justify-center rounded-r-md bg-primary text-white" onClick={() => { setSearch(searchRef.current.value) }}>
                        <SearchIcon className="size-4" />
                    </button>
                </div> */}

                {isLoading ? (
                    <div className="flex justify-center items-center mt-8 mb-8">
                        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                    </div>
                ) : (
                    <>
                        {data?.length > 0 ? (
                            <div className="mt-4 space-y-3">
                                {data.map((client: any) => (
                                    <button
                                        key={client.id}
                                        onClick={() => addRecipient(client)}
                                        disabled={checkExists(client)}
                                        className={`w-full flex flex-col items-start border rounded py-1 px-3 ${checkExists(client)
                                            ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
                                            : 'border-gray-400 hover:bg-gray-50'
                                            }`}
                                    >
                                        <p className="text-sm font-medium truncate w-full">{client?.first_name} {client?.last_name}</p>
                                        <p className="text-sm text-gray-600 truncate w-full">{client?.email}</p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center mt-8 text-center">
                                <div>
                                    No Clients Found
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientsList;
