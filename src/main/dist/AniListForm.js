"use strict";
exports.__esModule = true;
var react_hook_form_1 = require("react-hook-form");
var graphql_generated_1 = require("../graphql/generated/graphql-generated");
var formatLayoutPoster_1 = require("../logic/formatLayoutPoster");
var postTitle_1 = require("../logic/postTitle");
function AniListForm() {
    var _a;
    var _b = graphql_generated_1.useProfileActivitiesLazyQuery(), getAniListStuff = _b[0], _c = _b[1], called = _c.called, loading = _c.loading, data = _c.data, error = _c.error;
    var _d = react_hook_form_1.useForm(), register = _d.register, getValues = _d.getValues, handleSubmit = _d.handleSubmit, errors = _d.errors;
    var sendToJoplin = function (id, title, parentId, body, createdTime, port, accessToken) {
        var toJoplin = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                parent_id: parentId,
                body: body,
                created_time: createdTime,
                user_created_time: createdTime
            })
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
        fetch("http://localhost:" + port + "/notes?token=" + accessToken, toJoplin);
    };
    var onSubmit = function (props) {
        getAniListStuff({
            variables: {
                id: props.anilistUserId,
                page: 1,
                perPage: 30
            }
        });
    };
    if (called && loading) {
        return React.createElement("p", { className: 'loading-content' }, "loading stuff");
    }
    if (called && !data) {
        return React.createElement("div", null, error);
    }
    if (called && error) {
        return React.createElement("div", null, error);
    }
    if (data) {
        handleSubmit(onSubmit);
        var notebookID = getValues('notebookId');
        var joplinPort = getValues('joplinPort');
        var joplinAccessToken = getValues('joplinAccessToken');
        console.log(notebookID, joplinPort, joplinAccessToken);
        var activities = (_a = data.Page) === null || _a === void 0 ? void 0 : _a.activities;
        for (var prop in activities) {
            var i = Number(prop);
            var activity = activities[i];
            sendToJoplin(activity.id, postTitle_1.postTitle(activity.text), notebookID, formatLayoutPoster_1.formatPost(activity), activity.createdAt, joplinPort, joplinAccessToken);
        }
        /* return (
            <TextActivity>
                {data.Page?.activities?.map((x: any) => (
                    <div>{AniListMarkdown(x.text)}</div>
                ))}
            </TextActivity>
        ); */
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            React.createElement("fieldset", { className: 'joplin-stuff' },
                React.createElement("legend", null,
                    React.createElement("span", null, "Joplin Stuff")),
                React.createElement("div", { className: 'field-group' },
                    React.createElement("label", { htmlFor: 'joplin-access-token', className: 'field-label' }, "Joplin access-token"),
                    React.createElement("div", { className: 'field' },
                        React.createElement("input", { name: 'joplinAccessToken', type: 'text', id: 'joplin-access-token', className: 'field-input', placeholder: 'access token', ref: register }),
                        React.createElement("small", { id: 'access-token-help', className: 'field-description' }, "You can find it on a computer under settings > Web Clipper. Make sure to enable the webclipper as well."))),
                React.createElement("div", { className: 'field-group' },
                    React.createElement("label", { htmlFor: 'joplin-port', className: 'field-label' }, "Joplin port:"),
                    React.createElement("div", { className: 'field' },
                        React.createElement("input", { name: 'joplinPort', type: 'text', id: 'joplin-port', defaultValue: 41184, className: 'field-input', ref: register({
                                valueAsNumber: true
                            }) }),
                        React.createElement("small", { id: 'joplin-port-help', className: 'field-description' }, "You'll find this at the top of the same menu you found the access token in. It should be 41184, but if not, you'll have to type in that number in the box above"))),
                React.createElement("div", { className: 'field-group' },
                    React.createElement("label", { htmlFor: 'notebook-id', className: 'field-label' }, "Notebook ID:"),
                    React.createElement("div", { className: 'field' },
                        React.createElement("input", { name: 'notebookId', type: 'text', id: 'notebook-id', className: 'field-input', ref: register }),
                        React.createElement("small", { id: 'joplin-notebook-help', className: 'field-description' }, "For where you want to place it all in Joplin This one is a bit more complicated to figure out, so I'll provide you with a tool to fetch all your notebook IDs easily below")))),
            React.createElement("fieldset", { className: 'anilist-stuff' },
                React.createElement("legend", null,
                    React.createElement("span", null, "AniList Stuff")),
                React.createElement("div", { className: 'field-group' },
                    React.createElement("label", { htmlFor: 'anilist-user-id', className: 'field-label' }, "AniList user ID:"),
                    React.createElement("div", { className: 'field' },
                        React.createElement("input", { name: 'anilistUserId', type: 'text', id: 'anilist-user-id', className: 'field-input', ref: register }),
                        React.createElement("small", { id: 'access-token-help', className: 'field-description' },
                            "You can find this by going to your profile, opening your profile picture in a new tab and looking at the URL (page link). The user ID should be the numbers where I put X's in my example here: user/avatar/large/b",
                            React.createElement("b", null, "XXXXXX"),
                            "-sga2KA4fswV1.png")))),
            React.createElement("fieldset", { className: 'submit-info' },
                React.createElement("legend", { className: 'section-header' },
                    React.createElement("span", { className: 'section-header-title' }, "Submit")),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("input", { name: 'fetchAllPosts', className: 'checkbox', type: 'checkbox', id: 'fetch-all-posts', ref: register }),
                    React.createElement("label", { className: 'field-label' }, "I want to fetch every post (defaults to latest 50 if not)"),
                    React.createElement("small", { id: 'access-token-help', className: 'field-description' }, "It's only recommended to use this if you have never fetched your posts before or if you suspect you've written or recieved more than 50 posts/messages since last time you used this backup. That or if you know you've recieved likes/comments on older posts that you want to backup"),
                    React.createElement("input", { type: 'submit', defaultValue: 'Backup Posts to Joplin', id: 'fetch-posts', className: 'submit-button' }),
                    React.createElement("div", { id: 'completed', className: 'alert-success' }))))));
}
exports["default"] = AniListForm;
