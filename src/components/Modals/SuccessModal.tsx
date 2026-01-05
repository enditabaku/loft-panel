import { XIcon } from "@/assets/icons";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { CongratulationsIcon } from "./icons";
import { Button } from "../ui-elements/button";

type Props = {
    open: boolean,
    setModalOpen: any,
    title?: string,
    description?: string,
    hasButton: boolean,
    buttonTxt?: string,
    onButtonClick?: any
}

const SuccessModal = ({ open, setModalOpen, title, description, hasButton = false, buttonTxt, onButtonClick }: Props) => {
    return (
        <Modal
            open={open}
            onClose={() => setModalOpen(false)}
            className="relative max-h-fit w-full max-w-[550px] rounded-[15px] bg-green-900 px-4 py-8 text-center md:px-10 md:py-10"
        >
            <span className="mx-auto flex h-19.5 w-full max-w-19.5 items-center justify-center rounded-full bg-white bg-opacity-10">
                <CongratulationsIcon />
            </span>
            <h3 className="mb-3 mt-5.5 text-xl font-black text-white sm:text-[35px] sm:leading-[47px]">
                {title ?? 'Congratulations!'}
            </h3>

            <p className="mb-6 font-medium text-white">
                {description ?? "Operation completeed successfully!"}
            </p>
            {hasButton && (
                <Button
                    onClick={onButtonClick}
                    label={buttonTxt ?? ''}
                    typeof="button"
                    className="inline-block rounded-[7px] border border-white px-13 py-[11px] text-center font-medium text-white transition hover:bg-white hover:text-primary"
                />
            )}
            <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-primary"
            >
                <XIcon />
            </button>
        </Modal>
    );
};

export default SuccessModal;
