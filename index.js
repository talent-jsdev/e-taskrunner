const express = require('express');
const TaskRunner = require('./taskRunner.js');
const app = express();

app.use(express.json());

app.post('/api/runTasks', async (req, res, next) => {
    const taskIds = req.body.taskIds;
    let resOrder = [];

    try {
        taskIds.forEach(async taskId => {
            if (!TaskRunner.hasTask(taskId)) {
                res.status(404).json({ "error": "no Task" });
            }

            await TaskRunner.runTask(taskId)
            resOrder.push(taskIds.indexOf(taskId));

            if (resOrder.length == taskIds.length) {
                res.status(200).json(getResult(resOrder));
            }
        })

    } catch (error) {
        next(error);
    }
});

const getResult = (order) => {
    let res = [0];

    for (let i = 1; i < order.length; i++) {
        for (let j = 0; j < i; j++) {
            if (order.indexOf(i) < order.indexOf(j)) {
                res.push(-1);
                break;
            }
            if (j == i - 1) {
                res.push(i)
            }
        }
    }

    return res;
}

exports.default = app.listen(process.env.HTTP_PORT || 3000);