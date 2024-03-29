import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MatchHistoryService } from './service/match-history.service';
import { JwtAuthGuard } from '@/auth/jwt-auth/jwt-auth.guard';

@Controller('match-history')
@UseGuards(JwtAuthGuard)
@UseGuards()
export class MatchHistoryController {
    constructor(
        private eventEmitter: EventEmitter2,
        @Inject(MatchHistoryService)
        private readonly matchHistoryService: MatchHistoryService
    ) { }

    @Get("me")
    async getMyMatches(@Req() req: any){
        const matches = await this.matchHistoryService.findAllByPlayerId(req.user.id);
        return matches.map(match => match.toJson());
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
