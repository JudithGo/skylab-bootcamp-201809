class Postit {
    constructor(content) {
        this.id = Date.now()
        this.content = content
    }
}

module.exports = Postit