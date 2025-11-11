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
    if (Object.keys(input).length === 0) {
      return this.findById(id);
    }

    const fields: string[] = [];
    if (input.first_name !== undefined) fields.push('first_name');
    if (input.last_name !== undefined) fields.push('last_name');
    if (input.email !== undefined) fields.push('email');

    if (fields.length === 0) {
      return this.findById(id);
    }

    // Build dynamic query based on fields to update
    if (fields.length === 3) {
      const result = await sql<User>`
        UPDATE users SET first_name = ${input.first_name}, last_name = ${input.last_name}, email = ${input.email}
        WHERE id = ${id} RETURNING *
      `;
      return result.rows[0] || null;
    } else if (fields.length === 2) {
      if (fields.includes('first_name') && fields.includes('last_name')) {
        const result = await sql<User>`
          UPDATE users SET first_name = ${input.first_name}, last_name = ${input.last_name}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else if (fields.includes('first_name') && fields.includes('email')) {
        const result = await sql<User>`
          UPDATE users SET first_name = ${input.first_name}, email = ${input.email}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else {
        const result = await sql<User>`
          UPDATE users SET last_name = ${input.last_name}, email = ${input.email}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      }
    } else {
      if (fields.includes('first_name')) {
        const result = await sql<User>`
          UPDATE users SET first_name = ${input.first_name}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else if (fields.includes('last_name')) {
        const result = await sql<User>`
          UPDATE users SET last_name = ${input.last_name}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      } else {
        const result = await sql<User>`
          UPDATE users SET email = ${input.email}
          WHERE id = ${id} RETURNING *
        `;
        return result.rows[0] || null;
      }
    }
  }

  // Delete user
  static async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM users WHERE id = ${id}
    `;
    return (result.rowCount ?? 0) > 0;
  }
}
