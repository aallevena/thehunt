import { sql } from '@vercel/postgres';
import { Answer, CreateAnswerInput, AnswerState } from '@/types/models';

export class AnswerRepository {
  // Create a new answer
  static async create(input: CreateAnswerInput): Promise<Answer> {
    const result = await sql<Answer>`
      INSERT INTO answers (clue_id, user_id, payload, state, submit_time)
      VALUES (
        ${input.clue_id},
        ${input.user_id},
        ${input.payload},
        ${input.state},
        CURRENT_TIMESTAMP
      )
      RETURNING *
    `;
    return result.rows[0];
  }

  // Get answer by ID
  static async findById(id: number): Promise<Answer | null> {
    const result = await sql<Answer>`
      SELECT * FROM answers WHERE id = ${id}
    `;
    return result.rows[0] || null;
  }

  // Get all answers for a clue
  static async findByClue(clueId: number): Promise<Answer[]> {
    const result = await sql<Answer>`
      SELECT * FROM answers WHERE clue_id = ${clueId} ORDER BY submit_time
    `;
    return result.rows;
  }

  // Get all answers by a user
  static async findByUser(userId: number): Promise<Answer[]> {
    const result = await sql<Answer>`
      SELECT * FROM answers WHERE user_id = ${userId} ORDER BY submit_time DESC
    `;
    return result.rows;
  }

  // Get answers by user and clue
  static async findByUserAndClue(userId: number, clueId: number): Promise<Answer[]> {
    const result = await sql<Answer>`
      SELECT * FROM answers
      WHERE user_id = ${userId} AND clue_id = ${clueId}
      ORDER BY submit_time DESC
    `;
    return result.rows;
  }

  // Get all answers
  static async findAll(): Promise<Answer[]> {
    const result = await sql<Answer>`
      SELECT * FROM answers ORDER BY submit_time DESC
    `;
    return result.rows;
  }

  // Update answer state
  static async updateState(id: number, state: AnswerState): Promise<Answer | null> {
    const result = await sql<Answer>`
      UPDATE answers
      SET state = ${state}
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  }

  // Delete answer
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM answers WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
