# Webhook Server

Rename .env.dist to .env and fill in the values with an authorization key and a [discord bot token](https://discord.com/developers/applications)
The key should be your own, but is is optional. If you do not provide an authorization token, it will not be required

## How to post

``` POST /webhook ```

Authorization: The key in `.env` or anything if `AUTHORIZATION` is not set in the env file

Message: The message OR EMBED to send.

Channel: The channel identifier or ID

## Embed support

Instead of a string in Message, you can use a table to provide title and description

```json
{
    "Title": "Title",
    "Description": "Description"
}
```

If you would like to add more, you must change the `isDirectory` function and add extra functionality based on the [discord.js v12 docs](https://v12.discordjs.guide/popular-topics/embeds.html)

## Channel identifiers
If you want to provide strings to send to a channel instead of an ID, you can add a dictionary entry to `channels`

```js
const channels = {
    ["channel-identifier"]: "channelID string",
    ["channel2"]: "1" // MUST be in string form
}
```

## Contributions accepted

If you find any issues or feature requests, post them in issues or open a pull request.
