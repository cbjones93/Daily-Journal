/*
 *   Journal data for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
// const journal = [
//     {
//         id: 1,
//         date: "07/24/2025",
//         concept: "HTML & CSS",
//         entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
//         mood: "Ok"
//     },
// ]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const getJournalEntries = () => {
return fetch ("http://localhost:8088/journalEntries")
.then (response =>response.json())
}