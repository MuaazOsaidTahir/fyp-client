import { Flip, toast } from 'react-toastify';

export enum Options {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export const notificationToastify = (text: string, type: Options) => {
    toast(text, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        type: type
    })
    // else if (type === 'error') {
    //     return toast.error(text, {
    //         position: "bottom-right",
    //         autoClose: 1500,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         transition: Flip,
    //         type: "error"
    //     })
    // }
};