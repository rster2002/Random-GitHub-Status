const gql = require("./gql.js");

async function main() {
    let response = await gql`
        query {
            repository(name:"rster2002.github.io", owner:"rster2002") {
                isEmpty
            }
        }
    `;

    console.log(response);
}

main();