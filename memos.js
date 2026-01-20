import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send("read all memos"));
router.get("/:id", (req, res) => {
    const id = [req.params.id];
    res.send(`read a memo with ${id}`);
});

router.post('/', (req, res) => 
    res.send("insert new memo")
);

router.put('/:id', (req, res) => 
    res.send("update a memo with an id")
);

router.delete('/:id', (req, res) => 
    res.send("delete a memo with an id")
);

export default router;
