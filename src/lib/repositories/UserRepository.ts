import { sql } from '@vercel/postgres';
import { User, CreateUserInput } from '@/types/models';

export class UserRepository {
  // Create a new user
  static async create(input: CreateUserInput): Promise<User> {
    const result = await sql<User>`
      INSERT INTO users (first_name, last_name, email)
      VALUES (${input.first_name}, ${input.last_name}, ${input.email})
      RETURNING *
    `;
    return result.rows[0];
  }

  // Get user by ID
  static async findById(id: number): Promise<User | null> {
    const result = await sql<User>`
      SELECT * FROM users WHERE id = ${id}
    `;
    return result.rows[0] || null;
  }

  // Get user by email
  static async findByEmail(email: string): Promise<User | null> {
    const result = await sql<User>`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result.rows[0] || null;
  }

  // Get all users
  static async findAll(): Promise<User[]> {
    const result = await sql<User>`
      SELECT * FROM users ORDER BY id
    `;
    return result.rows;
  }

  // Update user
  static async update(id: number, input: Partial<CreateUserInput>): Promise<User | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (input.first_name !== undefined) {
      updates.push(`first_name = $${paramIndex++}`);
      values.push(input.first_name);
    }
    if (input.last_name !== undefined) {
      updates.push(`last_name = $${paramIndex++}`);
      values.push(input.last_name);
    }
    if (input.email !== undefined) {
      updates.push(`email = $${paramIndex++}`);
      values.push(input.email);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await sql<User>`
      UPDATE users
      SET ${sql.raw(updates.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  }

  // Delete user
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM users WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
