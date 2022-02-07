const express = require("express");
const router = express.Router();


router.post("/", (request, response) => {
    const newpath = __dirname + "/../files/";
    const file = request.files.file;
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            response.status(500).send({ message: "File upload failed", code: 445 });
            return
        }
        let filePath = `http://127.0.0.1:8080/${filename}`
        console.log(filePath);
        response.json(filePath)
    });
});

module.exports = router;

