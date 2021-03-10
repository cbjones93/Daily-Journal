console.log("Welcome to the main module")
import { journalList } from "../scripts/feed/JournalEntryList.js"
import { getJournalEntries } from "../scripts/Data/DataManager.js"
// import { EntryListComponent } from "./JournalEntryList.js"
// EntryListComponent();
const showJournalList = ()=>{
	const journalElement = document.querySelector(".journalEntryBox");
	getJournalEntries().then((allJournal)=>{
		journalElement.innerHTML=journalList(allJournal);
	})
}
showJournalList();
// ------------EVENT LISTENERS-------------///
const applicationElement = document.querySelector(".dailyJournal");

applicationElement.addEventListener('click', event => { 
    if (event.target.id ==="recordEntry"){
        alert(`Entry Recorded!`)
    }
})
applicationElement.addEventListener("click", event => {
	if (event.target.id === "date"){
		console.log("user clicked on date")
	}
})
applicationElement.addEventListener("click", event => {
	if (event.target.id === "conceptsCovered"){
		console.log("user clicked on concepts covered")
	}
})
applicationElement.addEventListener("click", event => {
	if (event.target.id === "journalEntry"){
		console.log("user clicked on journal entry")
	}
})
applicationElement.addEventListener("click", event => {
	if (event.target.id === "mood"){
		console.log("user clicked on mood")
	}
})