import { AniListMarkdown } from './AniListMarkdown';

export function formatPost(props: any) {
	const formatHeader =
		'<div style="width:98%; background-color:#181A1D;border-bottom:4px solid #2E3138; height:68px;padding:5px;padding-left:8px;margin-bottom:20px;border-radius:2px;"><svg width=".85em" height=".85em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#E85D75" xmlns="http://www.w3.org/2000/svg" style="float:right; margin-right: 20px;margin-top:13px;"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg><p style="float:right; margin-right: 4px; transform: translateY(-2px);font-size:1em;color:#E85D75;"> <b>' +
		props.likeCount +
		'</b></p><img src="' +
		props.user.avatar.large +
		'" style="float:left;margin-right:15px;height:67px;width:auto;"/> <p style="font-size:1.5em;line-height:4px;color:#F2F3F4;margin-top:25px;margin-bottom:9px;"><b>' +
		props.user.name +
		'</b></p><a href="https://anilist.co/activity/' +
		props.id +
		'" style="color:#E5F1FF;font-size:0.9em;">Link</a></div>' +
		'\n\n';

	const content = AniListMarkdown(props.text);

	const beforeComments =
		'\n\n<br><br>\n\n - - - \n\n <p style="font-size:2em;margin-left:5px;"><b>Comments</b></p> \n\n - - - \n\n';

	let comments;

	/* console.log(props.replies);
	console.log(comments); */

	if (props.replies !== undefined && props.replies !== null) {
		const commentsArray = props.replies.map((replies: any) => {
			const commentHeader =
				'<div style="width:98%; background-color:#181A1D;border-bottom:4px solid #2E3138;  height:68px; padding:5px; padding-left:8px; margin-bottom:20px; border-radius:7px;"><svg width=".85em" height=".85em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#E85D75" xmlns="http://www.w3.org/2000/svg" style="float:right; margin-right: 20px;margin-top:13px;"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg><p style="float:right; margin-right: 4px; transform: translateY(-2px);font-size:1em;color:#E85D75;"> <b>' +
				replies.likeCount +
				'</b></p><img src="' +
				replies.user.avatar.large +
				'" style="float:left;margin-right:15px;height:67px;width:67px;object-fit:cover;"/> <p style="font-size:1.5em;line-height:4px;color:#F2F3F4;margin-top:33px;margin-bottom:9px;"><b>' +
				replies.user.name +
				'</b></p></div>' +
				'\n\n';

			const commentContent = AniListMarkdown(replies.text);

			return commentHeader + commentContent + '\n\n <br> \n\n - - - \n\n';
		});
		comments = commentsArray.join();
	}

	if (!comments) {
		comments = '<p align="middle">No Comments</p>';
	}

	return formatHeader + content + beforeComments + comments;
}
