export const PostEntry = (postObject) => {
    return `
    <form action="">
<fieldset class=journalContainer>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate">
            </fieldset>
            <fieldset>
                <label for="conceptsCovered">Concepts Covered</label>
                <input id="conceptsCovered" type="text" name="conceptsCovered">
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea type="text" name="journalEntry" id="journalEntry"></textarea>
            </fieldset>
            <fieldset>
                <label for="mood">Mood for the day</label>
                <select name="mood" id="mood">
                    <option value="">Choose an option</option>
                    <option value="Awesome">Awesome!</option>
                    <option value="Good">Good</option>
                    <option value="Okay">Okay</option>
                    <option value="Bad">Bad</option>
                    <option value="Terrible">Terrible</option>
                </select>
            </fieldset>
            <fieldset>
                <input id="recordEntry" type="submit" value="Record Journal Entry">
            </fieldset>
        </form>`
}