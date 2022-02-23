# use-modal-state

This simple utility is a [React hook](https://reactjs.org/docs/hooks-intro.html) that aims at simplifying the state
management for modals.

## Installation

Yarn:

```
yarn install use-modal-state
```

NPM:

```
npm install use-modal-state
```

## Usage with Material UI
In this example we can see how this simple hook can be used in Material UI.
```typescript jsx

type Message = {
  title: string;
  message: string;
};

function MessageDialog({ state }: { state: ModalState<Message> }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={state.isOpen} onClose={state.close}>
      <DialogTitle>{state.data?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{state.data?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={state.close}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Demo() {
  const messageDialog = useModalState<Message>();
  return (
    <>
      <MessageDialog state={messageDialog} />
      <Button
        variant="contained"
        children="OPEN DIALOG"
        onClick={() =>
          messageDialog.open({
            title: "Hello 👋",
            message: "Hello world!"
          })
        }
      />
    </>
  );
}
```
You can find the same example in the [code sandbox](https://codesandbox.io/s/use-modal-state-no7fv?file=/src/Demo.tsx).

## API

* `useModalState<T>(initial?: T, options?: ModalStateOptions) : ModalState<T>`: hook that declares and returns a modal state.
  * `initial`: initial value for the modal. Any value `!== undefined` makes the dialog initially open.
  * `options`: options dictionary
    * `transitionDuration`: Tells the hook how many milliseconds are required for the dialog to completely close. 
      This is needed so that the data is not immediately unset from the state (as opposed to the `isOpen` property) in order to avoid the dialog to
      prematurely change or remove content (while it is still closing).
* `ModalState<T>`: type that holds the modal state information
  * `open(data: T)`: function that opens the dialog and sets the given data
  * `close()`: function that closes the dialog and unsets the data
  * `isOpen`: boolean that tells whether the modal is open or not
  * `data`: data (of type `T`) associated with the open dialog. When `undefined` the dialog is closed. 