import react from 'react';

import { useForm } from 'react-hook-form';

import { useProfileActivitiesLazyQuery } from '../graphql/generated/graphql-generated';

import { formatPost } from '../logic/formatLayoutPoster';
import { postTitle } from '../logic/postTitle';

import '../styles/main/form.scss';

export default function AniListForm() {
	const [getAniListStuff, { called, loading, data, error }] = useProfileActivitiesLazyQuery();

	const { register, getValues, handleSubmit, errors } = useForm();

	const sendToJoplin = (
		id: any,
		title: any,
		parentId: string,
		body: any,
		createdTime: any,
		port: string,
		accessToken: string
	) => {
		const toJoplin = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				title: title,
				parent_id: parentId,
				body: body,
				created_time: createdTime,
				user_created_time: createdTime,
			}),
		};
		/* console.log(
			JSON.stringify({
				id: id,
				title: title,
				parent_id: parentId,
				body: body,
				created_time: createdTime,
				user_created_time: createdTime,
			})
		); */

		console.log(port, accessToken, parentId);

		fetch(`http://localhost:${port}/notes?token=${accessToken}`, toJoplin);
	};

	const onSubmit = (props: any) => {
		getAniListStuff({
			variables: {
				id: props.anilistUserId,
				page: 1,
				perPage: 30,
			},
		});
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
			var notebookID: string = props.notebookId;
			var joplinPort: string = props.joplinPort;
			var joplinAccessToken: string = props.joplinAccessToken;

			console.log(notebookID, joplinPort, joplinAccessToken);
			console.log(`http://localhost:${joplinPort}/notes?token=${joplinAccessToken}`);
			console.log(data);

			const activities: any = data.Page?.activities;

			for (let prop in activities) {
				let i: number = Number(prop);

				const activity = activities[i];

				sendToJoplin(
					activity.id,
					postTitle(activity.text),
					notebookID,
					formatPost(activity),
					activity.createdAt,
					joplinPort,
					joplinAccessToken
				);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset className='joplin-stuff'>
					<div className='legend'>
						<legend>
							<span>Joplin Stuff</span>
						</legend>
					</div>
					<div className='fields'>
						<div className='field-group'>
							<label htmlFor='joplin-access-token' className='field-label'>
								Joplin access-token
							</label>
							<input
								name='joplinAccessToken'
								type='text'
								id='joplin-access-token'
								className='field-input'
								placeholder='access token'
								ref={register}
							/>
							<small id='access-token-help' className='field-description'>
								You can find it on a computer under settings &gt; Web Clipper. Make sure to enable
								the webclipper as well.
							</small>
						</div>
						<div className='field-group'>
							<label htmlFor='joplin-port' className='field-label'>
								Joplin port
							</label>
							<input
								name='joplinPort'
								type='text'
								id='joplin-port'
								defaultValue={41184}
								className='field-input'
								ref={register({
									valueAsNumber: true,
								})}
							/>
							<small id='joplin-port-help' className='field-description'>
								You'll find this at the top of the same menu you found the access token in. It
								should be 41184, but if not, you'll have to type in that number in the box above
							</small>
						</div>
						<div className='field-group'>
							<label htmlFor='notebook-id' className='field-label'>
								Notebook ID
							</label>
							<input
								name='notebookId'
								type='text'
								id='notebook-id'
								className='field-input'
								ref={register}
							/>
							<small id='joplin-notebook-help' className='field-description'>
								For where you want to place it all in Joplin This one is a bit more complicated to
								figure out, so I'll provide you with a tool to fetch all your notebook IDs easily
								below
							</small>
						</div>
					</div>
				</fieldset>
				<fieldset className='anilist-stuff'>
					<div className='legend'>
						<legend>
							<span>AniList Stuff</span>
						</legend>
					</div>
					<div className='fields'>
						<div className='field-group'>
							<label htmlFor='anilist-user-id' className='field-label'>
								AniList user ID
							</label>
							<input
								name='anilistUserId'
								type='text'
								id='anilist-user-id'
								className='field-input'
								ref={register}
							/>
							<small id='access-token-help' className='field-description'>
								You can find this by going to your profile, opening your profile picture in a new
								tab and looking at the URL (page link). The user ID should be the numbers where I
								put X's in my example here: user/avatar/large/b<b>XXXXXX</b>-sga2KA4fswV1.png
							</small>
						</div>
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
							<input
								name='fetchAllPosts'
								className='checkbox'
								type='checkbox'
								id='fetch-all-posts'
								ref={register}
							/>
							<label className='field-label'>
								I want to fetch every post (defaults to latest 50 if not)
							</label>
							<small id='access-token-help' className='field-description'>
								It's only recommended to use this if you have never fetched your posts before or if
								you suspect you've written or recieved more than 50 posts/messages since last time
								you used this backup. That or if you know you've recieved likes/comments on older
								posts that you want to backup
							</small>
							<input
								name='submit'
								type='submit'
								defaultValue='Backup Posts to Joplin'
								id='fetch-posts'
								className='submit-button'
								ref={register}
							/>
							<div id='completed' className='alert-success' />
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
}
