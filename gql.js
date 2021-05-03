const fetch = require("node-fetch");

const endpoint = "https://api.github.com/graphql";

const authToken = process.env.GITHUB_USER_TOKEN;

async function graphQLQuery(query, variables = {}) {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": `bearer ${authToken}`
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })
        .then(r => r.json());
}

async function gql(queryParts, variables = {}) {
    let query = queryParts.join("");
    return await graphQLQuery(query, variables);
}

module.exports = gql;