export interface BotMoveRequest {
  bot_id: number;
  bot_name: string;
  game_id: number;
  fen: string;
  turn: string;
  bot_turn: boolean;
  last_move: string;
  status: string;
}

export interface BotMoveAttempt {
  token: string;
  attempted_move: string;
}

export interface BotMoveResponse {
  message: string;
}
