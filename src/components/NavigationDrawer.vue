<template>
    <div id="side-bar">
        <v-navigation-drawer
            v-bind:value="drawer"
            app
            clipped
            absolute
            temporary
        >
        <v-list dense>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </div>       
</template>

<script>
export default {

    name: "NavigationDrawer",

    props: {
        drawer: {
            type: Boolean,
            default: false,
        }
    },
}
</script>