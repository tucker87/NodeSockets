module.exports = {
    random(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    randomBoardPosition(board) {
        let offset = 5
        return this.random(1 + offset, board.width() - offset)
    }
}