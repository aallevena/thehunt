// User model
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
}

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
}

// Game model
export interface Game {
  id: number;
  title: string;
  description: string | null;
  owning_user_id: number;
  created_at: Date;
}

export interface CreateGameInput {
  title: string;
  description?: string;
  owning_user_id: number;
}

// Clue model
export interface Clue {
  id: number;
  game_id: number;
  type: string;
  payload: Record<string, any>;
  answer_type: string;
  answer_payload: string;
  context: string | null;
  created_at: Date;
}

export interface CreateClueInput {
  game_id: number;
  type: string;
  payload: Record<string, any>;
  answer_type: string;
  answer_payload: string;
  context?: string;
}

// Answer model
export type AnswerState = 'U' | 'C' | 'I'; // Unanswered, Correct, Incorrect

export interface Answer {
  id: number;
  clue_id: number;
  user_id: number;
  payload: string;
  state: AnswerState;
  submit_time: Date;
}

export interface CreateAnswerInput {
  clue_id: number;
  user_id: number;
  payload: string;
  state: AnswerState;
}
