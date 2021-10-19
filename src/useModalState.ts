import {useCallback, useEffect, useMemo, useState} from "react";
import {BaseModalState, ModalState, ModalStateOptions} from "./types";

export function useModalState<T>(initial?: T, options?: ModalStateOptions): ModalState<T> {
    const [data, setData] = useState<T | undefined>(initial)
    const [isOpen, setOpen] = useState(initial !== undefined)

    const openModal = useCallback((value: T) => {
        setData(value)
        setOpen(true)
    }, [setData, setOpen])

    const closeDialog = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const transitionDuration = options?.transitionDuration ?? 0
    useEffect(() => {
        if (!isOpen && data !== undefined) {
            const t = setTimeout(() => {
                setData(undefined)
            }, options?.transitionDuration)
            return () => clearTimeout(t)
        }
    }, [isOpen, data, transitionDuration])

    return useMemo<ModalState<T>>(() => {
        const base: BaseModalState<T> = {
            open: openModal,
            close: closeDialog
        }
        if (isOpen && data !== undefined) {
            return {
                ...base,
                isOpen: true,
                data: data
            }
        } else {
            return {
                ...base,
                isOpen: false,
                data: data
            }
        }
    }, [isOpen, data, openModal, closeDialog])
}