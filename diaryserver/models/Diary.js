const db = require('../db/diary');

class Diary {
    constructor({id, title, content, category, entry_date,}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.entry_date = entry_date;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary_entries ORDER BY entry_date DESC;");
        if (response.rows.length === 0) {
            throw new Error("No entries available.")
        }
        return response.rows.map(entry => new Diary(entry));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary_entries WHERE id = $1;", [id]);

        if(response.rows.length != 1) {
            throw new Error("Unable to locate entry.")
        }

        return new Diary(response.rows[0]);
    }

    static async create(data) {
    const { title, content, category, entry_date } = data;

    if (!content) {
      throw new Error("Diary entry must have content.");
    }

    const response = await db.query(
      `INSERT INTO diary_entries (title, content, category, entry_date)
       VALUES ($1, $2, $3, COALESCE($4, NOW()))
       RETURNING *;`,
      [title, content, category || "General", entry_date]
    );

    return new Diary(response.rows[0]);
  }
    
    async update(data) {
        const { title, content, category } = data;

        const response = await db.query("UPDATE diary_entries SET title = $1, content = $2, category = $3 WHERE id = $4 RETURNING *"
      [
        title, this.title,
        content, this.content,
        category, this.category,
        this.id
      ]
    );
        if (response.rows.length != 1) {
            throw new Error("Unable to update entry.")
        }
        return new Diary(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM data_entries WHERE title = $1 RETURNING *;", [this.title]);
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;
