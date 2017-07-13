class Direction {
    static add(coor, direction) {
        switch (direction) {
            case Direction.UP(): coor.y--; break;
            case Direction.DOWN(): coor.y++; break;
            case Direction.LEFT(): coor.x--; break;
            case Direction.RIGHT(): coor.x++; break;
        }
        return coor;
    }

    static UP() { return 0 }
    static RIGHT() { return 1 }
    static DOWN() { return 2 }
    static LEFT() { return 3 }

    static isOpposite(prevDir, newDir) {
        return this.opposites()[prevDir] === newDir
    }

    static opposites() {
        return {
            0: 2,
            1: 3,
            2: 0,
            3: 1
        }
    }
}

module.exports = Direction