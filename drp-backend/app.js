const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database.js');
const { 
    getAllCommunities,
    getCommunityImages, 
    getSearchOrderedBy, 
    createMember, 
    getCommunityMembers, 
    memberExists,
    getTagDetails,
    addCommunityImage,
    createCommunity,
    createEvent,
    createProposal,
    getAllTags,
    memberAlreadyInProposal,
    deleteMemberFromProposal,
    getProposalMembers,
    addMemberToProposal,
    addMemberToCommunity,
    getProposalDetails,
    deleteMemberFromCommunity,
    memberAlreadyInCommunity,
    rateCommunity,
    getAverageRating,
    setAttendance,
    getAllEvents,
    removeAttendance,
    getAttending,
    getMyCommunities,
    isCommunityOwner,
    createNotification,
    getNotifications,
    getCommunityDetails,
    getMyProposals,
    getRatingNumber,
    readNotification,
    readEvents,
} = require('./controllers/databaseService.js');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const port = process.env.PORT || 3000;

async function setUp() {
    await connect();
}

setUp();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/homePage', async (req, res) => {
    const data = await getAllCommunities();
    res.json(data);
});

// app.get('/search', async (req, res) => {
//     res.redirect('/homePage')
// })

// app.get('/search/:searchTerm', async (req, res) => {
//     const search = req.params.searchTerm;
//     const data = await getSearchedCommunities(search);
//     res.json(data);
// })

app.get('/search', async (req, res) => {
    const search = req.query.searchTerm || ''; 
    const orderBy = req.query.orderBy || 'title';
    const myCommunities = req.query.myCommunities || 'false';
    if (myCommunities == 'true') {
        try {
            const user = req.query.user || '';
            const data = await getMyCommunities(user);
            res.json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        try {
            const data = await getSearchOrderedBy(search, orderBy);
            res.json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
});

app.get('/searchProposals', async (req, res) => {
    try {
        const user = req.query.user || '';
        const data = await getMyProposals(user);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const username = req.query.username;
    try {
        const exists = await memberExists(username);
        if (exists) {
            res.json({username: username, exists: true});
        } else {
            res.json({username: username, exists: false});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/addUser', async (req, res) => {
    const name = req.query.name
    const username = req.query.username
    try {
        createMember(name, username);
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/rate', async (req, res) => {
    const community = req.query.commName;
    const user = req.query.username;
    const rating = parseFloat(req.query.rating);
    try {
        await rateCommunity(community, user, rating);
        res.status(200).send("Rating Added")
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/getRating', async (req, res) => {
    const community = req.query.community;
    try {
        const result = await getAverageRating(community);
        res.send(result.toString());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/getRatingNumber', async (req, res) => {
    const community = req.query.community;
    try {
        const result = await getRatingNumber(community);
        res.send(result.toString());
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Returns true if the community is made correctly or false otherwise
app.post('/createCommunity', async (req, res) => {
    const title = req.body.comm.title;
    try {
        const made = await createCommunity(req.body.comm);
        if (made) {
            req.body.imgs.map(async (img) => {
                const stripImg = img.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
                const data = Buffer.from(stripImg, 'base64');
                await addCommunityImage(title, data);
            });
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/createEvent', async (req,res) => {
    try {
        const made = await createEvent(req.body);
        res.send(made);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/createNotification', async (req, res) => {
    try {
        await createNotification(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/createProposal', async (req, res) => {
    try {
        res.send(await createProposal(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// If the member is already in the community, they will be removed
// If the memnber is not already in the community, they will be added
app.post('/toggleMemberInCommunity', async (req, res) => {
    const commName = req.query.commName;
    const username = req.query.username;

    const joined = await memberAlreadyInCommunity(username, commName);
    try {
        if (joined) {
            deleteMemberFromCommunity(commName, username);
        } else {
            await addMemberToCommunity(commName, username);
        }
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// If the member is already in the community, they will be removed
// If the memnber is not already in the community, they will be added
app.post('/toggleInterested', async (req, res) => {
    const propName = req.query.propName;
    const username = req.query.username;
    const interested = await memberAlreadyInProposal(username, propName);
    try {
        if (interested) {
            deleteMemberFromProposal(propName, username);
        } else {
            await addMemberToProposal(propName, username);
        }
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post("/attend", async (req, res) => {
    const eventId = req.body.eventId;
    const user = req.body.user;
    const attend = req.body.attend;
    try {
        if (attend != null) {
            await setAttendance(eventId, user, attend);
        } else {
            await removeAttendance(eventId, user);
        }
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/readNotification", async (req, res) => {
    const user = req.query.user;
    const notificationId = req.query.id
    try {
        await readNotification(notificationId, user);
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post("/readEvents", async (req, res) => {
    const user = req.query.user;
    const community = req.query.community;
    try {
        readEvents(community, user);
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/getEvents", async (req, res) => {
    const commId = req.query.commId;
    const result = await getAllEvents(commId);
    res.json(result);
});

app.get("/getNotifications", async (req, res) => {
    const user = req.query.user;
    try {
        const notifications = await getNotifications(user);
        res.json({notifications});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/getUnreadEvents", async (req, res) => {
    const user = req.query.user;
    const community = req.query.community;
    try {
        const notifications = await getNotifications(user);
        const events = notifications.filter(notification => notification.community_id == community);
        res.json({events});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/getCommunity", async (req, res) => {
    const id = req.query.id;
    try {
        const community = await getCommunityDetails(id);
        res.json({community});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/getProposal", async (req, res) => {
    const id = req.query.id;
    try {
        const proposal = await getProposalDetails(id);
        res.json({proposal});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/attending", async (req, res) => {
    const eventId = req.query.eventId;
    const result = await getAttending(eventId);
    res.json(result);
})

app.get('/getCommunityMembers', async (req, res) => {
    const community = req.query.community;
    try {
        const [names, usernames] = await getCommunityMembers(community);
        res.json({names, usernames});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/isOwner', async (req, res) => {
    const community = req.query.community;
    const user = req.query.user;
    try {
        const result = await isCommunityOwner(community, user);
        res.json({owner: result});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/getProposalMembers', async (req, res) => {
    const prop = req.query.proposal;
    try {
        const [names, usernames] = await getProposalMembers(prop);
        res.json({names, usernames});
    } catch (error) {
        res.status(500).send(error.message);
    }
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/images', async (req, res) => {
    const commName = req.query.name;
    const index = parseInt(req.query.id, 10);
    const imgs = await getCommunityImages(commName);
    res.set('Content-type', 'image/jpeg');
    try {
        res.send(imgs[index]);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/all-images', async (req, res) => {
    const commName = req.query.name;
  
    try {
      const imgs = await getCommunityImages(commName);
      const imagesBase64 = imgs.map(img => img.toString('base64'));
      res.set('Content-type', 'application/json');
      res.send(JSON.stringify(imagesBase64));
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.get('/icon', async (req, res) => {
    const tagId = req.query.id;
    const tagDetails = await getTagDetails(tagId);
    res.set('Content-type', 'image/png');
    res.send(tagDetails.icon);
})

app.get("/tag", async (req, res) => {
    const tagId = req.query.id;
    const tagDetails = await getTagDetails(tagId);
    res.json(tagDetails.tag);
})
