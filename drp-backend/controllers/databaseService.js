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
//     requiredEquipment: 'Running shoes',
//     tag_id: 5,
//     links: 
//     equipmentRequired: 
//     ownerUser: hd922
// }
// Return: Returns a Promise that will have the value True if the community is 
//         created successfully and False otherwise
// Note: Only allows for one community of a given name
async function createCommunity(data) {
    const name = await getMemberName(data.ownerUser);
    const communityData = {
        title: data.title, 
        description: data.description,
        price: data.price, 
        perTime: data.perTime, 
        location: data.location, 
        schedule: data.schedule, 
        scheduled: data.scheduled,
        contactInfo: data.schedule, 
        requiredEquipment: data.equipmentRequired,
        owner: name,
        tag_id: data.tag_id,
        links: data.links,
        rating: data.rating,
        level: data.level,
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

// createEvent: Inserts a new event into the database corresponding to the given data.
// data is supplied in the form
// {
//     date: '30 June',
//     time: '4 PM',
//     user: 'tvt22',
//     comm: 'Tennis with Toan',
//     desc: 'Casual tennis, no fixed events'
// }
// Return: Returns a Promise that will have the value True if the event is 
//         created successfully and False otherwise

async function createEvent(data) {
    const creator = await getMemberId(data.user);
    const community = await getCommunityId(data.comm);
    const eventData = {
        date: data.date,
        time: data.time,
        timestamp: Date.now().toString(),
        creator_id: creator,
        community_id: community,
        description: data.desc
    }

    const attendanceData = {
        event_id: 0,
        member_id: eventData.creator_id,
        attending: true
    }
    
    return new Promise(async (resolve, reject) => {
        try {
            let result = await query(`INSERT INTO events SET ?`, eventData);
            attendanceData.event_id = result.insertId;
            await query(`INSERT INTO eventAttendance SET ?`, attendanceData);
        } catch (error) {
            return resolve(false);
        }
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

// getCommunityId: Gets the id of a community given the title
function getCommunityId(title) {
    return new Promise(async (resolve, reject) => {
        let result = await query(`SELECT id FROM communities WHERE title = ?`, [title]);
        return resolve(result[0].id);
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

    let communitiesQuery = `
    SELECT DISTINCT * FROM (
        SELECT * FROM communities WHERE title LIKE ?
        UNION
        SELECT * FROM communities WHERE description LIKE ?
    ) AS unioned_communities`;
    
    let proposalsQuery = `
        SELECT id, title, description, tag_id, 0 AS rating, 'proposal' AS type 
        FROM proposals 
        WHERE title LIKE ?
    `;

    return new Promise(async (resolve, reject) => {
        try {
            // Execute the queries
            let communitiesResult = await query(communitiesQuery, [`%${search}%`, `%${search}%`]);
            let proposalsResult = await query(proposalsQuery, [`%${search}%`]);

            // Combine results
            let combinedResult = [
                ...communitiesResult.map(row => ({ data: row, type: "community" })),
                ...proposalsResult.map(row => ({ data: row, type: "proposal" }))
            ];

            // Fetch and attach tags
            await Promise.all(combinedResult.map(async (row) => {
                let tag = await query(`SELECT tag FROM tags WHERE id = ?`, [row.data.tag_id]);
                row.data.tag = tag[0].tag;
            }));

            // Sort combined results based on the specified column and direction
            combinedResult.sort((a, b) => {
                if (col === 'rating') {
                    return ascDesc[orderCols.indexOf(col)] === 'ASC' ? a.data.rating - b.data.rating : b.data.rating - a.data.rating;
                } else {
                    return ascDesc[orderCols.indexOf(col)] === 'ASC'
                        ? a.data.title.localeCompare(b.data.title)
                        : b.data.title.localeCompare(a.data.title);
                }
            });

            // Resolve with the sorted result
            resolve(combinedResult);
        } catch (error) {
            // Handle errors
            reject(error);
        }
    });
}





// getCommunityMembers: get a list of all names of members of a community
// Return: returns an array of names and an array of usernames.
function getCommunityMembers(title) {
    return new Promise(async (resolve, reject) => {
        let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [title])
        let memResult = await query(`SELECT member_id FROM commMembers WHERE community_id = ?`, [commResult[0].id]);
        const idList = memResult.map(row => row.member_id);
        let res = await query(`SELECT name, username FROM members WHERE id IN (?)`, [idList]);
        return resolve([res.map(row => row.name), res.map(row => row.username)]);
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


// memberAlreadyInCommunity: Checks if a member given by username is already
//                           in the community given by commName
// Return: Returns a Promise object of True if the member is in the community
//         and False if the member is not in the community
function memberAlreadyInCommunity(username, commName) {
    return new Promise(async (resolve, reject) => {
        let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
        let memResult = await query(`SELECT id FROM members WHERE username = ?`, [username]);

        let res = await query(`SELECT * FROM commMembers WHERE member_id = ? AND community_id = ?`, 
            [memResult[0].id, commResult[0].id]);
        return resolve(res.length > 0);
    });
}

// addMemberToCommunity: Adds an existing member to an existing community
// Return: Returns a Promise object of True if the member added to the 
//         community successfully or False if the given member was already
//         a part of the community
function addMemberToCommunity(commName, username) {
    return new Promise(async (resolve, reject) => {
        let commResult = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
        let memResult = await query(`SELECT id FROM members WHERE username = ?`, [username]);
        let memExists = await memberAlreadyInCommunity(username, commName);
        
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

// getMemberName: Gets the name of a member given their username
// Pre: The user exists
function getMemberName(user) {
    return new Promise(async (resolve, reject) => {
        let memResult = await query(`SELECT name FROM members WHERE username=?`, [user]);
        return resolve(memResult[0].name);
    });
}

// getMemberId: Gets the id of a member given their username
// Pre: The user exists
function getMemberId(user) {
    return new Promise(async (resolve, reject) => {
        let memResult = await query(`SELECT id FROM members WHERE username=?`, [user]);
        return resolve(memResult[0].id);
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

// translateTags: Puts the result of a query into a standard form
function translateTags(data) {
    return data.map(row => ({
        id: row.id,
        name: row.tag,
        icon: row.icon,
     }));
}

// getAllTags: get all tag ids and names in the tags table
// Returns: A list of objects of the form {
//   id: ,
//   name: ,
// }
function getAllTags() {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM tags`);
        return resolve(translateTags(res));
    })
}

// deleteMemberFromCommunity: Removes a member from a community
// Pre: The member name is not the owner
//      The given member is a member of the community
async function deleteMemberFromCommunity(commName, username) {
    let commRes = await query(`SELECT id FROM communities WHERE title = ?`, [commName]);
    let memRes = await query(`SELECT id FROM members WHERE username = ?`, [username]);
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
       latitude: row.latitude,
       longitude: row.longitude
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

async function translateEvents(events) {
    for (const event of events) {
        let name = await query(`SELECT name FROM members WHERE id = ?`, [event.creator_id]);
        event.creator_name = name[0].name;
    }
}

function getAllEvents(commId) {
    return new Promise(async (resolve, reject) => {
        let result = await query(`SELECT * FROM events WHERE community_id = ?`, [commId]);
        await translateEvents(result);
        return resolve(result);
    })
}

async function translateAttendanceList(lst) {
    if (lst.length == 0) {
        return [];
    }
    const idList = lst.map(row => row.member_id);
    let res = await query(`SELECT name, username FROM members WHERE id IN (?)`, [idList]);
    return res;
}

function getAttending(eventId) {
    return new Promise(async (resolve, reject) => {
        let attending = await query(`SELECT * FROM eventAttendance 
            WHERE event_id = ? AND attending = TRUE`, [eventId]);
        let notAttending = await query(`SELECT * FROM eventAttendance
            WHERE event_id = ? AND attending = FALSE`, [eventId]);
        let data = {
            attending: await translateAttendanceList(attending),
            notAttending: await translateAttendanceList(notAttending),
        };
        return resolve(data);
    })
}

async function setAttendance(eventId, user, attend) {
    let memberId = (await query(`SELECT id FROM members WHERE username = ?`, [user]))[0].id;
    let res = await query(`UPDATE eventAttendance SET attending = ?
                           WHERE event_id = ? AND
                                 member_id = ?`, [attend, eventId, memberId]);
    if (res.affectedRows == 0) {
        await query(`INSERT INTO eventAttendance SET ?`, {
            event_id: eventId,
            member_id: memberId,
            attending: attend,
        });
    };
}

async function removeAttendance(eventId, username) {
    let memberId = (await query(`SELECT id FROM members WHERE username = ?`, [username]))[0].id;
    await query(
        `DELETE FROM eventAttendance WHERE event_id = ? AND member_id = ?`,
        [eventId, memberId]
    );
};

function rateCommunity(communityName, userName, rating) {
    return new Promise(async (resolve, reject) => {
        let communityID = (await query(`SELECT id from communities WHERE title = ?`, [communityName]))[0].id;
        let userID = (await query(`SELECT id from members WHERE username = ?`, [userName]))[0].id;
        await query(`INSERT INTO communityRatings (community_id, user_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating)`, [communityID, userID, rating]);
        return resolve(true);
    })
}


function getAverageRating(communityName) {
    return new Promise(async (resolve, reject) => {
        let communityID = (await query(`SELECT id from communities WHERE title = ?`, [communityName]))[0].id;
        let result = await query(`SELECT AVG(rating) AS averageRating FROM communityRatings WHERE community_id = ?`, [communityID]);
        if (result.length === 0 || result[0].averageRating === null) {
            return resolve(3);  // No ratings found, return 0 as the average rating
        }
        return resolve(result[0].averageRating);
    })
}

function getMyCommunities(user) {

    return new Promise(async (resolve, reject) => {
        try {

            let userID = (await query(`SELECT id from members WHERE username = ?`, [user]))[0].id;
            // Execute the main query
            let result = (await query(`SELECT communities.*  FROM communities  JOIN commMembers ON communities.id = commMembers.community_id  WHERE commMembers.member_id = ?`, [userID]));
            
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

    const binaryData = await fs.readFile("../../images2/City.jpg");
    console.log(binaryData);

    // await connect();
    // await createTag({
    //     'tag': 'Gym',
    //     'icon': binaryData
    // })
    // disconnect();
}

async function exImageStore() {
    const fs = require('fs').promises;

    await connect();

    const imgs = await getCommunityImages("Test2");
    disconnect();
    console.log(imgs[0])
    
    await fs.writeFile("../../images2/test2.jpg", imgs[0]);
}

// Return: Returns a Promise that will have the value True if the community is 
//         created successfully and False otherwise
// Note: Only allows for one community of a given name
async function createProposal(data) {
    const user = await getMemberName(data.ownerUser);

    const communityData = {
        title: data.title, 
        description: data.description,
        tag_id: data.tag_id
    }

    return new Promise(async (resolve, reject) => {
        let exists = await proposalExists(data.title);
        if (exists) {
            return resolve(false);
        }
        
        let propResult = await query(`INSERT INTO proposals SET ?`, communityData);
        let memResult = await query(`SELECT * FROM members WHERE name = ?`, [user]);
        await query(`INSERT INTO proposalsInterests SET ?`, {
            proposal_id: propResult.insertId,
            member_id: memResult[0].id
        });

        return resolve(true);
    })
}

// deleteCommunity: Deletes the community given by name from the communities table
// Pre: The community is in the communities table
// Note: The commMembers entries must be removed first as they have the community
//       as a foreign key
async function deleteProposal(title) {
    let commRes = await query(`SELECT id FROM proposals WHERE title = ?`, [title]);
    await query(`DELETE FROM proposalsInterests WHERE proposal_id = ?`, [commRes[0].id]);
    await query(`DELETE FROM proposals WHERE title = ?`, [title]);
}

// communityExists: Checks if a community already exists with the given name on
//                  the communities table
// Pre: Function located between connect and disconnect calls
function proposalExists(name) {
    return new Promise(async (resolve, reject) => {
        let res = await query(`SELECT * FROM proposals WHERE title = ?`, [name]);
        return resolve(res.length > 0);
    });
}

module.exports = {
    getAllCommunities,
    getCommunityImages,
    getSearchOrderedBy,
    getTagDetails,
    getCommunityMembers,
    createMember,
    memberExists, 
    createCommunity,
    createEvent,
    addCommunityImage,
    getAllTags,
    memberExists,
    addMemberToCommunity,
    deleteMemberFromCommunity,
    memberAlreadyInCommunity,
    createProposal,
    rateCommunity,
    getAverageRating,
    setAttendance,
    getAllEvents,
    removeAttendance,
    getAttending,
    getMyCommunities
}

