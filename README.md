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

type Recipe = {
    id: number
    title: string
    instructions: string
}

function Recipes({recipes}: { recipes: Recipe[] }) {
    // Declare the dialog state
    const modal = useMuiModalState<Recipe>()

    return <>
        <MyDialog state={modal} />
        Recipes:
        {recipes.map(recipe => {
            return <span key={recipe.id} onClick={() => modal.open(recipe)}>
                {recipe.title}
            </span>
        })}
    </>
}

// Dialog component: state contains the dialog state and open/close APIs
function MyDialog({state}: { state: ModalState<Recipe> }) {
    return <Dialog
        open={state.isOpen}
        onClose={state.close}
    >
        {state.data && <>
            <DialogTitle>
                {state.data.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {state.data.instructions}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={state.close}>Close</Button>
            </DialogActions>
        </>}
    </Dialog>
}

// Use MUI theme to automatically set transitionDuration
function useMuiModalState<T>(initial?: T): ModalState<T> {
    const theme = useTheme()
    return useModalState(initial, {
        transitionDuration: theme.transitions.duration.leavingScreen
    })
}
```

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