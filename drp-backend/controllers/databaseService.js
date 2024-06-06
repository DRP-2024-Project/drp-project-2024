const { connect, query, disconnect } = require('../config/database.js');

const DATA = [
    { communityId: '1', title: 'Morning Jogging Club', description: 'Group jogs in the local park', price: "£0", perTime: "week", location: 'Greenwood Park', schedule: 'Mon, Wed, Fri at 6 AM', contactInfo: 'joggingclub@example.com', requiredEquipment: 'Running shoes'},
    { communityId: '2', title: 'Weekend Warriors Basketball', description: 'Weekend basketball games for casual players', price: "£3", perTime: "session", location: 'Downtown Sports Center', schedule: 'Every Saturday at 10 AM', contactInfo: 'weekendhoops@example.com', requiredEquipment: 'Basketball shoes, sports attire'},
    { communityId: '3', title: 'Yoga Retreats', description: 'Peaceful yoga sessions to rejuvenate your mind and body', price: "£20", perTime: "month", location: 'Lotus Yoga Studio', schedule: 'Tue and Thu at 7 PM', contactInfo: 'lotusyoga@example.com', requiredEquipment: 'Yoga mat, towel'},
    { communityId: '4', title: 'Elite Tennis Club', description: 'Competitive tennis sessions for advanced players', price: "£15", perTime: "month", location: 'Riverside Tennis Courts', schedule: 'Weekends at 3 PM', contactInfo: 'elite.tennis@example.com', requiredEquipment: 'Tennis racket, tennis balls'},
    { communityId: '5', title: 'Mountain Biking Adventures', description: 'Challenging mountain biking trails for thrill-seekers', price: "£10", perTime: "month", location: 'Highland Trails', schedule: 'Every Sunday at 9 AM', contactInfo: 'mtbadventure@example.com', requiredEquipment: 'Mountain bike, helmet, gloves'},
    { communityId: '6', title: 'Senior Water Aerobics', description: 'Low-impact water exercises ideal for seniors', price: "£8", perTime: "month", location: 'Community Pool', schedule: 'Mon, Wed, Fri at 10 AM', contactInfo: 'senioraqua@example.com', requiredEquipment: 'Swimsuit, water shoes'},
    { communityId: '7', title: 'Dynamic Pilates', description: 'Dynamic Pilates classes to strengthen and tone your body', price: "£18", perTime: "month", location: 'Pilates Power Gym', schedule: 'Tue and Thu at 5 PM', contactInfo: 'dynamicpilates@example.com', requiredEquipment: 'Pilates mat, comfortable clothing'},
    { communityId: '8', title: 'Kids Soccer Camp', description: 'Fun and educational soccer training for kids', price: "£12", perTime: "month", location: 'City Sports Complex', schedule: 'Saturday mornings', contactInfo: 'kidssoccer@example.com', requiredEquipment: 'Soccer ball, shin guards'},
    { communityId: '9', title: 'Outdoor Fitness Bootcamp', description: 'High-intensity fitness classes in the great outdoors', price: "£25", perTime: "month", location: 'Central Park', schedule: 'Every Tuesday at 6 AM', contactInfo: 'bootcamp@example.com', requiredEquipment: 'Gym attire, water bottle'},
    { communityId: '10', title: 'Rock Climbing Sessions', description: 'Indoor and outdoor rock climbing for all skill levels', price: "£30", perTime: "month", location: 'ClimbOn Gym', schedule: 'Weekday evenings', contactInfo: 'climbon@example.com', requiredEquipment: 'Climbing shoes, harness'},
    { communityId: '11', title: 'Amateur Boxing Club', description: 'Boxing training and sparring sessions', price: "£15", perTime: "month", location: 'Downtown Boxing Gym', schedule: 'Mon, Wed, and Fri at 7 PM', contactInfo: 'amateurboxing@example.com', requiredEquipment: 'Boxing gloves, mouthguard'},
    { communityId: '12', title: 'Triathlon Preparation Group', description: 'Training sessions covering swimming, cycling, and running', price: "£35", perTime: "month", location: 'City Sports Club', schedule: 'Weekends at 8 AM', contactInfo: 'triathlonprep@example.com', requiredEquipment: 'Swim gear, bicycle, running shoes'},
    { communityId: '13', title: 'Beach Volleyball League', description: 'Competitive and fun beach volleyball games', price: "£5", perTime: "game", location: 'Sandy Beach Courts', schedule: 'Thursdays at 5 PM', contactInfo: 'beachvolley@example.com', requiredEquipment: 'Volleyball, sunglasses'},
    { communityId: '14', title: 'Hiking and Nature Walks', description: 'Guided hikes through scenic trails and nature reserves', price: "Free", perTime: "event", location: 'Trailhead Park', schedule: 'First Saturday of each month', contactInfo: 'hikingclub@example.com', requiredEquipment: 'Hiking boots, backpack'},
    { communityId: '15', title: 'CrossFit Challenges', description: 'CrossFit workouts designed to test your limits', price: "£20", perTime: "month", location: 'CrossFit Box', schedule: 'Mon, Wed, Fri at 6 AM', contactInfo: 'crossfitchallenge@example.com', requiredEquipment: 'Workout clothes, water bottle'},
    { communityId: '16', title: 'Dance Fitness Fiesta', description: 'Dance your way to fitness with high-energy classes', price: "£12", perTime: "month", location: 'Downtown Dance Studio', schedule: 'Tuesday and Thursday evenings', contactInfo: 'dancefiesta@example.com', requiredEquipment: 'Comfortable dance shoes, attire'},
    { communityId: '17', title: 'Martial Arts Dojo', description: 'Traditional and modern martial arts training', price: "£25", perTime: "month", location: 'Warrior Dojo', schedule: 'Mon, Wed, Sat mornings', contactInfo: 'martialartsdojo@example.com', requiredEquipment: 'Gi or comfortable clothing'},
    { communityId: '18', title: 'Golf Clinics', description: 'Golf lessons for beginners and intermediate players', price: "£30", perTime: "session", location: 'Riverside Golf Course', schedule: 'Weekend mornings', contactInfo: 'golfclinic@example.com', requiredEquipment: 'Golf clubs, golf balls'},
    { communityId: '19', title: 'Roller Skating Nights', description: 'Family-friendly roller skating evenings', price: "£8", perTime: "night", location: 'City Skating Rink', schedule: 'Friday nights', contactInfo: 'rollerskating@example.com', requiredEquipment: 'Roller skates, safety pads'},
    { communityId: '20', title: 'SUP Yoga', description: 'Yoga on a stand-up paddleboard at the lake', price: "£18", perTime: "class", location: 'Lake Serene', schedule: 'Sunday mornings', contactInfo: 'supyoga@example.com', requiredEquipment: 'Yoga mat, paddleboard (rentals available)'}
  ];


// createTables: Function that will create the necessary tables for the database
//               community: Holds all communities created
//               members: Holds a list of all members on the app
//               commMembers: Holds all relations of members to community
//               images: Holds all images for the app
//               commImages: Holds the relations of immages and communities
//               tags: Holds the tags and icons for the different community
// Note: communnity and members must be created before commMembers, as commMembers
//       uses them as a foreign key. Same applies for images and community.
// Pre: The tables don't already exist
async function createTables() {
    const tagsTable = `CREATE TABLE tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tag VARCHAR(255),
        icon LONGBLOB
    )`
    const commTable = `CREATE TABLE communities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255),
        price VARCHAR(255),
        perTime VARCHAR(255),
        location VARCHAR(255),
        schedule VARCHAR(255),
        contactInfo VARCHAR(255),
        requiredEquipment VARCHAR(255),
        tag_id INT,
        owner VARCHAR(255),
        FOREIGN KEY (tag) REFERENCES tags(id)
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
    const imagesTable = `CREATE TABLE images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        community_id INT,
        img LONGBLOB,
        FOREIGN KEY (community_id) REFERENCES communities(id)
    )`
    await query(tagsTable, []);
    await query(commTable, []);
    await query(memberTable, []);
    await query(commMemberTable, []);
    await query(imagesTable, []);
}


// dropTables: Drops all the tables that are created in the createTables function
// Note: commMembers must be dropped first, as the others are a foreign key of it
// Pre: The tables exist
async function dropTables() {
    await query('DROP TABLE commMembers', []);
    await query('DROP TABLE images', []);
    await query('DROP TABLE members', []);
    await query('DROP TABLE communities', []);
    await query('DROP TABLE tags', []);
}

// communityExists: Checks if a community already exists with the given name on
//                  the communities table
// Pre: Function located between connect and disconnect calls
function communityExists(name) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM communities WHERE title = ?`, [name]);
        return resolve(res.length > 0);
    });
}

// createCommunity: Creates a community on the communities table corresponding to
//                  the given data
// Usage: Data supplied is of the form:
// {
//     title: 'Morning Jogging Club', 
//     description: 'Group jogs in the local park',
//     price: "£0", 
//     perTime: "week", 
//     location: 'Greenwood Park', 
//     schedule: 'Mon, Wed, Fri at 6 AM', 
//     contactInfo: 'joggingclub@example.com', 
//     requiredEquipment: 'Running shoes'
// }
// Return: Returns a Promise that will have the value True if the community is 
//         created successfully and False otherwise
// Note: Only allows for one community of a given name
async function createCommunity(data) {
    const communityData = {
        title: data.title, 
        description: data.description,
        price: data.price, 
        perTime: data.perTime, 
        location: data.location, 
        schedule: data.schedule, 
        contactInfo: data.schedule, 
        requiredEquipment: data.requiredEquipment,
        owner: 'Harvey Densem'
    }
    return new Promise(async (resolve, reject) => {
        let exists = await communityExists(data.title);
        if (exists) {
            return resolve(false);
        }
        
        let commResult = await query(`INSERT INTO communities SET ?`, communityData);
        let memResult = await query(`SELECT * FROM members WHERE name = ?`, [communityData.owner]);
        await query(`INSERT INTO commMembers SET ?`, {
            community_id: commResult.insertId,
            member_id: memResult[0].id
        });

        return resolve(true);
    })
}

// deleteCommunity: Deletes the community given by name from the communities table
// Pre: The community is in the communities table
// Note: The commMembers entries must be removed first as they have the community
//       as a foreign key
async function deleteCommunity(title) {
    let commRes = await query(`SELECT id FROM communities WHERE title = ?`, [title]);
    await query(`DELETE FROM commMembers WHERE community_id = ?`, [commRes[0].id]);
    await query(`DELETE FROM communities WHERE title = ?`, [title]);
}

// getCommunityDetails: Get the information stored about a community on the 
//                      communities table
// Return: data is returned of the form:
// { 
//     communityId: '1', 
//     title: 'Morning Jogging Club', 
//     description: 'Group jogs in the local park', 
//     price: "£0", perTime: "week", 
//     location: 'Greenwood Park', 
//     schedule: 'Mon, Wed, Fri at 6 AM', 
//     contactInfo: 'joggingclub@example.com', 
//     requiredEquipment: 'Running shoes'
// }
function getCommunityDetails(title) {
    return new Promise(async (resolve, reject) => {
        let result = await query(`SELECT * FROM communities WHERE title = ?`, [title]);
        return resolve(result[0]);
    });
}

// getAllCommunities: Returns a list of all details of all communities in the
//                    communities database
function getAllCommunities() {
    return new Promise(async (resolve, reject) => {
        let result = await query(`SELECT * FROM communities`);
        return resolve(translateResult(result));
    })
}


function getSearchOrderedBy(search, col) {
    const orderCols = ['title', 'rating'];
    const ascDesc = ['ASC', 'DESC'];

    if (!orderCols.includes(col)) {
        throw new Error("Invalid column name");
    }

    // Construct the SQL query with DISTINCT UNION
    let sqlQuery = `
        SELECT DISTINCT * FROM (
            SELECT * FROM communities WHERE title LIKE ?
            UNION
            SELECT * FROM communities WHERE description LIKE ?
        ) AS unioned_communities
        ORDER BY ${col} ${ascDesc[orderCols.indexOf(col)]}
    `;

    return new Promise(async (resolve, reject) => {
        try {
            // Execute the main query
            let result = await query(sqlQuery, [`%${search}%`, `%${search}%`]);
            
            // Fetch and attach tags
            await Promise.all(result.map(async (row) => {
                let tag = await query(`SELECT tag FROM tags WHERE id = ?`, [row.tag_id]);
                row.tag = tag[0].tag;
            }));

            // Resolve with the translated result
            resolve(translateResult(result));
        } catch (error) {
            // Handle errors
            reject(error);
        }
    });
}



// getCommunityMembers: get a list of all names of members of a community
// Return: returns an array of names: ['Harvey Densem', 'John Doe']
function getCommunityMembers(title) {
    return new Promise(async (resolve, reject) => {
        let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [title])
        let memResult = await query(`SELECT member_id FROM commMembers WHERE community_id = ?`, [commResult[0].id]);
        const idList = memResult.map(row => row.member_id);
        let res = await query(`SELECT name FROM members WHERE id IN (?)`, [idList]);
        return resolve(res.map(row => row.name));
    })
}

// createMember: Adds a new member to the members table
async function createMember(name, username) {
    await query(`INSERT INTO members SET name = ?, username = ?`, [name, username]);
}

// deleteMember: Deletes a member from the members table and from the 
//               commMembers table
// Pre: The given name exists in the table
async function deleteMember(name) {
    let res = await query(`SELECT id FROM members WHERE name = ?`, [name]);
    await query(`DELETE FROM commMembers WHERE member_id = ?`, [res[0].id]);
    await query(`DELETE FROM members WHERE name = ?`, [name]);
}

// memberExists: Checks if a member given by username exists in the database
// Return: Returns a Promise object of True if the member exists
//         and False if the member does not exist
function memberExists(username) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM members WHERE username = ?`, 
            [username]);
        return resolve(res.length > 0);
    });
}


// memberAlreadyInCommunity: Checks if a member given by member_id is already
//                           in the community given by community_id
// Return: Returns a Promise object of True if the member is in the community
//         and False if the member is not in the community
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
        let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
        let memResult = await query(`SELECT id FROM members WHERE name = ?`, [memberName]);
        let memExists = await memberAlreadyInCommunity(memResult[0].id, commResult[0].id);
        
        if (memExists) {
            return resolve(false);
        }

        await query(`INSERT INTO commMembers SET ?`, {
            member_id: memResult[0].id,
            community_id: commResult[0].id
        });
        return resolve(true);
    });
}

// getTagDetails: Returns the name and icon of a tag
function getTagDetails(tag_id) {
    return new Promise(async (resolve, reject) => {
        let tagResult = await query(`SELECT * FROM tags WHERE id = ?`, tag_id);
        return resolve({
            id: tagResult[0].id,
            tag: tagResult[0].tag,
            icon: tagResult[0].icon
        });
    });
}

// createTag: Creates a tag for the tags table
// Returns: returns a promise object with value false if the tag already
//          exists or true if the tag has been created successfully
function createTag(data) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM tags WHERE tag = ?`, data.tag);
        if (res.length > 0) {
            return resolve(false);
        }
        await query(`INSERT INTO tags SET ?`, data);
        return resolve(true);
    })
}

// deleteMemberFromCommunity: Removes a member from a community
// Pre: The member name is not the owner
//      The given member is a member of the community
async function deleteMemberFromCommunity(commName, memName) {
    let commRes = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
    let memRes = await query(`SELECT id FROM members WHERE name = ?`, [memName]);
    await query(`DELETE FROM commMembers WHERE member_id = ? AND community_id = ?`, 
        [
            memRes[0].id,
            commRes[0].id
        ]);
}

// translateResult: Translates data from the RowDataPacket object notation
//                  to the format used by the frontend
function translateResult(data) {
    return data.map(row => ({
       communityId: row.id.toString(),
       title: row.title,
       description: row.description,
       price: row.price,
       perTime: row.perTime,
       location: row.location,
       schedule: row.schedule,
       contactInfo: row.contactInfo,
       requiredEquipment: row.requiredEquipment,
       links: row.links,
       rating: row.rating,
       level: row.level,
       tag_id: row.tag_id,
       tag: row.tag,
    }));
}

// addCommunityImage: Adds an image to the images table, and assigns the corresponding
//                    community id
// Params:
//   img: The binary format of an image
async function addCommunityImage(commName, img) {
    let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
    await query(`INSERT INTO images SET ?`, {
        community_id: commResult[0].id,
        img: img
    });
}

// deleteImage: deletes the image with id of image_id from the database
async function deleteImage(image_id) {
    await query(`DELETE FROM images WHERE id = ?`, [image_id]);
}

// getAllImages: Fetches all images associated with a specific community
// Return: returns a list of the binary format of all images belonging to a 
//         community
function getCommunityImages(commName) {
    return new Promise(async (resolve, reject) => {
        let communityID = (await query(`SELECT id from communities WHERE title = ?`, [commName]))[0].id;
        let result = await query(`SELECT * FROM images WHERE community_id = ?`, [communityID]);
        return resolve(result.map(row => row.img));
    })
}


// createTables();
// dropTables();
const dataToAdd = {
    title: 'Rugby Team', 
    description: 'Group jogs in the local park', 
    price: "£0", perTime: "week", 
    location: 'Greenwood Park', 
    schedule: 'Mon, Wed, Fri at 6 AM', 
    contactInfo: 'joggingclub@example.com', 
    requiredEquipment: 'Running shoes'
};
// const dataToAdd = { name: 'Imperial Rugby', description: 'Rugby Team of Impearial College'};
// connect()
//     .then(() => {
//         createCommunity(dataToAdd)
//             .then(res => {
//                 console.log(res);
//                 disconnect();
//             })
//     });
// createMember("Harvey Densem");
// getCommunityDetails('Imperial Rugby')
//     .then(result => console.log(result));
// getCommunityMembers('Imperial Rugby')
//     .then(res => console.log(res));
// console.log(getCommunityDetails("Imperial Rugby").length);
// createMember("John Doe");
// addMemberToCommunity('Imperial Rugby', 'John Doe')
//     .then(res => console.log(res));
// deleteCommunity('Imperial Rugby');
// deleteMemberFromCommunity('Imperial Rugby', 'John Doe');

// createMember("hello");
// addMemberToCommunity("Imperial Rugby", "hello");
// deleteMember("John Doe");

// Potential TODO:
// Change the Primary Key of community to name

// connect()
//     .then(() => {
//         createTables()
//             .then(disconnect());
//     });

async function exImageAdd() {
    const fs = require('fs').promises;

    const binaryData = await fs.readFile("../../images1/icon14.png");

    await connect();
    await createTag({
        'tag': 'Gym',
        'icon': binaryData
    })
    disconnect();
}

async function exImageStore() {
    const fs = require('fs').promises;

    await connect();

    const imgs = await getCommunityImages("Rugby Team");
    disconnect();
    
    await fs.writeFile("../../images2/City.jpg", imgs[0]);
}

module.exports = {
    getAllCommunities,
    getCommunityImages,
    getSearchOrderedBy,
    getTagDetails,
    getCommunityMembers,
    createMember,
    memberExists
}

