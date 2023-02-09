const axios = require('axios');



const getLoginInfo = async (req,res) =>{
    const url = "https://discord.com/api/oauth2/authorize?client_id=1072853722075516989&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join%20guilds.members.read";    res.redirect(url);
}

const getDetails =  async (req,res) =>{ 
const {code } = req.query;
console.log(code);

const params  = new URLSearchParams({
    client_id:"1072853722075516989",
    client_secret:"FjHksxgw77ixJZsfuxfIPq3NFLAJhc8q",
    grant_type: 'authorization_code',
    code,
    redirect_uri: "http://localhost:8080/api/discord/callback"
})

const headers ={
    'Cantent-Type':'application/x-www-form-urlencoded',
     'Accept-Encoding':'application/x-www-forn-urlencoded'
}

const response = await  axios.post('https://discord.com/api/oauth2/token',params,{headers});
console.log("Response",response.data.access_token);

//GETTING USERS GUILDS
const userResponse = await axios.get('https://discord.com/api/users/@me/guilds', { headers:{ Authorization: `Bearer ${response.data.access_token}`}});
console.log("userResponse", userResponse);


const userAllGuilds = userResponse.data;


// VERIFY USER
let GuildID = '946464493276381194';

function verifyUser(userAllGuilds,GuildID){
    let verify = 0;
    console.log("G",GuildID);
    verify = userAllGuilds.filter( (v) => { if( v.id === GuildID){ return 1;} else {return 0;}}) ;
    if(verify)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

verifyUser = verifyUser(userAllGuilds,GuildID);

console.log(verifyUser);

if(verifyUser)
{
res.send(userResponse.data);
}
else
{
res.send({msg:"USER IS NOT IN THE GUILD"});
}
}


// JOIN DISCORD CHANNEL
const joinChannel = async(req,res) => {
    res.redirect('https://discord.gg/DPpamMRj');
}


//Not in use Currently
const getUserGuilds = async(req,res) => {
const result = await axios.get('htpps://discord.com/api/users/@me/guilds',{ headers: { Authorization: 'Bearer' + access_token }})
console.log(" USER GUILD RESULTS",result);
res.send(result);
}

//Verify User For A GUILD



module.exports = {getLoginInfo,getDetails,joinChannel,getUserGuilds};