const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");
const slugify = require('slugify');

// GET /companies
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT code, name FROM companies");
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

// GET /companies/[code]
router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const compResult = await db.query(
      "SELECT c.code, c.name, c.description, i.industry FROM companies AS c LEFT JOIN company_industries AS ci ON c.code = ci.comp_code LEFT JOIN industries AS i ON ci.ind_code = i.code WHERE c.code = $1",
      [code]
    );

    if (compResult.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    }

    const { name, description } = compResult.rows[0];
    const industries = compResult.rows.map(row => row.industry).filter(Boolean);

    const invResult = await db.query(
      "SELECT id FROM invoices WHERE comp_code = $1",
      [code]
    );

    const invoices = invResult.rows.map(row => row.id);

    return res.json({ 
      company: { code, name, description, industries, invoices } 
    });
  } catch (err) {
    return next(err);
  }
});

// POST /companies
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const code = slugify(name, { lower: true, strict: true });
    const result = await db.query(
      "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description",
      [code, name, description]
    );
    return res.status(201).json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// PUT /companies/[code]
router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const result = await db.query(
      "UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description",
      [name, description, code]
    );
    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    }
    return res.json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// DELETE /companies/[code]
router.delete("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const result = await db.query("DELETE FROM companies WHERE code = $1 RETURNING code", [code]);
    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    }
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;