function slugFormatting(name) {
    return name.toLowerCase().replace(/ /g, '-')
}

module.exports = {
    slugFormatting
}