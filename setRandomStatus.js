const gql = require("./gql.js");
const { status: statusList } = require("./status.json");

function replaceAll(string, a, b) {
    return string.split(a).join(b);
}

async function setRandomStatus(i = 0) {
    if (i > 5) {
        return `Aborting after 5 tries`;
    }

    let { data: { viewer: userInformation } } = await gql`
        query {
            viewer {
                login
            }
        }
    `;

    let randomIndex = Math.floor(Math.random() * statusList.length);
    let { emoji, message } = statusList[randomIndex];

    if (message.length > 80) {
        return `'${message}' is too long: ${await setRandomStatus(i + 1)}`;
    };

    message = replaceAll(message, "%username", userInformation.login);

    let response = await gql`
        ${{
            status: {
                emoji,
                message,
            }
        }}

        mutation($status: ChangeUserStatusInput!) {
            changeUserStatus(input:$status) {
            status {
                emoji
                message
                }
            }
        }
    `;

    return `Changed the status of ${userInformation.login} to '${emoji} ${message}' (picked from a list of ${statusList.length} options)`;
}

module.exports = setRandomStatus;