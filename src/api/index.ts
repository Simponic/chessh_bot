import express from 'express';
import {
  BotMoveRequest,
  BotMoveAttempt,
  BotMoveResponse,
} from '../interfaces/Chessh';
import axios from 'axios';
import { aiMove } from 'js-chess-engine';

const router = express.Router();

const chesshMovePath = (gameId: number) =>
  (process.env.CHESSH_MOVE_PATH as unknown as string).replace(
    ':gameId',
    gameId.toString(),
  );

const sendNextMove = (gameId: number, move: string): Promise<BotMoveResponse> =>
  axios
    .post(chesshMovePath(gameId), {
      token: process.env.BOT_TOKEN as unknown as string,
      attempted_move: move.toLowerCase(),
    } as BotMoveAttempt)
    .then((r): BotMoveResponse => {
      const body = r.data as BotMoveResponse;
      if (r.status === 200) {
        console.log(body);
        return body;
      }
      throw new Error(
        'Move request unsuccessful, got back from cheSSH: ' +
          JSON.stringify(body),
      );
    });

router.post<BotMoveRequest, string>('/move', async (req, res) => {
  const updateMessages: BotMoveRequest[] = Array.isArray(req.body)
    ? req.body
    : [req.body];

  for (const update of updateMessages) {
    if (update.bot_turn) {
      console.log(update);
      const move = aiMove(update.fen);

      const moveFrom = Object.keys(move)[0];
      const moveTo = move[moveFrom];
      try {
        await sendNextMove(update.game_id, moveFrom + moveTo);
      } catch (e) {
        console.log(e);
      }
    }
  }
  res.status(200).send('OK');
});

export default router;
