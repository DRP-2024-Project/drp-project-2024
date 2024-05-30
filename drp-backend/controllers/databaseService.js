const { connect, query, disconnect } = require('../../drp-backend/config/database.js')


// createTables: Function that will create the necessary tables for the database
//               community: Holds all communities created
//               members: Holds a list of all members on the app
//               commMembers: Holds all relations of members to community
// Note: communnity and members must be created before commMembers, as commMembers
//       uses them as a foreign key
// Pre: The tables don't already exist
async function createTables() {
    const commTable = `CREATE TABLE communities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        owner VARCHAR(255),
        activity VARCHAR(255),
        location VARCHAR(255),
        description VARCHAR(255),
        image LONGBLOB
    )`;
    const memberTable = `CREATE TABLE members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )`;
    const commMemberTable = `CREATE TABLE commMembers (
        community_id INT,
        member_id INT,
        PRIMARY KEY (community_id, member_id),
        FOREIGN KEY (community_id) REFERENCES communities(id),
        FOREIGN KEY (member_id) REFERENCES members(id)
    )`;

    await connect();
    await query(commTable, []);
    await query(memberTable, []);
    await query(commMemberTable, []);
    disconnect();
}


// dropTables: Drops all the tables that are created in the createTables function
// Note: commMembers must be dropped first, as the others are a foreign key of it
// Pre: The tables exist
async function dropTables() {
    await connect();
    await query('DROP TABLE commMembers', []);
    await query('DROP TABLE members', []);
    await query('DROP TABLE communities', []);
    disconnect();
}

// communityExists: Checks if a community already exists with the given name on
//                  the communities table
// Pre: Function located between connect and disconnect calls
function communityExists(name) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM communities WHERE name = ?`, [name]);
        return resolve(res.length > 0);
    });
}

// createCommunity: Creates a community on the communities table corresponding to
//                  the given data
// Usage: Data supplied is of the form:
// {
//     commName: 'Imperial Rugby',
//     owner: 'Harvey Densem', 
//     activity: 'Rugby',
//     location: 'Harlington',
//     description: 'Rugby Team of Imperial College',
//     image: 
// }
// Return: Returns a Promise that will have the value True if the community is 
//         created successfully and False otherwise
// Note: Only allows for one community of a given name
async function createCommunity(data) {
    const communityData = {
        name: data.commName,
        owner: data.owner,
        activity: data.activity,
        location: data.location,
        description: data.description
        // image: data.image
    }
    await connect();
    return new Promise(async (resolve, reject) => {
        let exists = await communityExists(communityData.name);
        if (exists) {
            disconnect()
            return resolve(false);
        }
        
        let commResult = await query(`INSERT INTO communities SET ?`, communityData);
        let memResult = await query(`SELECT * FROM members WHERE name = ?`, [data.owner]);
        await query(`INSERT INTO commMembers SET ?`, {
            community_id: commResult.insertId,
            member_id: memResult[0].id
        });
        disconnect();

        return resolve(true);
    })
}

// deleteCommunity: Deletes the community given by name from the communities table
// Pre: The community is in the communities table
// Note: The commMembers entries must be removed first as they have the community
//       as a foreign key
async function deleteCommunity(name) {
    await connect();
    let commRes = await query(`SELECT id FROM communities WHERE name = ?`, [name]);
    await query(`DELETE FROM commMembers WHERE community_id = ?`, [commRes[0].id]);
    await query(`DELETE FROM communities WHERE name = ?`, [name]);
    disconnect();
}

// getCommunityDetails: Get the information stored about a community on the 
//                      communities table
// Return: data is returned of the form:
// RowDataPacket {
//     id: 2,
//     name: 'Imperial Rugby',
//     owner: 'Harvey Densem',
//     activity: 'Rugby',
//     location: 'Harlington',
//     description: 'Rugby Team of Imperial College',
//     image: null
// }
function getCommunityDetails(name) {
    return new Promise(async (resolve, reject) => {
        await connect();
        let result = await query(`SELECT * FROM communities WHERE name = ?`, [name]);
        disconnect();
        return resolve(result[0]);
    });
}

// getCommunityMembers: get a list of all names of members of a community
// Return: returns an array of names: ['Harvey Densem', 'John Doe']
function getCommunityMembers(name) {
    return new Promise(async (resolve, reject) => {
        await connect();
        let commResult = await query(`SELECT id FROM communities WHERE name = ?`, [name])
        let memResult = await query(`SELECT member_id FROM commMembers WHERE community_id = ?`, [commResult[0].id]);
        const idList = memResult.map(row => row.member_id);
        let res = await query(`SELECT name FROM members WHERE id IN (?)`, [idList]);
        disconnect();
        return resolve(res.map(row => row.name));
    })
}

// createMember: Adds a new member to the members table
async function createMember(name) {
    await connect();
    await query(`INSERT INTO members SET ?`, {name});
    disconnect();
}

// deleteMember: Deletes a member from the members table and from the 
//               commMembers table
// Pre: The given name exists in the table
async function deleteMember(name) {
    await connect();
    let res = await query(`SELECT id FROM members WHERE name = ?`, [name]);
    await query(`DELETE FROM commMembers WHERE member_id = ?`, [res[0].id]);
    await query(`DELETE FROM members WHERE name = ?`, [name]);
    disconnect();
}

// memberAlreadyInCommunity: Checks if a member given by member_id is already
//                           in the community given by community_id
// Return: Returns a Promise object of True if the member is in the community
//         and False if the member is not in the community
// Pre: Located inbetween connect() and disconnect()
function memberAlreadyInCommunity(member_id, community_id) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM commMembers WHERE member_id = ? AND community_id = ?`, 
            [member_id, community_id]);
        return resolve(res.length > 0);
    });
}

// addMemberToCommunity: Adds an existing member to an existing community
// Return: Returns a Promise object of True if the member added to the 
//         community successfully or False if the given member was already
//         a part of the community
function addMemberToCommunity(commName, memberName) {
    return new Promise(async (resolve, reject) => {
        await connect();
        let commResult = await query(`SELECT id FROM communities WHERE name = ?`, [commName]);
        let memResult = await query(`SELECT id FROM members WHERE name = ?`, [memberName]);
        let memExists = await memberAlreadyInCommunity(memResult[0].id, commResult[0].id);
        
        if (memExists) {
            disconnect();
            return resolve(false);
        }

        await query(`INSERT INTO commMembers SET ?`, {
            member_id: memResult[0].id,
            community_id: commResult[0].id
        });
        disconnect();
        return resolve(true);
    });
}

// deleteMemberFromCommunity: Removes a member from a community
// Pre: The member name is not the owner
//      The given member is a member of the community
async function deleteMemberFromCommunity(commName, memName) {
    await connect();
    let commRes = await query(`SELECT id FROM communities WHERE name = ?`, [commName]);
    let memRes = await query(`SELECT id FROM members WHERE name = ?`, [memName]);
    await query(`DELETE FROM commMembers WHERE member_id = ? AND community_id = ?`, 
        [
            memRes[0].id,
            commRes[0].id
        ]);
    disconnect();
}

// createTables();
// dropTables();
const dataToAdd = { 
    commName: 'Imperial Rugby',
    owner: 'Harvey Densem', 
    activity: 'Rugby',
    location: 'Harlington',
    description: 'Rugby Team of Imperial College',
}
// const dataToAdd = { name: 'Imperial Rugby', description: 'Rugby Team of Impearial College'};
// createCommunity(dataToAdd)
//     .then(res => console.log(res));
// createMember("Harvey Densem");
// getCommunityDetails('Imperial Rugby')
//     .then(result => console.log(result));
// getCommunityMembers('Imperial Rugby')
//     .then(res => console.log(res));
// console.log(getCommunityDetails("Imperial Rugby").length);
createMember("John Doe");
// addMemberToCommunity('Imperial Rugby', 'John Doe')
//     .then(res => console.log(res));
// deleteCommunity('Imperial Rugby');
// deleteMemberFromCommunity('Imperial Rugby', 'John Doe');

// createMember("hello");
// addMemberToCommunity("Imperial Rugby", "hello");
// deleteMember("John Doe");

// Potential TODO:
// Change the Primary Key of community to name

