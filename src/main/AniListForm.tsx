import react, { useState } from 'react';

// GraphQL/API
import { useProfileActivitiesLazyQuery } from '../graphql/generated/graphql-generated';
import sendToJoplin from '../logic/sendToJoplin';

// Form Components
import TextInput from '../components/form/TextInput';
import Checkbox from '../components/form/Checkbox';

// Custom Hooks
/* import useInput from '../logic/useInput'; */

// Custom Code
import { formatPost } from '../logic/formatLayoutPoster';
import { postTitle } from '../logic/postTitle';

import '../styles/main/form.scss';

export default function AniListForm(this: any) {
	const [token, setToken] = useState();
	const [port, setPort] = useState('41184');
	const [notebookId, setNoteId] = useState();
	const [userId, setUserId] = useState();
	const [fetchAll, setFetchAll] = useState(false);

	const [page, setPage] = useState(1);

	const [
		getAniListStuff,
		{ called, loading, data, error },
	] = useProfileActivitiesLazyQuery();

	if (called && loading) {
		return <p className='loading-content'>loading stuff</p>;
	}

	if (called && !data) {
		return <div>{error}</div>;
	}

	if (called && error) {
		return <div>{error}</div>;
	}

	if (called && data) {
		const activities: any = data.Page?.activities;

		for (let prop in activities) {
			let i: number = Number(prop);

			const activity = activities[i];

			sendToJoplin(
				activity.id,
				postTitle(activity.text),
				notebookId,
				formatPost(activity),
				activity.createdAt,
				port,
				token
			);
		}
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(token);
		console.log(port);
		console.log(notebookId);
		console.log(userId);
		console.log(fetchAll);

		if (!fetchAll && token && port && notebookId && userId) {
			getAniListStuff({
				variables: {
					id: userId,
					page: 1,
					perPage: 50,
				},
			});
		} else if (fetchAll && token && port && notebookId && userId && page) {
			getAniListStuff({
				variables: {
					id: userId,
					page: page,
					perPage: 50,
				},
			});
			if (data?.Page?.pageInfo?.hasNextPage) {
				setPage(page + 1);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<fieldset className='joplin-stuff'>
					<div className='legend'>
						<legend>
							<span>Joplin Stuff</span>
						</legend>
					</div>
					<div className='fields'>
						<TextInput
							name='joplinAccessToken'
							placeholder='access token'
							label='Joplin access-token'
							small={
								<>
									You can find it on a computer under settings &gt; Web Clipper.
									Make sure to enable the webclipper as well.
								</>
							}
							input={setToken}
						/>

						<TextInput
							name='joplinPort'
							label='Joplin Port'
							small={
								<>
									You'll find this at the top of the same menu you found the
									access token in. It should be 41184, but if not, you'll have
									to type in that number in the box above
								</>
							}
							input={setPort}
						/>

						<TextInput
							name='notebookId'
							label='Notebook ID'
							small={
								<>
									For where you want to place it all in Joplin This one is a bit
									more complicated to figure out, so I'll provide you with a
									tool to fetch all your notebook IDs easily below
								</>
							}
							input={setNoteId}
						/>
					</div>
				</fieldset>
				<fieldset className='anilist-stuff'>
					<div className='legend'>
						<legend>
							<span>AniList Stuff</span>
						</legend>
					</div>
					<div className='fields'>
						<TextInput
							name='anilistUserId'
							label='AniList user ID'
							small={
								<>
									You can find this by going to your profile, opening your
									profile picture in a new tab and looking at the URL (page
									link). The user ID should be the numbers where I put X's in my
									example here: user/avatar/large/b<b>XXXXXX</b>
									-sga2KA4fswV1.png
								</>
							}
							input={setUserId}
						/>
					</div>
				</fieldset>
				<fieldset className='submit-info'>
					<div className='legend'>
						<legend className='section-header'>
							<span className='section-header-title'>Submit</span>
						</legend>
					</div>
					<div className='fields'>
						<div className='form-group'>
							<Checkbox
								name='fetchAllPosts'
								label='I want to fetch every post (defaults to latest 50 if not)'
								small={
									<>
										It's only recommended to use this if you have never fetched
										your posts before or if you suspect you've written or
										recieved more than 50 posts/messages since last time you
										used this backup. That or if you know you've recieved
										likes/comments on older posts that you want to backup
									</>
								}
								input={setFetchAll}
								checked={fetchAll}
							/>
							<input
								name='submit'
								type='submit'
								defaultValue='Backup Posts to Joplin'
								id='fetch-posts'
								className='submit-button'
							/>
							<div id='completed' className='alert-success' />
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
}
