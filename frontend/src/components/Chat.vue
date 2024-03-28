<template>
	<div class="h-full w-full
		bg-blue-200 grid grid-rows-8 gap-1">
			<div class="grid row-span-1 bg-green-200">
				<div class="h-full w-full
		bg-blue-200 grid grid-rows-8 gap-1">

				</div>
			</div>
			<div class="row-span-6 bg-red-200">
				b
			</div>
			<div class="row-span-1 bg-purple-200">
				c
			</div>
	</div>
</template>

<script>
export default {
    name: 'FriendList',
    components: {
    },
    data() {
        return {
            friends: [
                { id: 1, name: 'John Doe', status: 0 },
                { id: 2, name: 'Jane Doe', status: 1 },
                { id: 3, name: 'Bob Smith', status: 2 },
                { id: 4, name: 'Alice Johnson', status: 3 },
                { id: 5, name: 'Charlie Brown', status: 4 },
                { id: 6, name: 'Diana Prince', status: 0 },
                { id: 7, name: 'Edward Norton', status: 1 },
                { id: 8, name: 'Fiona Apple', status: 0 },
                { id: 9, name: 'George Washington', status: 1 },
                { id: 10, name: 'Henry Ford', status: 0 },
                { id: 11, name: 'Isaac Newton', status: 1 },
                { id: 12, name: 'Jack Sparrow', status: 2 },
                { id: 13, name: 'Kevin Mitnick', status: 3 },
                { id: 14, name: 'Lucas Arnus', status: 4 },
            ],
            friendRequests: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
                { id: 3, name: 'Bob Smith' },
                { id: 4, name: 'Alice Johnson' },
                { id: 5, name: 'Charlie Brown' },
                { id: 6, name: 'Diana Prince' },
                { id: 7, name: 'Edward Norton' },
                { id: 8, name: 'Fiona Apple' },
            ],
        };
    },
    methods: {
    },
};
</script>
