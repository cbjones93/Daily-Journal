console.log("Welcome to the main module")
import { journalList } from "../scripts/feed/JournalEntryList.js"
import { PostEntry } from "../scripts/feed/PostEntry.js"
import { createPost, getJournalEntries, usePostCollection,deletePost } from "../scripts/Data/DataManager.js"
// import { EntryListComponent } from "./JournalEntryList.js"
// EntryListComponent();
const showJournalList = () => {
	const journalElement = document.querySelector(".journalEntryBox");
	getJournalEntries().then((allJournal) => {
		journalElement.innerHTML = journalList(allJournal);
	})
}
showJournalList();
// ------------EVENT LISTENERS-------------///
const applicationElement = document.querySelector(".dailyJournal");


applicationElement.addEventListener("change", event => {
	if (event.target.id === "dateSelector") {
		const dateValue = (event.target.value)
		console.log(`User wants to see posts with a date of ${dateValue}`)
		showFilteredDatePosts(dateValue);
	}
})
const showFilteredDatePosts = (dateValue) => {
	const filteredDate = usePostCollection().filter(singlePost => {
		if (singlePost.date === dateValue) {
			return singlePost
		}
	})
	const postMoodElement = document.querySelector(".journalEntryBox");
	postMoodElement.innerHTML = journalList(filteredDate);
}


applicationElement.addEventListener("change", event => {
	if (event.target.id === "moodSelector") {
		const moodValue = (event.target.value)
		console.log(`User wants to see posts with a mood of ${moodValue}`)
		showFilteredMoodPosts(moodValue);
	}
})
const showFilteredMoodPosts = (moodValue) => {
	const filteredMood = usePostCollection().filter(singlePost => {
		if (singlePost.mood === moodValue) {
			return singlePost
		}
	})
	const postMoodElement = document.querySelector(".journalEntryBox");
	postMoodElement.innerHTML = journalList(filteredMood);
}

applicationElement.addEventListener("click", event =>{
	if (event.target.id ==="recordEntry") {
		event.preventDefault();
		const entryDate = document.querySelector("input[name='journalDate']").value
		const entryConcepts = document.querySelector("input[name='conceptsCovered']").value
		const journalPostEntry = document.querySelector("textarea[name='journalEntry']").value
		const entryMood = document.querySelector("select[name='mood']").value
		
		const postObject = {
			date: entryDate,
			concept: entryConcepts,
			entry:journalPostEntry,
			mood:entryMood
		}
		createPost(postObject)
		
	}
})

applicationElement.addEventListener("click",event => {
	if(event.target.id.startsWith("delete")){
		const postId = event.target.id.split("__")[1];
		// debugger
		deletePost(postId)
		.then(response =>{
			showJournalList();
		})
	}
})

const showPostEntry = () =>{
	const entryElement =document.querySelector(".entryForm");
	entryElement.innerHTML =PostEntry();
}
showPostEntry();