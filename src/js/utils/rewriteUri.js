
function rewriteUri(oldUri) {
    var removeRegex = /\/GP\.Prepagas/gi
    return oldUri.replace(removeRegex,'')
}

module.exports = rewriteUri;