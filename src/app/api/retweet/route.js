const { default: connectToDB } = require("@/configsdb");
import reTweetModel from "@/models/Retweet.js";
import tweetModel from "@/models/tweet.js";

export async function GET() {
  connectToDB();

  try {
    const reTweets = await reTweetModel.find({});
    const ret = reTweets.map((retweet) => {
      return retweet.tweet;
    });
    const tweets = await tweetModel.find({});


    return Response.json(reTweets);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "err" });
  }
}
