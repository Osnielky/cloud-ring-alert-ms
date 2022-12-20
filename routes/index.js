var express = require("express");
var router = express.Router();
const axios = require("axios");

const ringHookAddress =
  "https://hooks.ringcentral.com/webhook/v2/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdCI6ImMiLCJvaSI6IjEzNjgyMTIyNzUzIiwiaWQiOiIxODM4MzU4NTU1In0.geCf1vN756b79sdYyJAy5Fdphm147mEpbZxJ66W3NpE";

const friend = [
  {
    id: 0,
    name: "Rosanne Knight",
  },
  {
    id: 1,
    name: "Huber Calderon",
  },
  {
    id: 2,
    name: "Osnielky Roque",
  },
  {
    id: 3,
    name: "Example Now",
  },
  {
    id: 4,
    name: "Chriss Martin",
  },
];

const ringJsonTemplate = {
  activity: "Google Monitoring Alert",

  title: "alert",
  text: "alert text",
  attachments: [
    {
      type: "Card",
      fallback: "Something bad happened",
      color: "#00ff2a",
      intro: "",
      author: {
        name: "Cloud Logs",
        uri: "",
      },
    },
  ],
};

let parseFunct = (body) => {
  let name = body.incident.policy_name;
  let text = body.incident.documentation.content;
  let summary = body.incident.resource_name;
  let url = body.incident.url;

  ringJsonTemplate.title = name;
  ringJsonTemplate.text = text;
  ringJsonTemplate.attachments[0].uri = url;
  ringJsonTemplate.attachments[0].intro = summary;
  console.log(ringJsonTemplate);

};

router.get("/", function (req, res, next) {
  res.send("friends");

});

router.post("/", function (req, res, next) {
  const { body } = req;

  parseFunct(body);

  axios.post(ringHookAddress, ringJsonTemplate).then(function (response) {
    console.log(ringJsonTemplate);
  });

  res.send(body);
});

module.exports = router;
