export function AniListMarkdown(props: string) {
	let content = props;
	// replace img####(link)
	content = content.replace(/img(\d{1,4})\((.{1,500}.{1,5})\)/g, '<img src="$2" width="$1"/>');
	// replace img(link)
	content = content.replace(/img\((.{1,500}.{1,5})\)/g, '![]($1)');
	// replace ~! content !~ spoilers
	content = content.replace(
		/~!([\s\S]{1,}?)!~/g,
		'<details><summary>Spoiler</summary>$1</details>'
	);
	// replace ~~~ content ~~~ center
	content = content.replace(/(~~~)([\s\S]{1,}?)(~~~)/g, '<center>$2</center>');

	return content;
}
