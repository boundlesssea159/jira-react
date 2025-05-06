export const delayFetch = async (fetch: any, delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetch()
}