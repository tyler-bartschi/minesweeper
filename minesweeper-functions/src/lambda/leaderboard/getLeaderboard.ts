import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from 'aws-lambda';
import { LeaderboardService } from '../../service/LeaderboardService';

const leaderboardService = new LeaderboardService();

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  return leaderboardService.getLeaderboard(event, context.awsRequestId);
};
