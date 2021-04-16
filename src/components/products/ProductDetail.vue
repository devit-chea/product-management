<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card
                        class="mx-auto my-12"
                    >
                        <v-img
                            height="250"
                            :src="product.image"
                        ></v-img>

                        <v-card-title>{{ product.name }}</v-card-title>

                        <v-card-text>
                            <v-row
                                align="center"
                                class="mx-0"
                            >
                                <v-rating
                                    :value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                                ></v-rating>
                                <div class="grey--text ml-4">4.5 (413)</div>
                            </v-row>

                            <div class="my-4 subtitle-1">
                                Price: ${{ product.price }}
                            </div>
                            <div class="my-4 subtitle-1">
                                Quantity: {{ product.quantity }} units
                            </div>

                            <div><strong>Description: </strong><p>{{ product.description }}</p></div>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>

                        <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            small
                            @click="callback"
                        >
                            {{ back_title }}
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "ProductDetail",
        props: {
            back_title: {
                type: String,
                default: "Back"
            },
            callback: {
                type: Function,
                default: () => 1
            }, 
            product: {
            type: Object,
            default: () => ({
                id: 0,
                name: '',
                price: '',
                quantity: '',
                description: '',
                image: '',
            })
        }
    },
}
</script>