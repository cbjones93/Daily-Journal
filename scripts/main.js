console.log("Welcome to the main module")
import { journalList } from "../scripts/feed/JournalEntryList.js"
import { PostEntry, PostEdit } from "../scripts/feed/PostEntry.js"
import { createPost, getLoggedInUser, setLoggedInUser, getJournalEntries, usePostCollection, deletePost, getSinglePost, updatePost, logoutUser, registerUser, loginUser, filteredUserPost } from "../scripts/Data/DataManager.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
// import { EntryListComponent } from "./JournalEntryList.js"
// EntryListComponent();

const showFilteredUserPost = () => {
	const journalElement = document.querySelector(".journalEntryBox");
	filteredUserPost().then((allJournal) => {
		journalElement.innerHTML = journalList(allJournal.reverse());
	})
}
// const showFilteredUserPost = () =>{
// 	const journalElement = document.querySelector(".journalEntryBox");
// 	filteredUserPost().then((allJournal) => {
// 		journalElement.innerHTML = journalList(allJournal.reverse());
// 	})
// }

const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}
const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		showPostEntry();
		showFilteredUserPost();
	} else {
		showLoginRegister();
	}
}
const showLoginRegister = () => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	const postElement = document.querySelector(".entryContainer");
	postElement.innerHTML = "";
}

const showPostEntry = () => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}

checkForUser();
// ------------EVENT LISTENERS-------------///
const navElement = document.querySelector(".nav");
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

applicationElement.addEventListener("click", event => {
	if (event.target.id === "recordEntry") {
		event.preventDefault();
		const entryDate = document.querySelector("input[name='journalDate']").value
		const entryConcepts = document.querySelector("input[name='conceptsCovered']").value
		const journalPostEntry = document.querySelector("textarea[name='journalEntry']").value
		const entryMood = document.querySelector("select[name='mood']").value

		const postObject = {
			date: entryDate,
			concept: entryConcepts,
			entry: journalPostEntry,
			mood: entryMood,
			userId: getLoggedInUser().id,
		}
		createPost(postObject)
		.then(response => {
			showFilteredUserPost();
			showPostEntry();
		})

	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		// debugger
		deletePost(postId)
			.then(response => {
				showFilteredUserPost();
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("__")[1];
		getSinglePost(postId)
			.then(response => {
				showEdit(response);
			})
	}
})
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const entryDate = document.querySelector("input[name='journalDate']").value
		const entryConcepts = document.querySelector("input[name='conceptsCovered']").value
		const journalPostEntry = document.querySelector("textarea[name='journalEntry']").value
		const entryMood = document.querySelector("select[name='mood']").value

		const postObject = {
			date: entryDate,
			concept: entryConcepts,
			entry: journalPostEntry,
			mood: entryMood,
			id: parseInt(postId),
			userId: getLoggedInUser().id,
		}

		updatePost(postObject)
			.then(response => {
				showFilteredUserPost();
				showPostEntry();
			})
	}
})
navElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		console.log(getLoggedInUser());
		sessionStorage.clear();
		const journalElement = document.querySelector(".journalEntryBox");
		journalElement.innerHTML = ""
		checkForUser();
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		const userObj = {
			name: document.querySelector("input[name ='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		// debugger
		loginUser(userObj)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					showPostEntry();
					showFilteredUserPost();
				} else {
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class= "center">That user does not exist. Please try again or register for your free account. </p>`
				}
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				showPostEntry();
				showFilteredUserPost();
			})
	}
})