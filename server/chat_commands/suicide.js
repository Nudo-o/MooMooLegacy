export default {
    command: "/suicide",
    execute(message, author) {
        author.player.kill(author.player)
    }
}