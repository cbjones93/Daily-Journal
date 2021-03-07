console.log("Welcome to the main module")
import { getJournalEntries } from "./JournalData.js"
// import { EntryListComponent } from "./JournalEntryList.js"
// EntryListComponent();

getJournalEntries()
.then (entryData => {
    console.log("Journal Data", entryData)
})