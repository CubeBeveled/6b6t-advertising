# 6b6t advertiser
A bot to advertise your stuff on 6b6t
*Only works with offline authentication accounts (cracked accounts)*

# Running the bot
1. Making sure you have [nodejs](https://nodejs.org/en) 20 or later and [git](https://git-scm.com/) installed<br>
You can do that by running the following from your console. (Both of the commands show the versions of nodejs and git, if they are installed)
```sh
node -v
git -v
```
2. Download the git repository to your machine by running the following command in your console
```sh
git clone https://github.com/CubeBeveled/6b6t-advertising
```
3. Install the required packages<br>
You can do that by running the following inside the `src` folder from your console.
```sh
npm i
```
4. Modify the `config.json` file found inside the `src` folder. More specifically, the [messages](https://github.com/CubeBeveled/6b6t-advertising?tab=readme-ov-file#messages), [username](https://github.com/CubeBeveled/6b6t-advertising?tab=readme-ov-file#username) and [password](https://github.com/CubeBeveled/6b6t-advertising?tab=readme-ov-file#username). If you want you can also change the other options.
5. Run the following inside the src folder
```sh
node index.js
```
6. Profit

*NOTE: console is also known as command prompt, if you are on windows*
# Settings
### sendChatMessagesInConsole
If a bot should send chat messages in console

## advertising
### usernameBlacklist
Usernames in this list wont receive your advertisements

### messages
What messages to send.

### messagePattern
String that contains the placeholders for the final messages
**Placeholders**
* `.msg`: The message selected from the previous option
* `.rand`: Random string of letters and numbers

### randomStringLength
The length of the random string placeholder

### sendMessagesInRandomOrder
If the bot should send the messages in random order. If set to false, it will send them in random order.

### messageDelay
The delay between messages. Ignored if `randomMessageDelay` is true.

### randomMessageDelay
If the delay between messages should be random.

### maxRandomMessageDelay
The max delay between messages. Ignored if `randomMessageDelay` is `false`.

### whisperMessages
If the bot should whisper the messages it sends to players.

### sendMessagesInChat
If the bot should send the messages in normal chat.

### randomPlayerOrder
If the messages should be sent to players in the order they appear in the tab list

## Bot object
### username
The username that the bot will join with. If botCount is more than 1 a number will be added at the end of said username.

### password
The password that the bot will put into the /login command

### reconnectDelay
*Default: 5.5s*<br>
After how much time should the bot reconnect (in seconds).

### viewDistance
*Default: tiny*<br>
The render distance of the bot. Input options for this value can be read [here](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md#botsettingsviewdistance).

*For developers* heres the [Mineflayer API documentation](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md)
___
