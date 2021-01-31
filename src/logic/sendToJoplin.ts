import convertId from './convertId';

const sendToJoplin = (
	id: number,
	title: string,
	parentId: string | undefined,
	body: string,
	createdTime: string,
	port: string,
	accessToken: string | undefined
) => {
	const formatedId: string = convertId(id);

	const toJoplin = {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: formatedId,
			title: title,
			parent_id: parentId,
			body: body,
			/* created_time: createdTime,
      user_created_time: createdTime, */
		}),
	};

	/* console.log(
    JSON.stringify({
      id: convertId(id),
      title: title,
      parent_id: parentId,
      body: body,
      created_time: createdTime,
      user_created_time: createdTime,
    })
  ); */

	fetch(`http://localhost:${port}/notes/${formatedId}?token=${accessToken}`, {
		method: 'GET',
	}).then((res) => {
		if (res.ok && res.status === 200) {
			fetch(
				`http://localhost:${port}/notes/${formatedId}?token=${accessToken}`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: formatedId,
						body: body,
					}),
				}
			).then((res) => {
				console.log('Your note was updated! response:', res);
			});
		} else {
			fetch(
				`http://localhost:${port}/notes?token=${accessToken}`,
				toJoplin
			).then((res) => {
				if (res.ok) {
					console.log('Request complete! response:', res);
				}
			});
		}
	});
};

export default sendToJoplin;
