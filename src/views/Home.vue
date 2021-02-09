<template>
  <Layout>
    <template #content>
      <ion-card>
        <ion-card-header>
          <ion-text>Catégories de dépenses</ion-text>
        </ion-card-header>
              <ion-list v-for="category in categories" :key="category.id">
        
            <router-link to="/depenses">{{ category.name }}</router-link>
                </ion-list>
                
        <ion-button
        @click="openPopover()"
        >New</ion-button>
        
      </ion-card>
    </template>
  </Layout>
</template>

<script lang="ts">
import Layout from "../components/Layout.vue";
import Popover from '../components/NewCategoryPopover.vue';
import { defineComponent, } from 'vue';
import { Category } from '../beans/Category';
import { 
  IonText,
  IonCardHeader,
  IonList,
  IonButton,
  IonCard,
  popoverController,
  } from '@ionic/vue';


export default defineComponent({
  name: "Home",
  components: {
    Layout,
    IonText,
    IonCardHeader,
    IonList, 
    IonButton,
    IonCard,
  },
  data(){
    return{
      categories: Array<Category>()
    }
  },

    methods: {
    async openPopover(ev: Event) {
      const popover = await popoverController
        .create({
          component: Popover,
          cssClass: 'my-custom-class',
          event: ev,
          translucent: true
        })
      return popover.present();
    },
  },
});
</script>

<style>
</style>