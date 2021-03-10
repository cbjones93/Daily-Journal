export const getJournalEntries = () => {
    return fetch ("http://localhost:8088/journalEntries")
    .then (response =>response.json())
    }