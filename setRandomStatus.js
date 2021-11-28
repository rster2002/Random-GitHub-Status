const gql = require("./gql.js");
const { status: statusList } = require("./status.json");

function replaceAll(string, a, b) {
    return string.split(a).join(b);
}

async function setRandomStatus() {
    let { data: { viewer: userInformation } } = await gql`
        query {
            viewer {
                login
            }
        }
    `;

    let randomIndex = Math.floor(Math.random() * statusList.length);
    let { emoji, message } = statusList[randomIndex];

    if (message.length > 80) throw new Error("The message cannot be longer than 80 characters");

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