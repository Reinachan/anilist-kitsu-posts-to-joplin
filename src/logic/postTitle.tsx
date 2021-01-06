export function postTitle(title: string) {
	// RegEx a title for the note
	var postTitle = title.replace(/^#*\s*(~~~\s*)?(.*?)(\s*~~~)?\s*$/m, '$2');

	postTitle = postTitle.replace(/(.{1,75})[^]*/g, '$1');

	return postTitle;
}
