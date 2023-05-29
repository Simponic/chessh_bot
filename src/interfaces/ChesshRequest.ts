export interface BotMoveRequest {
  bot_id: number;
  bot_name: string;
  game_id: number;
  fen: string;
  turn: string;
  bot_turn: boolean;
  status: string;
}

export interface BotMoveAttempt {
  token: string;
  attempted_move: string;
}

export interface BotMoveResponse {
  success: boolean;
  message: string;
}
