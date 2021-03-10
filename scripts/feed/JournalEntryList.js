/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data module component
 */
// import { getJournalEntries } from "./JournalData.js"
// import { JournalEntryComponent } from "./JournalEntry.js"

// // DOM reference to where all entries will be rendered

// const entryLog = document.querySelector("#entryLog")

import { JournalEntryComponent } from "./JournalEntry.js"

export const journalList = (allJournal) =>{
    let journalHTML = "";
    for (const journalObject of allJournal) {
        journalHTML +=JournalEntryComponent(journalObject)
    }
    return journalHTML;
}
