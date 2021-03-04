/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
         <h3>Date:${entry.date}</h3>
        
         <li>concepts:${entry.concept}
         </li>
         <li>Entry:${entry.entry}
         </li>
         <li>Mood:${entry.mood}
         </li>
        </section>
    `
}