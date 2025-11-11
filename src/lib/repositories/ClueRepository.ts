import { sql } from '@vercel/postgres';
import { Clue, CreateClueInput } from '@/types/models';

export class ClueRepository {
  // Create a new clue
  static async create(input: CreateClueInput): Promise<Clue> {
    const result = await sql<Clue>`
      INSERT INTO clues (game_id, type, payload, answer_type, answer_payload, context)
      VALUES (
        ${input.game_id},
        ${input.type},
        ${JSON.stringify(input.payload)}::jsonb,
        ${input.answer_type},
        ${input.answer_payload},
        ${input.context || null}
      )
      RETURNING *
    `;
    return result.rows[0];
  }

  // Get clue by ID
  static async findById(id: number): Promise<Clue | null> {
    const result = await sql<Clue>`
      SELECT * FROM clues WHERE id = ${id}
    `;
    return result.rows[0] || null;
  }

  // Get all clues for a game
  static async findByGame(gameId: number): Promise<Clue[]> {
    const result = await sql<Clue>`
      SELECT * FROM clues WHERE game_id = ${gameId} ORDER BY id
    `;
    return result.rows;
  }

  // Get all clues
  static async findAll(): Promise<Clue[]> {
    const result = await sql<Clue>`
      SELECT * FROM clues ORDER BY game_id, id
    `;
    return result.rows;
  }

  // Update clue
  static async update(id: number, input: Partial<CreateClueInput>): Promise<Clue | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (input.game_id !== undefined) {
      updates.push(`game_id = $${paramIndex++}`);
      values.push(input.game_id);
    }
    if (input.type !== undefined) {
      updates.push(`type = $${paramIndex++}`);
      values.push(input.type);
    }
    if (input.payload !== undefined) {
      updates.push(`payload = $${paramIndex++}::jsonb`);
      values.push(JSON.stringify(input.payload));
    }
    if (input.answer_type !== undefined) {
      updates.push(`answer_type = $${paramIndex++}`);
      values.push(input.answer_type);
    }
    if (input.answer_payload !== undefined) {
      updates.push(`answer_payload = $${paramIndex++}`);
      values.push(input.answer_payload);
    }
    if (input.context !== undefined) {
      updates.push(`context = $${paramIndex++}`);
      values.push(input.context);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await sql<Clue>`
      UPDATE clues
      SET ${sql.raw(updates.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  }

  // Delete clue
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM clues WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
