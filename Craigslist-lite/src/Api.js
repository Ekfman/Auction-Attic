

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
        const result = await response.json();
        if( result.success === true){
            return result.data.token;
        } else{
            console.error(result.error.message)
        }
    }catch (err) {
        console.error(err)
    }
}