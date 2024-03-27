<template>
    <div class="flex flex-col px-14">
        <table class="min-w-full divide-y text-yellow-500">
            <tbody>
                <tr class="border-b-2 border-yellow-500">
                    <th scope="row"
                        class="bg-transparent px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total games
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{{ userData.totalGames || 0 }}</td>
                </tr>
                <tr class="border-b-2 border-yellow-500">
                    <th scope="row"
                        class="bg-transparent px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wins
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{{ userData.wins || 0 }}</td>
                </tr>
                <tr class="border-b-2 border-yellow-500">
                    <th scope="row"
                        class="bg-transparent px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loses
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{{ userData.loses || 0 }}</td>
                </tr>
                <tr class="border-b-2 border-yellow-500">
                    <th scope="row"
                        class="bg-transparent px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Win Rate %
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{{ userData.winRate || 0 }}%</td>
                </tr>
                <tr>
                    <th scope="row"
                        class="bg-transparent px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{{ userData.rank || "Unranked" }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        userStats: {
            type: Object,
            required: true
        }
    },

}
</script>