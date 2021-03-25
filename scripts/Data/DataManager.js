let postCollection = [];

export const usePostCollection = () => {
    return [...postCollection]
}

export const getJournalEntries = () => {
    return fetch(`http://localhost:8088/journalEntries`)
        .then(response => response.json())
        .then(parsedResponse => {
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
export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/journalEntries/${postId}`)
        .then(response => response.json())
}

export const updatePost = postObj => {
    return fetch(`http://localhost:8088/journalEntries/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
        .then(response => response.json())
        .then(getJournalEntries)
}

let loggedInUser = {

}

export const getLoggedInUser = () => {
    return { ...loggedInUser };
}
export const logoutUser = () => {
    loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}
export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      console.log("parsedUser", parsedUser) 
      if (parsedUser.length > 0){
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }else {
        return false;
      }
    })
  }
  export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(parsedUser => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
  }

  export const filteredUserPost = () =>{
    const userId = getLoggedInUser().id;
    return fetch (`http://localhost:8088/journalEntries?userId=${userId}&_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("posts with logged in user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
  }