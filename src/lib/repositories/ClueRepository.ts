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

  // Update clue - requires all fields
  static async update(id: number, input: CreateClueInput): Promise<Clue | null> {
    const result = await sql<Clue>`
      UPDATE clues
      SET
        game_id = ${input.game_id},
        type = ${input.type},
        payload = ${JSON.stringify(input.payload)}::jsonb,
        answer_type = ${input.answer_type},
        answer_payload = ${input.answer_payload},
        context = ${input.context || null}
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
