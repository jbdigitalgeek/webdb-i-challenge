const express = require("express");

const Accounts = require("./data/accounts-model");

const server = express();
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const acctList = await Accounts.find();
    res.status(200).json(acctList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  }
});

server.get("/:id", async (req, res) => {
  try {
    const acctId = await Accounts.findById(req.params.id);
    if (acctId) {
      res.status(200).json(acctId);
    } else {
      res.status(400).json({ message: "Id not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

server.post("/", async (req, res) => {
  const { name, budget } = req.body;
  try {
    const newAcct = await Accounts.add(req.body);
    if (!name || name === "" || !budget || budget === "") {
      res
        .status(400)
        .json({ error: "Please Provide a Name and Budget for this account" });
    } else {
      res.status(201).json(newAcct);
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;
  try {
    const updateAcct = await Accounts.find(id);
    if (updateAcct) {
      await Accounts.update(id, { name, budget });
      res.status(200).json(updateAcct);
    } else {
      res.status(400).json({ message: "Unable to find that Account" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

server.delete("/:id", async (req, res) => {
  const delVal = await Accounts.find(req.params.id);
  
    if (delVal) {
    try{
      const delAcct = await Accounts.remove(req.params.id);
      res.status(200).json(delAcct);
    } catch (error) {
      res.status(400).json({ error: `${error}`  });
    }
  } else {
    res.status(500).json({ error: "Account not found" });
  }
});

module.exports = server;
