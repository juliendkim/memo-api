import express from 'express';
import pool from './db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    var qry = "select * from memos";
    try {
        const result = await pool.query(qry);
        res.send({success: true,data: result.rows});
    } catch(err) {
        res.send({success: false,message: err.message});
    }
});

router.get("/:id", async (req, res) => {
    var qry = "select * from memos where id=$1";
    try {
        const result = await pool.query(qry, [req.params.id]);
        if(result.rowCount === 0)
            res.status(404).send({success: false, message:"not found"});
        else
            res.send({success: true,data: result.rows});
    } catch(err) {
        res.send({success: false,message: err.message});
    }
});

router.post('/', async (req, res) => {
    var { id, title, content } = req.body;
    var qry = "insert into memos(id, title, content) "
               + "values($1, $2, $3) returning *";
    try {
        const result = await pool.query(qry, [id, title, content]);
        res.status(201).send({success: true,data: result.rows[0]});
    } catch(err) {
        res.send({success: false,message: err.message});
    }
});

router.put('/:id', async (req, res) => {
    var { title, content } = req.body;
    var { id } = req.params;
    var qry = "update memos set title=$1, content=$2 "
               + "where id=$3 "
               + "returning *";
    try {
        const result = await pool.query(qry, [title, content, id]);
        res.send({success: true,data: result.rows[0]});
    } catch(err) {
        res.send({success: false,message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    var { id } = req.params;
    var qry = "delete from memos where id=$1 "
               + "returning *";
    try {
        const result = await pool.query(qry, [id]);
        res.send({success: true,data: result.rows[0]});
    } catch(err) {
        res.send({success: false,message: err.message});
    }
});

export default router;
