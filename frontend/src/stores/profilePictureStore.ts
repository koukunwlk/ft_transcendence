import { defineStore } from 'pinia';

const STORE_KEY = 'picture';

const getPictureLocalStorage = () => {
    const picture = localStorage.getItem(STORE_KEY);
    return picture;
}

export const useProfilePictureStore = defineStore('profile picture',
{
    state: () => ({
        picture: getPictureLocalStorage() || '',
    }),

    actions: {
        setPicture(picture: string) {
            this.picture = picture
            localStorage.setItem(STORE_KEY, this.picture);
        }
    },

    getters: {
        getPicture(): string {
            return this.picture;
        }
    }

})