export const MAX_FILE_SIZE = 5000000
export const imageSizeValidator = (val: { image: FileList }) => {
    if (val.image === null || val.image.length === 0) {
        return true
    }
    return val.image.item(0).size <= MAX_FILE_SIZE
}