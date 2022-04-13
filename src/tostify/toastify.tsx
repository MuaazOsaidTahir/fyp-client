import { Flip, toast } from 'react-toastify';

export const notificationToastify = (text: string, type: string) => {
    if (type === 'success') {
        return toast.success(text, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Flip,
            type: "success"
        })
    }
    else if (type === 'error') {
        return toast.error(text, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Flip,
            type: "error"
        })
    }
};