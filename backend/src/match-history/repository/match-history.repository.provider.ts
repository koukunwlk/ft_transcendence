import { Provider } from "@nestjs/common";
import { MatchHistoryRepository } from "./match-history.repository";
import { MatchHistoryTypeormRepository } from "./match-history.typeorm.repository";

export const MatchHistoryRepositoryProvider: Provider = {
    provide: MatchHistoryRepository,
    useClass: MatchHistoryTypeormRepository,
};