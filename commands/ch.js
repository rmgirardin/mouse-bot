// This command looks up characters on SWGoH.gg and filters out links that
// aren't characters.

// The modules we are using are cheerio, snekfetch, and querystring.
const cheerio = require("cheerio"),
      snekfetch = require("snekfetch"),
      querystring = require("querystring");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // If there are no args, send cmdError message because we don't know what to
    // search for!
    if (!args[0]) return client.cmdError(message, cmd);

    // These are our two variables. One of them creates a message while we
    // preform a search, the other generates a URL for our crawler.
    const searchMessage = await message.reply("Searching... One moment. 👀");
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args.join(" "))}&as_sitesearch=swgoh.gg&btnI=Search`;

    // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so
    // we will utilize that for our try/catch block.
    return snekfetch.get(searchUrl).then((result) => {

        // Cheerio lets us parse the HTML on our google result to grab the URL.
        const $ = cheerio.load(result.text);

        // This is allowing us to grab the URL from within the instance of the
        // page (HTML)
        let googleData = $(".r").first().find("a").first().attr("href");
        googleData = querystring.parse(googleData.replace("/url?", ""));

        // Now that we found something, check to see if it's the url we actually
        // want. "gear/" is often found when searching, so if it is returned
        // just trim that part off.
        if (googleData.q.search("characters") != -1) {
            if (googleData.q.search("gear")) googleData.q = googleData.q.replace("gear/", "");
            return searchMessage.edit(`This is what I found: ${googleData.q}`);
        } else searchMessage.edit("I couldn't find that character.");

    // If no results are found, we catch it and return "No results are found!"
    }).catch(() => {
        searchMessage.edit("No results found!");
    });

    /*
    This is just old code that can be completely ignored. This simply joins
    args and inserts it into a template URL that simulates Google's "I'm feeling
    lucky" button.

    This is a quicker, dirtier way to look up characters, but it doesn't filter
    any links that aren't what we're looking for and it returns a www.google.com
    link which could be a security concern for some.
    */

    // // Edit the user's message to look up on swgoh.gg
    // const character = args.join("+");
    //
	// message.channel.send("<http://www.google.com/webhp?#q=" + character + "+swgoh.gg&btnI>");
    //
    // // If the link above does not work, try using the link below
    // // message.channel.send("http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=" + character + "+swgoh.gg");

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["character", "characters"],
    permLevel: "User"
};

exports.help = {
    name: "ch",
    category: "Game",
    description: "Looks up characters on swgoh.gg",
    usage: "ch <character-name>",
    examples: ["ch leia", "character sthan", "ch comander luke skywalker"]
};
