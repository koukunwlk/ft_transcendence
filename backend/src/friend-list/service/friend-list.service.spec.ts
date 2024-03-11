// generate tests
import { FriendListService } from './friend-list.service';
import { FriendListRepository } from '../repository/friend-list.respository';
import { UserService } from '@/user/service/user.service';
import { BadRequestException } from '@nestjs/common';
import { FriendListStatusEnum } from '../domain/model/friend-list.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/user/domain/model/user.model';
import { UserRepository } from '@/user/repository/user.repository';
import { FriendListInMemoryRepostiory } from '../repository/friend-list-in-memory.repository';

/* Mocks */

const users = [
    createRandomUser(),
    createRandomUser(),
    createRandomUser(),
]

/* class FriendListRepositoryMock extends FriendListRepository {
    findOne = jest.fn().mockImplementation(FriendListInMemoryRepostiory.prototype.findOne)
    insertFriendRequest = jest.fn().mockImplementation(FriendListInMemoryRepostiory.prototype.insertFriendRequest)
    insertFriend = jest.fn().mockImplementation(FriendListInMemoryRepostiory.prototype.insertFriend)
    updateFriendRequest = jest.fn().mockImplementation(FriendListInMemoryRepostiory.prototype.updateFriendRequest)
    getFriendList = jest.fn().mockImplementation(FriendListInMemoryRepostiory.prototype.getFriendList)
} */

class UserServiceMock extends UserService {
    getUserById = jest.fn().mockImplementation((id: string) => {
        return users.find(user => user.id === id)
    }
    )
}

class UserRepositoryMock extends UserRepository {
    findOne = jest.fn()
    findAll = jest.fn()
    insert = jest.fn()
    getFriendList = jest.fn()
    getSize = jest.fn()
    findAllByIds = jest.fn()
}

describe('FriendListService', () => {
    let friendListService: FriendListService;
    let friendListRepositoryMock: FriendListRepository;
    let userServiceMock: UserService;
    let userServiceGetUserByIdSpy: jest.SpyInstance;
    let friendListRepositoryFindOneSpy: jest.SpyInstance;
    let friendListRepositoryInsertFriendRequestSpy: jest.SpyInstance;
    let userServiceGetUsersByIdsMock: jest.SpyInstance;

    beforeEach(async () => {
        //friendListRepositoryMock = new FriendListRepositoryMock();
        friendListRepositoryMock = new FriendListInMemoryRepostiory();
        userServiceMock = new UserServiceMock(new UserRepositoryMock());
        userServiceGetUserByIdSpy = jest.spyOn(userServiceMock, 'getUserById').mockImplementation((id: string) => {
            return Promise.resolve(users.find(user => user.id === id))
        });
        friendListRepositoryFindOneSpy = jest.spyOn(friendListRepositoryMock, 'findOne');
        friendListRepositoryInsertFriendRequestSpy = jest.spyOn(friendListRepositoryMock, 'insertFriendRequest');

        friendListService = new FriendListService(friendListRepositoryMock, userServiceMock);
        userServiceGetUsersByIdsMock = jest.spyOn(userServiceMock, 'getUsersByIds')
    })

    it('should be defined', () => {
        expect(friendListService).toBeDefined();
    });

    describe('insertFriendRequest', () => {
        it('should send a friend request', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;

            //Act
            await friendListService.sendFriendRequest(senderId, receiverId);

            //Assert
            expect(friendListRepositoryInsertFriendRequestSpy).toHaveBeenCalledWith(senderId, receiverId);
        });

        it('should throw an error when sending a friend request to an invalid receiverId', async () => {
            //Arrange
            const senderId = users[2].id;
            const invalidReceiverId = 'invalidId';
            userServiceGetUserByIdSpy.mockImplementationOnce((id: string) => {
                if (id === senderId) {
                    return users[0];
                }
                return null;
            });
            const exception = new BadRequestException("Invalid sender or receiver");
            friendListRepositoryMock

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, invalidReceiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when sending a friend request to an invalid senderId', async () => {
            //Arrange
            const invalidSenderId = 'invalidId';
            const receiverId = users[2].id;
            userServiceGetUserByIdSpy.mockImplementationOnce((id: string) => {
                if (id === receiverId) {
                    return users[0];
                }
                return null;
            });
            const exception = new BadRequestException("Invalid sender or receiver");

            // Act && Assert
            await expect(friendListService.sendFriendRequest(invalidSenderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when sending a friend request to an invalid senderId and receiverId', async () => {
            //Arrange
            const invalidSenderId = 'invalidId';
            const invalidReceiverId = 'invalidId';
            const exception = new BadRequestException("Invalid sender or receiver");

            // Act && Assert
            await expect(friendListService.sendFriendRequest(invalidSenderId, invalidReceiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when friend request already sended', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already sended");
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.PENDING };
            });

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when friend request already received', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already received");
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId);

            // Act && Assert
            await expect(friendListService.sendFriendRequest(receiverId, senderId))
                .rejects
                .toThrow(exception);
        });

        it('should throw an error when friend request already exists with status ACCEPTED', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already handled with status: ACCEPTED");
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.ACCEPTED };
            });

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when friend request already exists with status REJECTED', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already handled with status: REJECTED");
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.REJECTED };
            });

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when friend request already exists with status BLOCKED', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already handled with status: BLOCKED");
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.BLOCKED };
            });

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });

        it('should throw an error when friend request already exists with status CANCELLED', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            const exception = new BadRequestException("Friend request already handled with status: CANCELLED");
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.CANCELLED };
            });

            // Act && Assert
            await expect(friendListService.sendFriendRequest(senderId, receiverId))
                .rejects
                .toThrow(exception);
            expect(friendListRepositoryInsertFriendRequestSpy).not.toHaveBeenCalled();
        });
    })
    describe('handleFriendRequest', () => {
        it('should handle a friend request with status ACCEPTED', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act
            await friendListService.handleFriendRequest(receiverId, senderId, FriendListStatusEnum.ACCEPTED);
            const sendedFriendRequests = await friendListService.getSendedFriendRequests(senderId);
            const senderFriends = await friendListService.getFriendList(senderId);
            const receiverFriends = await friendListService.getFriendList(receiverId);
            //Assert
            expect(sendedFriendRequests.length).toEqual(0);
            expect(senderFriends[0].id).toEqual(receiverId);
            expect(receiverFriends[0].id).toEqual(senderId);
        });

        it('should throw an exception when sender user tries to accept his own friend request', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act && Assert
            await expect(friendListService.handleFriendRequest(senderId, receiverId, FriendListStatusEnum.ACCEPTED))
                .rejects
                .toThrow(new BadRequestException("User is the sender of this friend request"));
        });

        it('should throw an exception when sender id or receiver id is not present on friend request', async () => {
            //Arrange
            const senderId = users[0].id;
            const invalidSenderId = users[2].id;
            const receiverId = users[1].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId);
            friendListRepositoryFindOneSpy.mockImplementationOnce(() => {
                return { senderId, receiverId, status: FriendListStatusEnum.PENDING };
            });

            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act && Assert
            await expect(friendListService.handleFriendRequest(invalidSenderId, receiverId, FriendListStatusEnum.ACCEPTED))
                .rejects
                .toThrow(new BadRequestException("User can't handle this friend request"));
        });

        it("should only receiver handle a friend request with status ACCEPTED", async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId = users[1].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId);

            //Act && Assert
            await expect(friendListService.handleFriendRequest(senderId, receiverId, FriendListStatusEnum.ACCEPTED))
                .rejects
                .toThrow(new BadRequestException("User is the sender of this friend request"));
        });
    })
    describe('getFriendList', () => {
        it('should get a empty friend list', async () => {
            //Arrange
            const senderId = users[0].id;
            //Act
            const friendList = await friendListService.getFriendList(senderId);
            //Assert
            expect(friendList).toBeDefined();
            expect(friendList.length).toEqual(0);
        });
        it('should get a friend list', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId1 = users[1].id;
            const receiverId2 = users[2].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId1);
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId2);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })
            //Act
            await friendListService.handleFriendRequest(receiverId1, senderId, FriendListStatusEnum.ACCEPTED);
            await friendListService.handleFriendRequest(receiverId2, senderId, FriendListStatusEnum.ACCEPTED);
            const friendList = await friendListService.getFriendList(senderId);

            //Assert
            expect(friendList).toBeDefined();
            expect(friendList.length).toEqual(2);
            expect(friendList[0].id).toEqual(receiverId1);
            expect(friendList[1].id).toEqual(receiverId2);
        });

        it('should get a friend list with any friendId as owner', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId1 = users[1].id;
            const receiverId2 = users[2].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId1);
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId2);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act
            await friendListService.handleFriendRequest(receiverId1, senderId, FriendListStatusEnum.ACCEPTED);
            await friendListService.handleFriendRequest(receiverId2, senderId, FriendListStatusEnum.ACCEPTED);
            const friendList = await friendListService.getFriendList(receiverId1);

            //Assert
            expect(friendList).toBeDefined();
            expect(friendList.length).toEqual(1);
            expect(friendList[0].id).toEqual(senderId);
        });
    })
    describe('getFriendRequests', () => {
        it('should get a empty received friend request list', async () => {
            //Arrange
            const userId = users[0].id;
            //Act
            const friendRequests = await friendListService.getReceivedFriendRequests(userId);
            //Assert
            expect(friendRequests).toBeDefined();
            expect(friendRequests.length).toEqual(0);
        })

        it('should get a empty seded friend request list', async () => {
            //Arrange
            const userId = users[0].id;
            //Act
            const friendRequests = await friendListService.getSendedFriendRequests(userId);
            //Assert
            expect(friendRequests).toBeDefined();
            expect(friendRequests.length).toEqual(0);
        })

        it('should get a received friends request list', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId1 = users[1].id;
            const receiverId2 = users[2].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId1);
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId2);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act
            const friendRequests = await friendListService.getReceivedFriendRequests(receiverId1);

            //Assert
            expect(friendRequests).toBeDefined();
            expect(friendRequests.length).toEqual(1);
            expect(friendRequests[0].senderId).toEqual(senderId);
        })

        it('should get a sended friends request list', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId1 = users[1].id;
            const receiverId2 = users[2].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId1);
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId2);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act
            const friendRequests = await friendListService.getSendedFriendRequests(senderId);

            //Assert
            expect(friendRequests).toBeDefined();
            expect(friendRequests.length).toEqual(2);
            expect(friendRequests[0].receiverId).toEqual(receiverId1);
            expect(friendRequests[1].receiverId).toEqual(receiverId2);
        })

        it('should only get friend requests with status PENDING', async () => {
            //Arrange
            const senderId = users[0].id;
            const receiverId1 = users[1].id;
            const receiverId2 = users[2].id;
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId1);
            friendListRepositoryMock.insertFriendRequest(senderId, receiverId2);
            userServiceGetUsersByIdsMock.mockImplementation((id: string[]) => {
                return users.filter(user => id.includes(user.id));
            })

            //Act
            const friendRequests = await friendListService.getReceivedFriendRequests(receiverId1);
            await friendListService.handleFriendRequest(receiverId1, senderId, FriendListStatusEnum.ACCEPTED);

            //Assert
            expect(friendRequests).toBeDefined();
            expect(friendRequests.length).toEqual(1);
            expect(friendRequests[0].senderId).toEqual(senderId);
        })
    })
})


function createRandomUser() {
    return new User({
        id: uuidv4(),
        nickname: uuidv4(),
    })

}