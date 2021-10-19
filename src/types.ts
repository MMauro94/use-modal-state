/**
 * Base state that contains the common APIs
 */
export type BaseModalState<T> = {
    /**
     * Opens the dialog, using the given data
     * @param data
     */
    open: (data: T) => void

    /**
     * Closes the dialog
     */
    close: () => void
}

/**
 * Modal state when the dialog is opened
 */
export type OpenModalState<T> = BaseModalState<T> & {
    isOpen: true
    data: T
}

/**
 * Modal state when the dialog is closed
 */
export type ClosedModalState<T> = BaseModalState<T> & {
    isOpen: false
    data: undefined | T
}

export type ModalState<T> = OpenModalState<T> | ClosedModalState<T>

/**
 * Options to pass to the useModalState hook
 */
export type ModalStateOptions = {
    /**
     * Tells the hook how many milliseconds are required for the dialog to completely close.
     * This is needed so that the data is not immediately unset from the state (as opposed to the `isOpen` property) in order to avoid the dialog to
     * prematurely change or remove content.
     */
    transitionDuration?: number
}