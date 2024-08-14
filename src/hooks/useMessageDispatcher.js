import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

/**
 * @author Mohammad Ovesh Ansari
 * A custom hook for dispatching snackbar messages with customizable colors.
 * @returns {function} A function that can be used to display snackbar messages.
 * @example
 * const showMessage = useMessageDispatcher();
 * showMessage({
 *   message: 'example message',
 *   color: 'error'
 * });
 */

const useMessageDispatcher = () => {
    const dispatch = useDispatch();

    /**
     * Display a snackbar message with optional color customization.
     * @param {Object} options - Options for displaying the snackbar message.
     * @param {string} options.message - The message to be displayed in the snackbar.
     * @param {string} [options.color='success'] - The color of the snackbar (e.g., 'success', 'error', 'info', 'warning').
     */

    const showSnackbar = ({ message, color, type }) => {
        let snackbarColor;

        if (color === 'success' || type === 'success') {
            snackbarColor = 'success';
        } else if (color === 'error' || type === 'error') {
            snackbarColor = 'error';
        } else {
            snackbarColor = 'success';
        }

        dispatch(
            openSnackbar({
                open: true,
                message,
                variant: 'alert',
                alert: {
                    color: snackbarColor
                },
                close: true
            })
        );
    };

    return showSnackbar;
};

export default useMessageDispatcher;
