const express = require('express');
const router = express.Router();
const db = require('../db');
const { NotFoundError, ConflictError, DatabaseError } = require('../utils/errors');
const { validateServer, validateListQuery } = require('../middleware/validator');

// GET /api/servers - List all servers with pagination and filtering
router.get('/', validateListQuery, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';

    // Build query
    let query = 'SELECT * FROM servers WHERE 1=1';
    const params = [];
    let paramCount = 1;

    // Add search filter
    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Add status filter
    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    // Get total count
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Add pagination
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    // Execute query
    const result = await db.query(query, params);

    res.json({
      servers: result.rows,
      metadata: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(new DatabaseError(error.message));
  }
});

// GET /api/servers/:name - Get a single server by name
router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    
    const result = await db.query(
      'SELECT * FROM servers WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return next(new NotFoundError(`Server '${name}' not found`));
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(new DatabaseError(error.message));
  }
});

// POST /api/servers - Create a new server
router.post('/', validateServer, async (req, res, next) => {
  try {
    const {
      name,
      description,
      status,
      repository,
      version,
      schema_url,
      remotes,
      packages,
      meta,
    } = req.body;

    // Check if server already exists
    const existingServer = await db.query(
      'SELECT id FROM servers WHERE name = $1',
      [name]
    );

    if (existingServer.rows.length > 0) {
      return next(new ConflictError(`Server '${name}' already exists`));
    }

    // Insert new server
    const result = await db.query(
      `INSERT INTO servers (name, description, status, repository, version, schema_url, remotes, packages, meta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        name,
        description || null,
        status || 'active',
        repository ? JSON.stringify(repository) : null,
        version || null,
        schema_url || null,
        remotes ? JSON.stringify(remotes) : null,
        packages ? JSON.stringify(packages) : null,
        meta ? JSON.stringify(meta) : null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(new DatabaseError(error.message));
  }
});

// PUT /api/servers/:name - Update a server
router.put('/:name', validateServer, async (req, res, next) => {
  try {
    const { name } = req.params;
    const {
      description,
      status,
      repository,
      version,
      schema_url,
      remotes,
      packages,
      meta,
    } = req.body;

    // Check if server exists
    const existingServer = await db.query(
      'SELECT id FROM servers WHERE name = $1',
      [name]
    );

    if (existingServer.rows.length === 0) {
      return next(new NotFoundError(`Server '${name}' not found`));
    }

    // Update server
    const result = await db.query(
      `UPDATE servers 
       SET description = COALESCE($2, description),
           status = COALESCE($3, status),
           repository = COALESCE($4, repository),
           version = COALESCE($5, version),
           schema_url = COALESCE($6, schema_url),
           remotes = COALESCE($7, remotes),
           packages = COALESCE($8, packages),
           meta = COALESCE($9, meta)
       WHERE name = $1
       RETURNING *`,
      [
        name,
        description,
        status,
        repository ? JSON.stringify(repository) : null,
        version,
        schema_url,
        remotes ? JSON.stringify(remotes) : null,
        packages ? JSON.stringify(packages) : null,
        meta ? JSON.stringify(meta) : null,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(new DatabaseError(error.message));
  }
});

// DELETE /api/servers/:name - Delete a server
router.delete('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;

    const result = await db.query(
      'DELETE FROM servers WHERE name = $1 RETURNING *',
      [name]
    );

    if (result.rows.length === 0) {
      return next(new NotFoundError(`Server '${name}' not found`));
    }

    res.json({ message: `Server '${name}' deleted successfully` });
  } catch (error) {
    next(new DatabaseError(error.message));
  }
});

module.exports = router;
