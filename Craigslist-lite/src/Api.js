import { async } from "q";


const baseURL = "https://strangers-things.herokuapp.com/api";
const cohortURL = "/2206-ftb-pt-web-pt";

 export const fetchApiPosts = async ()  => {
    try{
        const response = await fetch (`${baseURL}${cohortURL}/posts`);
        const data = await response.json();
        return data.data.posts;
    } catch (err) {
        console.error(err)
    }
}

export const newUserApi = async (username, password, regOrLog) => {
    try{
        const response = await fetch(`${baseURL}${cohortURL}/users/${regOrLog}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        const data = await response.json();
        if( data.success === true){
            return data.data.token;
        } else{
            console.error(data.error.message)
        }
    }catch (err) {
        console.error(err)
    }
}

export const createPostApi = async ({title, description, price, token}) => {
    try{
        const response = await fetch(`${baseURL}${cohortURL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price
                }
            })
        });
        const data = await response.json();
        console.log(data)
        return data.data.newPost;
    } catch (err) {
        console.error(err)
    }
}

// export const updatePostApi = async () => {
//     try{
//         const response = await fetch (`${baseURL}${cohortURL}/${postId}`, {
//             method: "PATCH",
//             headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`
//                     },
//             body: JSON.stringify({
//                 post: {
//                     title,
//                     description,
//                     price,
//                     willDeliver,
//                     location
//                 }
//             })
//         }); 
//         const data = await response.json()
//         if(post.id === postId){
//             return data
//         }
//     } catch (err) {
//     console.error(err)
// }
// }

// export const deletePostApi = async () => {
//  try{
//     const response = await fetch (`${baseURL}${cohortURL}/${postId}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//     }
//  })
//  cont data
// } catch (err) {
//     console.error(err)
// }
// }
