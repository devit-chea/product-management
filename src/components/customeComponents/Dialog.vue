<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="390">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
    export default {
        name: "Dialog",

        props: {
            title: {
                type: String,
                default: "Dialog Title"
            },
            description: {
                type: String,
                default: "Dialog description?"
            }
        },
        
        data() {
            return {
                dialog: false,
            }
        },
    }
</script>

<style scoped>

</style>