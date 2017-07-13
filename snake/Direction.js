module.exports = {
    add(coor, direction) {
        switch (direction) {
            case this.UP: coor.y--; break;
            case this.DOWN: coor.y++; break;
            case this.LEFT: coor.x--; break;
            case this.RIGHT: coor.x++; break;
        }
        return coor;
    },
    isOpposite(prevDir, newDir) {
        return this.opposites[prevDir] === newDir
    },
    
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    opposites: {
        0: 2,
        1: 3,
        2: 0,
        3: 1
    }
}