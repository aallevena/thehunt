import { sql } from '@vercel/postgres';
import { Game, CreateGameInput } from '@/types/models';

export class GameRepository {
  // Create a new game
  static async create(input: CreateGameInput): Promise<Game> {
    const result = await sql<Game>`
      INSERT INTO game (title, description, owning_user_id)
      VALUES (${input.title}, ${input.description || null}, ${input.owning_user_id})
      RETURNING *
    `;
    return result.rows[0];
  }

  // Get game by ID
  static async findById(id: number): Promise<Game | null> {
    const result = await sql<Game>`
      SELECT * FROM game WHERE id = ${id}
    `;
    return result.rows[0] || null;
  }

  // Get all games
  static async findAll(): Promise<Game[]> {
    const result = await sql<Game>`
      SELECT * FROM game ORDER BY created_at DESC
    `;
    return result.rows;
  }

  // Get games by owning user
  static async findByOwner(userId: number): Promise<Game[]> {
    const result = await sql<Game>`
      SELECT * FROM game WHERE owning_user_id = ${userId} ORDER BY created_at DESC
    `;
    return result.rows;
  }

  // Update game
  static async update(id: number, input: Partial<CreateGameInput>): Promise<Game | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (input.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(input.title);
    }
    if (input.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(input.description);
    }
    if (input.owning_user_id !== undefined) {
      updates.push(`owning_user_id = $${paramIndex++}`);
      values.push(input.owning_user_id);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await sql<Game>`
      UPDATE game
      SET ${sql.raw(updates.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  }

  // Delete game
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM game WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
