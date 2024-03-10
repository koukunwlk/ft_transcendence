import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { MatchStartedEvent } from './events/match-started.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidV4 } from 'uuid';
import { MatchEndedEvent } from './events/match-ended.event';
import { MatchHistoryService } from './service/match-history.service';

@Controller('match-history')
export class MatchHistoryController {
    constructor(
        private eventEmitter: EventEmitter2,
        @Inject(MatchHistoryService)
        private readonly matchHistoryService: MatchHistoryService
    ) { }

    @Get("start-match")
    startMatch(@Req() req: any) {
        const event = new MatchStartedEvent();
        event.playerOneId = uuidV4();

        event.playerTwoId = uuidV4();
        event.matchType = 'casual';

        this.eventEmitter.emit('match-started', event, uuidV4());
        return 'Match started';
    }

    @Get("end-match")
    endMatch(@Req() req: any) {
        const event = new MatchEndedEvent();
        event.playerOneId = uuidV4();
        event.playerTwoId = uuidV4();
        event.matchType = 'casual';
        event.playerOneGoalsCount = 5;
        event.playerTwoGoalsCount = 3;
        event.winnerId = event.playerOneId;
        event.matchDuration = '00:10:00';

        this.eventEmitter.emit('match-ended', event, "a482a0f7-a2b2-41bc-9978-f56901b2f35f");
        return 'Match ended';
    }

    @Get("matches/:playerId")
    async getPlayerMatches(@Param('playerId') playerId: string) {
        return await this.matchHistoryService.findAllByPlayerId(playerId);
    }

    @Get("matches/:playerId/:matchType")
    async getPlayerMatchesByType(@Param('playerId') playerId: string, @Param('matchType') matchType: string) {
        return await this.matchHistoryService.findAllByPlayerIdAndMatchType(playerId, matchType);
    }

    @Get("matches")
    async getAllMatches() {
        const matches = await this.matchHistoryService.findAll();
        return matches.map(match => match.toJson());
    }

    @Get("match/:id")
    async getMatch(@Param('id') id: string) {
        const match = await this.matchHistoryService.findById(id);
        return match.toJson();
    }
}
