let postCollection =[];

export const usePostCollection = () =>{
    return [...postCollection]
}

export const getJournalEntries = () => {
    return fetch ("http://localhost:8088/journalEntries")
    .then (response =>response.json())
    .then(parsedResponse =>{
        postCollection = parsedResponse
        return parsedResponse;
    })
    }
