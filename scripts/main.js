console.log("Welcome to the main module")
import { journalList } from "../scripts/feed/JournalEntryList.js"
import { getJournalEntries,usePostCollection } from "../scripts/Data/DataManager.js"
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
// applicationElement.addEventListener("change", event => {
// 	if (event.target.id === "date"){
// 		const dateAsNumber = parseInt(event.target.value)
// 		console.log(`User wants to see posts since ${dateAsNumber}`)
// 		showFilteredDatePosts(dateAsNumber);
// 	}
// })

applicationElement.addEventListener("change", event => {
	if (event.target.id === "mood"){
		const moodValue = (event.target.value)
		console.log(`User wants to see posts with a mood of ${moodValue}`)
		showFilteredMoodPosts(moodValue);
	}
})
// const showFilteredDatePosts = (date) => {
// 	//get a copy of the post collection
// 	const epoch = Date.parse(`${date}`);
// 	//filter the data
// 	const filteredData = usePostCollection().filter(singlePost => {
// 	  if (singlePost.timestamp >= epoch) {
// 		return singlePost
// 	  }
// 	})
// 	const postElement = document.querySelector(".journalEntryBox");
// 	postElement.innerHTML = journalList(filteredData);
//   }

const showFilteredMoodPosts = () =>{
	const filteredMood = usePostCollection().filter(singePost=>{
		if(singlePost.mood === "Okay"){
			return singePost
		}
	})
	const postMoodElement = document.querySelector(".journalEntryBox");
	postMoodElement.innerHTML = journalList(filteredMoodDate);
}