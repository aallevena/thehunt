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
    if (Object.keys(input).length === 0) {
      return this.findById(id);
    }

    const fields: string[] = [];
    if (input.title !== undefined) fields.push('title');
    if (input.description !== undefined) fields.push('description');
    if (input.owning_user_id !== undefined) fields.push('owning_user_id');

    if (fields.length === 0) {
      return this.findById(id);
    }

    // Build dynamic query based on fields to update
    if (fields.length === 3) {
      const result = await sql<Game>`
        UPDATE game SET title = ${input.title}, description = ${input.description}, owning_user_id = ${input.owning_user_id}
        WHERE id = ${id} RETURNING *
      `;
      return result.rows[0] || null;
    } else if (fields.length === 2) {
      if (fields.includes('title') && fields.includes('description')) {
        const result = await sql<Game>`
          UPDATE game SET title = ${input.title}, description = ${input.description}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else if (fields.includes('title') && fields.includes('owning_user_id')) {
        const result = await sql<Game>`
          UPDATE game SET title = ${input.title}, owning_user_id = ${input.owning_user_id}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else {
        const result = await sql<Game>`
          UPDATE game SET description = ${input.description}, owning_user_id = ${input.owning_user_id}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      }
    } else {
      if (fields.includes('title')) {
        const result = await sql<Game>`
          UPDATE game SET title = ${input.title}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else if (fields.includes('description')) {
        const result = await sql<Game>`
          UPDATE game SET description = ${input.description}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else {
        const result = await sql<Game>`
          UPDATE game SET owning_user_id = ${input.owning_user_id}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      }
    }
  }

  // Delete game
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM game WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
