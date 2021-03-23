let postCollection =[];

export const usePostCollection = () =>{
    return [...postCollection]
}

export const getJournalEntries = () => {
    return fetch (`http://localhost:8088/journalEntries`)
    .then (response =>response.json())
    .then(parsedResponse =>{
        postCollection = parsedResponse
        return parsedResponse;
    })
    }

    export const createPost = postObj => {
        return fetch(`http://localhost:8088/journalEntries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
      
        })
            .then(response => response.json())
      }

      export const deletePost = postId => {
        return fetch(`http://localhost:8088/journalEntries/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
      
        })
            .then(response => response.json())
            .then(getJournalEntries)
      }