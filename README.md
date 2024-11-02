# 6b6t advertiser
A bot to advertise your stuff on 6b6t
*Only works with offline authentication accounts (cracked accounts)*

# Configuration
### botCount
How many bots will join 6b6t

## advertising
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

## botOptions
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

### sendServerMessagesInConsole
If a bot should send server messages in console
___