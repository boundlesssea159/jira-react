import {useEffect} from "react";

// todo wrap a hook to change document.title( when return to last page,show the title of last page)
export const useDocumentTitle = (title: string) => {
    document.title = title
    // const oldTitle = document.title
    // document.title = title
    //
    // useEffect(() => {
    //     return () => {
    //         if (!keepOnUnmount) {
    //             document.title = oldTitle
    //         }
    //     }
    // }, [keepOnUnmount, oldTitle])
}