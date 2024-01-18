export const wait = (second) => {
    return new Promise(
        (resolve, reject) => {
            setTimeout(resolve, 1000*second);
        }
    )
}