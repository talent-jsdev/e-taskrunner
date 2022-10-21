const acceptableTaskIds = ["id11", "id12", "id13", "id14", "id15", "id16", "id17", "id18", "id19", "id20"];

exports.hasTask = (id) => {
    return acceptableTaskIds.indexOf(id) > -1 ? true : false;
}

exports.runTask = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("completed");
        }, parseInt(id.match(/\d+/)[0]) * 50);
    })
}