// const API_PROP = "/api/prop";

// export async function sendProp(newProp) {
//     const response = await fetch(API_PROP, {
//         method: "POST", 
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newProp)
//     })
//     const responseFromBE = await response.json();
//     if (response.ok) {
//         console.log(responseFromBE);
//         return responseFromBE;
//     } else {
//         if (responseFromBE) {
//             throw responseFromBE
//         } else {
//             throw new Error("Error Api newProp")
//         }
//     }
// }

// export async function getProps() {
//     const response = await fetch(`${API_PROP}/getpropfromuser`);
//     if (response.ok) {
//         const data = await response.json();
//         return data;
//     } else {
//         throw new Error("Failed to get proposition")
//     }
// }



// // export async function getImage(id) {
// //     const response = await fetch(`${API_PROP}/getimage?id=${id}`);
// //     if (response.ok) {
// //         const data = await response.text();
// //         return `data:image/jpg;base64,${data}`;
// //       } else {
// //         throw new Error("Failed to get image");
// //       }
// // }