// export const codeGenerator = (min: number, max: number, key: any, message: string) => {
//     if (!key || key < min || key > max) {
//         key = Math.random() * (max - min) + min;
//     } else {
//         throw new Error(message);
//     }
// }

export const codeGenerator = (min: number, max: number) => Math.random() * (max - min) + min;