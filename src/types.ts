
export type BaseModalState<T> = {
    open: (data: T) => void
    close: () => void
}

export type OpenModalState<T> = BaseModalState<T> & {
    isOpen: true
    data: T
}

export type ClosedModalState<T> = BaseModalState<T> & {
    isOpen: false
    data: undefined
}

export type ModalState<T> = OpenModalState<T> | ClosedModalState<T>

export type ModalStateOptions = {
    transitionDuration?: number
}